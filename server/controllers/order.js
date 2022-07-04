const {
  product,
  ship_method,
  order_detail,
  address,
  payment_detail,
  order_item,
} = require("../models");
const shippingZones = require("../mockdata/mockArea");
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
    const order = await order_detail.findAll({
      where: { id },
      attributes: [
        "id",
        "name",
        "first_name",
        "last_name",
        "total",
        "email",
        "cellphone",
        "created_at",
        "updated_at",
      ],
      include: [
        { model: order_item },
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
    console.log(error);
    return next(ApiError.internal());
  }

  // const { count, rows } = await Project.findAndCountAll({
  //   where: {
  //     title: {
  //       [Op.like]: 'foo%'
  //     }
  //   },
  //   offset: 10,
  //   limit: 2
  // });
  // console.log(count);
  // console.log(rows);
};

exports.getShippingRate = function (req, res, next) {
  const { area, city } = req.body;

  // city can have many areas
  // therefore store city_id in areas table

  const zone = shippingZones.find((zone) => zone.city === city.toLowerCase());

  // sequelize findOne
  // need to trim at ordersummary inputs
  // better to use codes or integer codes for cryptic and shorter data transfers
  // if shipRate is 0 this will still happen, but that must be for pickup

  if (!zone) return next(ApiError.invalidCity(city));

  const shipRate = zone.areas?.[area];

  if (!shipRate) return next(ApiError.invalidArea(area));

  res.send(JSON.stringify(shipRate));
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
