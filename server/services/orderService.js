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

  console.log("createOrder: checking if cart is up to date");

  const validCart = items.map(({ product: cartProduct, orderQty }) => {
    const product = products.find((product) => cartProduct.id === product.id);
    const priceIsSame = cartProduct.price === product.price;
    const enoughStock = orderQty < product.stock_qty;
    return priceIsSame && enoughStock;
  });
  if (validCart.some((check) => check === false))
    return ApiError.mismatch("Cart data mismatch.");

  console.log("createOrder: checking if shipping method charge is correct");

  const shipMethod = await getShipMethod(shipMethodId, t);
  const serverCharge = shipMethod.charge;
  if (serverCharge !== charge)
    return ApiError.mismatch("Shipping method charge mismatch.");

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

  console.log("createOrder: checking if address and billing are the same");

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

  console.log("createOrder: getting max order number");

  const maxOrderNumber = await getMaxOrderNumber(t);
  const formattedMaxOrderNumber = Object.values(maxOrderNumber)[0];
  const orderNumber = formattedMaxOrderNumber + 1;

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

  console.log("createOrder: creating pay data ");

  const payData = createPayData(order, orderId);
  return payData;
};

exports.completeOrderSerive = async (itn, t) => {
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

  // any validation

  console.log("completeOrder: received payment status as", payment_status);

  if (payment_status !== "COMPLETE")
    return ApiError.invalidProperty(`Payment status is ${payment_status}`);

  const { id, products } = order;

  console.log("completeOrder: updating stock quantities.");

  const updates = createProductUpdatesList(products, t);
  const orderStatusUpdate = updateOrderDetailStatus(id, t);
  updates.push(orderStatusUpdate);
  const results = await Promise.all(updates);
  if (results.some((result) => result < 1))
    return ApiError.internal(
      "Error when updating product stock or order status"
    );

  console.log("completeOrder: creating payment detail");

  const payment = await createPaymentDetail(itn, id, t);
  if (!payment) return ApiError.internal("Payment detail was not created.");
  return payment;
};

exports.confirmOrderService = async (id, t) => {
  console.log("confirming payment: for success page");

  id = parseInt(id);
  if (Number.isNaN(id)) return UserError.invalidProperty("Invalid ID.");

  console.log("confirm payment: getting order for success page");

  const order = await getOrderInfo(id);
  if (order == null) return next(ApiError.noOrder());

  console.log("confirm payment: checking if payment was stored");

  const payment = await getPaymentDetailByOrderId(id);
  if (payment == null) return ApiError.internal("Could not find payment");

  // therefore payment_details must contain that code
  // email user
  // get order to populate thank you page
  // how to cancel payments and all that
  // send email to user about payment
  // send text about payment
  // take payment info from req,
  // populate db with payment
  // tie it to order
  // make db models that are not connected to eachother, use promise.all

  res.send(order);
};

exports.getShippingRateService = async (area, city) => {
  const method = await getShippingMethodByAddress(area, city);
  if (method == null)
    return UserError.notFound("Location not available for delivery.");
  return method;
};
