const { ApiError, UserError } = require("../errors");
const { createPayData } = require("../services/paymentService");
const {
  createAddress,
  createOrder,
  createOrderItemsList,
  createProductUpdatesList,
  updateOrderDetailStatus,
  getAddress,
  getMaxOrderNumber,
  getOrderByOrderNumber,
  getProductsById,
  getShipMethod,
  createPaymentDetail,
  getOrderInfo,
  getPaymentDetailByOrderId,
  getShippingMethodByAddress,
} = require("../repo/orderRepo");
const { logger } = require("../lib/logger");
const e = require("express");

exports.createOrderService = async (cart, shipping, billing, t) => {
  const { items, total } = cart;
  const { firstName, lastName, email, cellphone, method } = shipping;
  const { id: shipMethodId, charge } = method;

  const ids = items.map(({ product: cartItem }) => cartItem.id);
  if (items.length < 1 || !total) return UserError.badRequest();

  const products = await getProductsById(ids, t);
  if (products.length < 1)
    return ApiError.notFound("No products with those id's");
  if (products.length !== items.length)
    return ApiError.mismatch("Cart length mismatch.");

  logger.info({ message: `Checking cart items ids ( ${ids.join(", ")} ) ` });

  const validCart = items.map(({ product: cartProduct, orderQty }) => {
    const product = products.find((product) => cartProduct.id === product.id);
    const priceIsSame = cartProduct.price === product.price;
    const enoughStock = orderQty <= product.stock_qty;
    return priceIsSame && enoughStock;
  });
  if (validCart.some((check) => check === false))
    return ApiError.mismatch("Cart data mismatch.");

  logger.info({ message: "Verifying shipping method" });

  const shipMethod = await getShipMethod(shipMethodId, t);
  const serverCharge = shipMethod.charge;
  if (serverCharge !== charge)
    return ApiError.mismatch("Shipping method charge mismatch.");

  logger.info({ message: "Verifying payable amounts" });

  const serverTotal = products.reduce((total, product) => {
    const cartItem = items.find(
      ({ product: cartProduct }) => product.id === cartProduct.id
    );
    return total + product.price * cartItem.orderQty;
  }, 0);
  const serverGrandTotal = parseFloat((serverTotal + serverCharge).toFixed(2));
  const clientGrandTotal = parseFloat((total + charge).toFixed(2));
  // const clientGrandTotal = 500;
  if (clientGrandTotal != serverGrandTotal)
    return ApiError.mismatch("Payment amount mismatch.");

  logger.info({ message: "Verifying addresses" });

  let existingAddress, shippingId, billingId;
  existingAddress = await getAddress(shipping);
  if (existingAddress) {
    shippingId = existingAddress.id;
  } else {
    shippingId = (await createAddress(shipping, t)).id;
  }
  if (Object.keys(billing).length > 0) {
    existingAddress = await getAddress(billing, t);
    if (existingAddress) {
      billingId = existingAddress.id;
    } else {
      billingId = (await createAddress(billing, t)).id;
    }
  } else {
    billingId = shippingId;
  }

  const maxOrderNumber = await getMaxOrderNumber(t);
  const formattedMaxOrderNumber = Object.values(maxOrderNumber)[0];
  const orderNumber = formattedMaxOrderNumber + 1;
  // index or cache this number

  logger.info({ message: `Generated order number ${orderNumber}` });

  const existingOrder = await getOrderByOrderNumber(orderNumber, t);
  if (existingOrder) return ApiError.invalidProperty("Order already exists.");
  const order = await createOrder(
    orderNumber,
    firstName,
    lastName,
    email,
    serverGrandTotal,
    cellphone,
    shippingId,
    billingId,
    shipMethodId,
    t
  );

  // create index of max order

  const orderId = order.id;
  const updates = createOrderItemsList(orderId, items, products, t);
  const results = await Promise.all(updates);
  const plainResults = results.map((result) => result.get({ plain: true }));
  if (
    plainResults.some((result) => {
      Object.keys(result).length < 1;
    })
  )
    return ApiError.internal("Order items could not be created.");

  logger.info(`Generating pay information for ${orderId}`);

  return createPayData(order, orderId);
};

exports.completeOrderService = async (itn, t) => {
  const {
    m_payment_id,
    pf_payment_id,
    payment_status,
    item_name,
    item_description,
    amount_gross,
    amount_fee,
    amount_net,
    name_first,
    name_last,
    email_address,
    merchant_id,
    signature,
    order,
  } = itn;

  if (payment_status !== "COMPLETE")
    return ApiError.invalidProperty(`Payment status is ${payment_status}`);

  const { id, products } = order;

  logger.info({
    message: `Received payment as ${payment_status} for order ${item_name}`,
  });

  logger.info({
    message: `Updating stock for products (${products
      .map((product) => product.id)
      .join(", ")})`,
  });

  const updates = createProductUpdatesList(products, t);
  const results = await Promise.all(updates);
  if (results.some((result) => result < 1))
    return ApiError.internal("Error when updating product stock");

  const updatedOrder = await updateOrderDetailStatus(id, t);
  if (updatedOrder.some((result) => result < 1))
    return ApiError.internal(`Order status was not updated`);

  logger.info({
    message: `Creating payment for order ${item_name}`,
  });

  const payment = await createPaymentDetail(itn, id, t);
  if (!payment) return ApiError.internal("Payment detail was not created.");
  return payment;
};

exports.confirmOrderService = async (id) => {
  logger.info({ message: "Confirming payment" });

  const order = await getOrderInfo(id);

  if (order == null)
    return next(ApiError.notFound("Could not find order with id:", id));

  const payment = await getPaymentDetailByOrderId(id);

  if (payment == null) return ApiError.internal("Could not find payment");

  logger.info({ message: "Payment successful" });

  // therefore payment_details must contain that code
  // how to cancel payments and all that
  // send email or text to user about payment
  // make db models that are not connected to eachother, use promise.all
  return order;
};

exports.fetchOrderService = async (id) => {
  logger.info({ message: "Fetching Order with Id ", id });

  const order = await getOrderInfo(id);

  if (order == null)
    return ApiError.notFound("Could not find order with id:", id);

  return order;
};

exports.getShippingRateService = async (area, city) => {
  logger.info({ message: "Getting shipping charge" });
  const method = await getShippingMethodByAddress(area, city);
  if (method == null)
    return UserError.notFound("Location not available for delivery.");
  return method;
};

exports.fetchAllOrders = async (user) => {
  logger.info({ message: "Fetching orders" });
  const orders = await getAllOrdersByUser(user);
  if (orders == null) return ApiError.internal();
  if (orders.length < 1) return UserError.notFound("No orders found");
  return orders;
};
