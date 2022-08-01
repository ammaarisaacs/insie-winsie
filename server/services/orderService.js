const { ApiError, UserError } = require("../errors");
const { createPayData } = require("../services/paymentService");
const { sequelize } = require("../db/models");
const {
  createAddress,
  createOrder,
  createOrderItemsList,
  getAddress,
  getMaxOrderNumber,
  getOrderByOrderNumber,
  getProductsById,
  getShipMethod,
  createPaymentDetail,
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

exports.completeOrderSerive = async (itn) => {
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

  console.log(
    "completeOrder: notify url: received payment status as ",
    payment_status
  );

  if (!payment_status === "COMPLETE")
    return next(
      ApiError.invalidProperty(`Payment status is ${payment_status}`)
    );

  const { id, products } = order;

  console.log("completeOrder: updating stock quantities of products bought");

  // let updates = [];

  // const productUpdates = products.map((cartProduct) => {
  //   const { id, stock_qty: stockQty } = cartProduct;
  //   const orderQty = cartProduct.order_item.order_qty;
  //   return product.update(
  //     { stock_qty: stockQty - orderQty },
  //     { where: { id } },
  //     { transaction: t }
  //   );
  // });
  // updates.push(productUpdates);
  // updates.push(
  //   order_detail.update(
  //     { status: "paid" },
  //     { where: { id: order.id } },
  //     { transaction: t }
  //   )
  // );

  const updates = createProductUpdatesList(products, t);
  const orderStatusUpdate = updateOrderDetailStatus(id, t);
  updates.push(orderStatusUpdate);
  const results = await Promise.all(updates);
  const plainResults = results.map((result) => result.get({ plain: true }));
  if (plainResults.some((result) => Object.keys(result).length < 1))
    return ApiError.internal(
      "Error when updating product stock or order status"
    );

  console.log("completeOrder: creating payment in db");

  const payment = await createPaymentDetail(itn, t);

  //   const payment = await payment_detail.create(
  //     {
  //       name: pf_payment_id,
  //       amount: amount_gross,
  //       provider: "fnb",
  //       order_id,
  //     },
  //     { transaction: t }
  //   );

  return payment;
};

// email user
// get order to populate thank you page
// how to cancel payments and all that
