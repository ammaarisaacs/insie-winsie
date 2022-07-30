const {
  product,
  ship_method,
  order_detail,
  address,
  payment_detail,
  sequelize,
} = require("../db/models");
const ApiError = require("../errors/errors");
const { createPayData } = require("../services/paymentService");
const {
  getProductsById,
  getMaxOrderNumber,
  getShipMethod,
  getAddress,
  createAddress,
  getOrderByOrderNumber,
  createOrder,
  createOrderItems,
} = require("../services/orderService");

// therefore payment_details must contain that code
// send email to user about payment
// send text about payment
// take payment info from req,
// populate db with payment
// tie it to order

// possibly improvements below
// make db models that are not connected to eachother, use promise.all

exports.createOrder = async function (req, res, next) {
  const { cart, shipping, billing = {} } = req.body;
  const { items, total } = cart;
  const { firstName, lastName, email, cellphone, method } = shipping;
  const { id: shipMethodId, charge } = method;

  // check what it means to give something a default value, what default values are best for money and arrays

  // validateProductService

  const t = await sequelize.transaction();

  try {
    const ids = items.map(({ product: cartItem }) => cartItem.id);
    if (items.length < 1 || !total) return next(ApiError.badRequest());

    const products = await getProductsById(ids, t);
    if (products.length < 1) return next(ApiError.notAvailable());
    if (products.length !== items.length) return next(ApiError.cartError());

    // initialize two variables
    // serverTotal = number, checks = []
    // use one reduce, to add to servertotal and to checks

    // validateCart
    const productChecks = items.map(({ product: cartProduct, orderQty }) => {
      const product = products.find((product) => cartProduct.id === product.id);
      const priceIsSame = cartProduct.price === product.price;
      const enoughStock = orderQty < product.stock_qty;
      return priceIsSame && enoughStock;
    });

    if (productChecks.some((check) => check === false))
      return next(ApiError.cartError());

    // validateShipping

    const shipMethod = await getShipMethod(shipMethodId, t);
    const serverCharge = shipMethod.charge;
    if (serverCharge !== charge) return next(ApiError.orderError());

    // validateCost

    const serverTotal = products.reduce((total, product) => {
      const cartItem = items.find(
        ({ product: cartProduct }) => product.id === cartProduct.id
      );
      return total + product.price * cartItem.orderQty;
    }, 0);
    const serverGrandTotal = parseFloat(
      (serverTotal + serverCharge).toFixed(2)
    );
    const clientGrandTotal = parseFloat((total + charge).toFixed(2));
    if (clientGrandTotal != serverGrandTotal) return next(ApiError.cartError());

    // validateAddressService

    // promise.all here for address checking and product checking

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

    // createOrderService

    const maxOrderNumber = await getMaxOrderNumber(t);
    const orderNumber = maxOrderNumber + 1;

    const existingOrder = await getOrderByOrderNumber(orderNumber, t);
    if (existingOrder) return next(ApiError.orderError());
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
    const updates = createOrderItems(orderId, items, products, t);
    const results = await Promise.all(updates);
    if (results.some((result) => result < 1)) return next(ApiError.internal());

    // createpaymentData
    console.log("createOrder: creating pay data ");
    const payData = createPayData(order, orderId);
    res.send({ ...payData });

    await t.commit();
  } catch (error) {
    console.log(error);
    await t.rollback();
    next(ApiError.internal());
  }
};

