const { validationResult } = require("express-validator");
const {
  fetchProductsChecks,
  fetchProductChecks,
} = require("../validations/checks/productChecks");
const { contactChecks } = require("../validations/checks/contactChecks");
const {
  shippingRateChecks,
  createOrdersChecks,
  confirmPaymentChecks,
  completeOrderChecks,
} = require("../validations/checks/orderChecks");

// product

exports.validateFetchProducts = makeValidation(fetchProductsChecks);
exports.validateFetchProduct = makeValidation(fetchProductChecks);

// order

exports.validateFetchShippingRate = makeValidation(shippingRateChecks);
exports.validateCreateOrder = makeValidation(createOrdersChecks);
exports.validateCompleteOrder = makeValidation(completeOrderChecks);
exports.validateConfirmPayment = makeValidation(confirmPaymentChecks);

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
      return;
    }
    return next();
  };
}
