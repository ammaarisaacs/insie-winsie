const {
  product,
  ship_method,
  order_detail,
  order_item,
  address,
  payment_detail,
  sequelize,
} = require("../models");

const ApiError = require("../errors/errors");
const createPayData = require("../utils/generateSignature");

const attributeConfig = {};

// when you purchase something, a code must be sent to the buyer email, this can be used to track the order and look at the order details
// therefore payment_details must contain that code
// after payment, make a order success page, when that is rendered
// that page must have a use effect that uses axios that makes a call to the server
// when endpoint is hit, you have to:
// send email to user about payment
// send text about payment
// take payment info from req,
// populate db with payment
// tie it to order

// possibly improvements below
//  make db models that are not connected to eachother, use promise.all

exports.createOrder = async function (req, res, next) {
  let ship_address_id, bill_address_id;

  const {
    firstName: first_name,
    lastName: last_name,
    email,
    cellphone,
    street,
    area,
    city,
    zipcode,
    province,
    method: { id: ship_method_id, charge },
  } = req.body.shipping;

  const {
    street: billStreet = street,
    area: billArea = area,
    city: billCity = city,
    zipcode: billZipCode = zipcode,
    province: billProvince = province,
  } = req.body.billing ?? {};

  // check what it means to give something a default value, what default values are best for money and arrays

  const { items = [], total = null } = req.body.cart;

  const ids = items.map(({ product: cartItem }) => cartItem.id);

  if (items.length < 1 || total == null) return next(ApiError.badRequest());

  const t = await sequelize.transaction();

  try {
    const products = await product.findAll(
      {
        where: { id: ids },
        attributes: ["id", "name", "description", "price", "stock_qty"],
        raw: true,
      },
      { transaction: t }
    );

    if (products.length < 1) return next(ApiError.notAvailable());

    if (products.length !== items.length) return next(ApiError.cartError());

    // initialize two variables
    // serverTotal = number, checks = []
    // use one reduce, to add to servertotal and to checks

    const productChecks = items.map(({ product: cartProduct, orderQty }) => {
      const product = products.find((product) => cartProduct.id === product.id);
      const priceIsSame = cartProduct.price === product.price;
      const enoughStock = orderQty < product.stock_qty;
      return priceIsSame && enoughStock;
    });

    if (productChecks.some((check) => check === false))
      return next(ApiError.cartError());

    const serverTotal = products.reduce((total, product) => {
      const cartItem = items.find(
        ({ product: cartProduct }) => product.id === cartProduct.id
      );
      return total + product.price * cartItem.orderQty;
    }, 0);

    const shipMethod = await ship_method.findOne(
      {
        where: { id: ship_method_id },
        raw: true,
      },
      { transaction: t }
    );

    const serverCharge = shipMethod.charge;

    if (serverCharge !== charge) return next(ApiError.orderError());

    const serverGrandTotal = parseFloat(
      (serverTotal + serverCharge).toFixed(2)
    );

    const clientGrandTotal = parseFloat((total + charge).toFixed(2));

    if (clientGrandTotal != serverGrandTotal) return next(ApiError.cartError());

    const existingShipAddress = await address.findOne(
      {
        where: { street, area, city, zipcode, province },
        raw: true,
      },
      { transaction: t }
    );

    if (existingShipAddress) {
      ship_address_id = existingShipAddress.id;
    } else {
      const newAddress = await address.create(
        {
          street,
          area,
          city,
          zipcode,
          province,
          created_at: new Date(),
          updated_at: new Date(),
        },
        { transaction: t }
      );

      ship_address_id = newAddress.id;
    }

    const existingbillAddress = await address.findOne(
      {
        where: {
          street: billStreet,
          area: billArea,
          city: billCity,
          zipcode: billZipCode,
          province: billProvince,
        },
      },
      { transaction: t }
    );

    if (existingbillAddress) {
      bill_address_id = existingbillAddress.id;
    } else {
      const newAddress = await address.create(
        {
          street: billStreet,
          area: billArea,
          city: billCity,
          zipcode: billZipCode,
          province: billProvince,
          created_at: new Date(),
          updated_at: new Date(),
        },
        { transaction: t }
      );

      bill_address_id = newAddress.id;
    }

    // promise.all here for address checking and product checking
    // validate
    // promise.all here for address creation

    console.log("createOrder: getting max order number");

    const maxOrderNumber = await order_detail.findOne(
      {
        attributes: [sequelize.fn("max", sequelize.col("order_number"))],
        raw: true,
      },
      { transaction: t }
    );

    const formattedOrderNumber = Object.values(maxOrderNumber)[0];

    const order_number = formattedOrderNumber + 1;

    const existingOrder = await order_detail.findOne(
      {
        where: { order_number },
        raw: true,
      },
      { transaction: t }
    );

    if (existingOrder) return next(ApiError.orderError());

    const order = await order_detail.create(
      {
        order_number,
        first_name,
        last_name,
        email,
        total: serverGrandTotal,
        cellphone,
        ship_address_id,
        bill_address_id,
        ship_method_id,
        status: "pending",
      },
      { transaction: t }
    );

    const orderId = order.id;

    const updates = items.map(({ product: cartProduct, orderQty }) => {
      const { id } = products.find((product) => product.id === cartProduct.id);
      return order_item.create(
        {
          order_id: orderId,
          product_id: id,
          order_qty: orderQty,
        },
        { transaction: t }
      );
    });

    const results = await Promise.all(updates);

    if (results.some((result) => result < 1)) return next(ApiError.internal());

    console.log("createOrder: creating pay data ");

    const myData = createPayData(order, orderId);

    res.send({ ...myData });

    await t.commit();
  } catch (error) {
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

    res.status(200);

    // where are you ressing to though
    // res.send(payment_status);
    // use this as well to check
  } catch (error) {
    await t.rollback();
    console.log(error);
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
