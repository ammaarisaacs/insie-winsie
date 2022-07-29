const { validationResult } = require("express-validator");
const { productChecks } = require("./product");
const { ShippingRateChecks, CreateOrdersChecks } = require("./order");
const { contactChecks } = require("./contact");

// product

exports.validateFetchProducts = makeValidation(productChecks);

// order

exports.validateFetchShippingRate = makeValidation(ShippingRateChecks);
exports.validateCreateOrder = makeValidation(CreateOrdersChecks);

// contact

exports.validateCreateContact = makeValidation(contactChecks);

function makeValidation(checks) {
  return async (req, res, next) => {
    console.log(req.body);
    await Promise.all(checks.map((check) => check.run(req)));
    const errors = validationResult(req);
    console.log(errors);
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
