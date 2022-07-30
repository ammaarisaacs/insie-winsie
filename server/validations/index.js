const { validationResult } = require("express-validator");
const { productChecks } = require("./productChecks");
const { contactChecks } = require("./contactChecks");
const { ShippingRateChecks, CreateOrdersChecks } = require("./orderChecks");

// product

exports.validateFetchProducts = makeValidation(productChecks);

// order

exports.validateFetchShippingRate = makeValidation(ShippingRateChecks);
exports.validateCreateOrder = makeValidation(CreateOrdersChecks);

// contact

exports.validateCreateContact = makeValidation(contactChecks);

function makeValidation(checks) {
  return async (req, res, next) => {
    await Promise.all(checks.map((check) => check.run(req)));
    const errors = validationResult(req);
    const sentErrors = errors.array().map((error) => error.msg);
    if (!errors.isEmpty()) {
      res.status(400).json(sentErrors);
      // res.status(400).json({ errors: errors.array() });
      // res.send(sentErrors);
      return;
    }
    return next();
  };
}
