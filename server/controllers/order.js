const {
  product,
  ship_method,
  order_detail,
  address,
  payment_detail,
  sequelize,
} = require("../models");

const ApiError = require("../errors/errors");

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

let orderNumberCount;

exports.createOrder = async function (req, res, next) {
  let order_number, ship_address_id, bill_address_id;

  // const billStreet = req.body.billing?.street,
  //   billArea = req.body.billing?.area,
  //   billCity = req.body.billing?.city,
  //   billZipCode = req.body.billing?.zipcode,
  //   billProvince = req.body.billing?.province;

  const {
    street: billStreet,
    area: billArea,
    city: billCity,
    zipcode: billZipCode,
    province: billProvince,
  } = req.body.billing;

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

  // validate inputs
  //    if anything is empty send back bad request

  // need to trim at ordersummary inputs
  // need to lower case them

  // valid email

  // check what it means to give something a default value, what default values are best for money and arrays
  const { items = [], total = null } = req.body.cart;

  const ids = items.map(({ product: cartProduct }) => cartProduct.id);

  if (items.length < 1 || total == null) return next(ApiError.badRequest());

  const transaction = await sequelize.transaction();

  try {
    const products = await product.findAll({
      where: { id: ids },
      attributes: ["id", "name", "description", "price", "stock_qty"],
      raw: true,
    });

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

    const shipMethod = await ship_method.findOne({
      where: { id: ship_method_id },
      raw: true,
    });

    const serverCharge = shipMethod?.charge;

    if (serverCharge !== charge) return next(ApiError.deliveryError());

    const serverGrandTotal = serverTotal + serverCharge;

    const clientGrandTotal = total + charge;

    if (clientGrandTotal != serverGrandTotal) return next(ApiError.cartError());

    console.log(street);
    console.log(area);
    console.log(city);
    console.log(zipcode);
    console.log(province);

    const existingShipAddress = await address.findOne({
      where: { street, area, city, zipcode, province },
      raw: true,
    });

    if (existingShipAddress) {
      ship_address_id = existingShipAddress?.id;
    } else {
      const newAddress = await address.create({
        street,
        area,
        city,
        zipcode,
        province,
        created_at: new Date(),
        updated_at: new Date(),
      });

      ship_address_id = newAddress?.id;
    }

    const existingbillAddress = await address.findOne({
      where: {
        street: billStreet,
        area: billArea,
        city: billCity,
        zipcode: billZipCode,
        province: billProvince,
      },
    });

    console.log(existingbillAddress);

    return;

    if (existingbillAddress) {
      bill_address_id = existingbillAddress.id;
    } else {
      const newAddress = await address.create({
        street: billStreet,
        area: billArea,
        city: billCity,
        zipcode: billZipCode,
        province: billProvince,
        created_at: new Date(),
        updated_at: new Date(),
      });

      bill_address_id = newAddress.id;
    }

    // have a reset to 1 per day

    orderNumberCount++;

    order_number = `${new Date()
      .toISOString()
      .slice(0, 10)
      .replaceAll("-", "")}000${orderNumberCount}`;

    console.log(order_number);

    // const order = await order_detail.create({
    //   order_number,
    //   first_name,
    //   last_name,
    //   email,
    //   total,
    //   cellphone,
    //   ship_address_id,
    //   bill_address_id,
    //   ship_method_id,
    //   status: "pending",
    // });

    // create new order_item

    // items.forEach(item=>)

    // const order_item = await order_item.create({
    //   order_id: 1,
    //   product_id: 1,
    //   order_qty: 1
    // })

    await transaction.commit();

    // send order number and order id
    // payfast needs:
    // order number
    // amount

    // res.send(order.order_number);

    // res.send(order);
  } catch (error) {
    await transaction.rollback();

    console.log(error);

    next(ApiError.internal());
  }
};

exports.completeOrder = async function (req, res, next) {
  // get transaction info
  // get order id / name

  // validate check payfast docs

  try {
    // get order from order id above

    // update the products in that order and lower the stock qty
    // const updates = items.map(({ product: cartProduct, orderQty }) => {
    //   const { stock_qty } = products.find(
    //     (product) => product.id === cartProduct.id
    //   );
    //   return product.update(
    //     { stock_qty: stock_qty - orderQty },
    //     { where: { id: cartProduct.id } }
    //   );
    // });
    // const results = await Promise.all(updates);
    // if (results.some((result) => result < 1)) return next(ApiError.internal());

    // console.log(results);

    // create payment
    // insert into db
    // connect to order id
    // email user
    // get order to populate thank you page
    await transaction.commit();
    res.send(order);
  } catch (error) {
    await transaction.rollback();
    console.log(error);
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

    if (!order) return next(ApiError.noOrder());

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
