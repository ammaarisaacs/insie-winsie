// require Order Model here from sequelize
const shippingZones = require("../mockdata/mockArea");
const ApiError = require("../errors/errors");

// when you purchase something, a code must be sent to the buyer email, this can be used to track the order and look at the order details
// therefore payment_details must contain that code

exports.fetchOrder = function (req, res, next) {
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

  Order.create({
    // name,
    // description,
    // price,
    // stockQty,
  }).catch((err) => {
    console.log(err);
  });
};

exports.deleteOrder = function (req, res, next) {};

exports.updateOrder = function (req, res, next) {};