exports.completeOrder = async function (req, res, next) {
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
  } = req.body;

  // any validation

  console.log(
    "completeOrder: notify url: received payment status as ",
    payment_status
  );

  if (!payment_status === "COMPLETE") return next(ApiError.paymentError());

  const { id: order_id, products } = order;

  const t = await sequelize.transaction();

  let updates = [];

  try {
    console.log("completeOrder: updating stock quantities of products bought");

    //

    const productUpdates = products.map((cartProduct) => {
      const { id, stock_qty: stockQty } = cartProduct;
      const orderQty = cartProduct.order_item.order_qty;
      return product.update(
        { stock_qty: stockQty - orderQty },
        { where: { id } },
        { transaction: t }
      );
    });

    updates.push(productUpdates);

    updates.push(
      order_detail.update(
        { status: "paid" },
        { where: { id: order.id } },
        { transaction: t }
      )
    );

    const results = await Promise.all(updates);

    if (results.some((result) => result < 1)) return next(ApiError.internal());

    console.log("completeOrder: creating payment in db");

    const payment = await payment_detail.create(
      {
        name: pf_payment_id,
        amount: amount_gross,
        provider: "fnb",
        order_id,
      },
      { transaction: t }
    );

    // email user
    // get order to populate thank you page
    // how to cancel payments and all that

    await t.commit();

    res.status(200).send();
  } catch (error) {
    await t.rollback();
    return next(ApiError.internal());
  }
};

exports.confirmPayment = async function (req, res, next) {
  console.log("confirming payment: for success page");

  const id = Number.parseInt(req.params.id);

  // validate

  if (id.isNaN) return next(ApiError.invalidId());

  try {
    console.log("confirm payment: getting order for success page");

    const order = await order_detail.findOne({
      where: { id },
      attributes: {
        exclude: ["ship_address_id", "bill_address_id", "ship_method_id"],
      },
      include: [
        {
          model: product,
          attributes: {
            exclude: ["createdAt", "updatedAt", "in_carousel", "stock_qty"],
          },
          through: {
            attributes: ["order_qty"],
          },
        },
        {
          model: address,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          as: "shipAddressId",
        },
        {
          model: address,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          as: "billAddressId",
        },
        {
          model: payment_detail,
          attributes: { exclude: ["id"] },
        },
      ],
    });

    if (order == null) return next(ApiError.noOrder());

    console.log("confirm payment: checking if payment was stored");

    const payment = await payment_detail.findOne({ where: { order_id: id } });

    if (payment == null) return next(ApiError.paymentError());

    res.send(order);
  } catch (error) {
    return next(ApiError.internal());
  }
};

exports.deleteOrder = async function (req, res, next) {
  // validate user using jwt

  const { id } = req.params;

  if (isNaN(id)) return next(ApiError.invalidId());

  try {
    const result = await order_detail.destroy({ where: { id } });

    if (!result) return res.send("Order not found.");

    res.send("Order successfully deleted.");
  } catch (error) {
    console.log(error);
    return next(ApiError.internal());
  }
};

exports.fetchOrders = async function (req, res, next) {};

exports.fetchOrder = async function (req, res, next) {
  // this request for now will come from they're email and come to this page

  // below shouldn't be id but actually the TOKEN sent by payfast
  const { id } = req.params;

  // need also logic to get any refund info of any kind

  try {
    const order = await order_detail.findOne({
      where: { id },
      attributes: {
        exclude: ["ship_address_id", "bill_address_id", "ship_method_id"],
      },
      include: [
        {
          model: product,
          attributes: {
            exclude: ["createdAt", "updatedAt", "in_carousel", "stock_qty"],
          },
          through: {
            attributes: ["order_qty"],
          },
        },
        {
          model: address,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          as: "shipAddressId",
        },
        {
          model: address,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          as: "billAddressId",
        },
        {
          model: payment_detail,
          attributes: { exclude: ["id"] },
        },
      ],
    });

    if (order == null) return next(ApiError.noOrder());

    res.send(order);
  } catch (error) {
    return next(ApiError.internal());
  }
};

exports.getShippingRate = async function (req, res, next) {
  const { area, city } = req.body;
  try {
    const charge = await ship_method.findOne({
      where: { area, city },
      attributes: ["id", "charge"],
    });
    if (charge == null) return next(ApiError.zoneNotSupported());
    res.send(charge);
  } catch (error) {
    return next(ApiError.internal());
  }
};

exports.updateOrder = async function (req, res, next) {};
