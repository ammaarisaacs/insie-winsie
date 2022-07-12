const {
  product,
  ship_method,
  order_detail,
  address,
  payment_detail,
} = require("../models");

const ApiError = require("../errors/errors");

// use config to neaten up controllers
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

// order must be made before payment for audit purposes PCI

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
      attributes: ["charge"],
    });

    if (charge == null) return next(ApiError.zoneNotSupported());

    res.send(charge);
  } catch (error) {
    return next(ApiError.internal());
  }
};

exports.createOrder = function (req, res, next) {
  // need to trim at ordersummary inputs
  // better to use codes or integer codes for cryptic and shorter data transfers
  // going to need transactions and access the child models first and insert the data there
  // then insert order_detail data
  // then tie order_detail to product in order_item

  console.log(req.body);

  // shipping address and billing address

  // you need a billing address anyway
  // can make payload smaller

  const billStreet = req.body.billing?.street,
    billArea = req.body.billing?.area,
    billCity = req.body.billing?.city,
    billZipCode = req.body.billing?.zipcode,
    billProvince = req.body.billing?.province;

  // if bill & ship is the same

  const {
    firstName,
    lastName,
    email,
    cellphone,
    street,
    area,
    city,
    zipcode,
    province,
    charge,
  } = req.body.shipping;

  // product array

  const products = req.body.cart;

  // validate inputs

  try {
    // transaction here
    //
    // find the address entry using the details provided
    // if no address, create new address entry and get the id
    // if address set that id to the shipping address id
    //
    // do a foreach to go through each product and order quantity
    // check if the product exists
    // check if stock is lower than the quantity
    // if qty is lower, go ahead, decrease qty in product table by the ordered amount
    //
    // create order_detail
    // order_detail
    //   .create({
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return next(ApiError.internal());
    //   });
    //
    // create new order_item
    //
    // res.send(req.body);
  } catch (error) {
    console.log(error);
    next(ApiError.internal());
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

exports.updateOrder = async function (req, res, next) {};
