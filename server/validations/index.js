const { validationResult } = require("express-validator");
const { productChecks } = require("./product");
const { ShippingRateChecks } = require("./order");

// product

exports.validateProductsRequest = makeValidation(productChecks);

// order

exports.validateShippingRateRequest = makeValidation(ShippingRateChecks);

function makeValidation(checks) {
  return async (req, res, next) => {
    await Promise.all(checks.map((check) => check.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    return next();
  };
}
