const {
  product,
  ship_method,
  order_detail,
  address,
  payment_detail,
} = require("../models");
const ApiError = require("../errors/errors");

// when you purchase something, a code must be sent to the buyer email, this can be used to track the order and look at the order details
// therefore payment_details must contain that code

exports.fetchOrder = async function (req, res, next) {
  // when getting the order you are essentially populating a template with data
  // this data involves:
  // order, shipping method, products in order, payment info
  // once paid and received
  const { id } = req.params;

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
          attributes: ["street", "area", "city", "zipcode", "province"],
          as: "shipAddressId",
        },
        {
          model: address,
          attributes: ["street", "area", "city", "zipcode", "province"],
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
    const shippingMethod = await ship_method.findOne({
      where: { area, city },
      attributes: ["charge"],
    });

    // charge could be 0 (pickup), so change to == null
    if (shippingMethod == null) return next(ApiError.zoneNotSupported());

    res.send(shippingMethod);
  } catch (error) {
    return next(ApiError.internal());
  }
  // need to trim at ordersummary inputs
  // better to use codes or integer codes for cryptic and shorter data transfers
  // if shipRate is 0 this will still happen, but that must be for pickup
  // const shipRate = zone.areas?.[area];
  // res.send(JSON.stringify(shipRate));
};

exports.createOrder = function (req, res, next) {
  const { firstName, lastName } = req.body;

  // going to need transactions and access the child models first and insert the data there
  // then insert order_detail data
  // then tie order_detial to product in order_item
  order_detail
    .create({
      // name,
      // description,
      // price,
      // stockQty,
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteOrder = function (req, res, next) {};
exports.updateOrder = function (req, res, next) {};
