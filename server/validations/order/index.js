const { body, param, query } = require("express-validator");

exports.FetchOrdersChecks = () => {};
exports.FetchOrderChecks = () => {};

exports.CreateOrdersChecks = [
  body("cart").notEmpty(),
  body("cart.*.items").notEmpty(),
  body("cart.*.total").isDecimal(),
  body("shipping"),
  body("shipping.*.firstName").notEmpty(),
  body("shipping.*.lastName").notEmpty(),
  body("shipping.*.email").notEmpty(),
  body("shipping.*.cellphone").notEmpty(),
  body("shipping.*.street").notEmpty(),
  body("shipping.*.area").notEmpty(),
  body("shipping.*.zipcode").notEmpty(),
  body("shipping.*.province").notEmpty(),
  body("billing"),
];
exports.UpdateOrdersChecks = () => {};
exports.DeletOrdersChecks = () => {};

exports.ShippingRateChecks = [
  body("street").notEmpty(),
  body("area").notEmpty().not().isNumeric(),
  body("city").notEmpty().not().isNumeric(),
  body("email").notEmpty().isEmail(),
  body("cellphone").notEmpty(),
  body("firstName").notEmpty().not().isNumeric(),
  body("lastName").notEmpty().not().isNumeric(),
];
