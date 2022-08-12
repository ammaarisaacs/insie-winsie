const { body, check, param } = require("express-validator");
const {
  checkEmail,
  checkNumeric,
  checkCell,
  checkUnspecialString,
  checkOptionalString,
  checkOptionalCell,
  checkOptionalEmail,
  checkOptionalNumeric,
  checkString,
} = require("../validators/common");

// https://www.freecodecamp.org/news/how-to-perform-custom-validation-in-your-express-js-app-432eb423510f

const provinces = ["NL", "WP", "GT", "LP", "NC", "NW", "FS", "EC"];

exports.shippingRateChecks = [
  body().isObject(),
  checkUnspecialString("firstName"),
  checkUnspecialString("lastName").isAlpha(),
  checkEmail("email", 50),
  checkCell("cellphone", 20),
  checkUnspecialString("street", 100),
  checkUnspecialString("area", 50),
  checkNumeric("zipcode", 4),
  body("province").notEmpty().isAlpha().trim().isIn(provinces).toLowerCase(),
];

exports.createOrdersChecks = [
  body().isObject(),
  body("cart").notEmpty().isObject(),
  body("cart.items").notEmpty().isArray({ min: 1 }),
  body("cart.items.*.product").notEmpty().isObject(),
  body("cart.items.*.product.id").notEmpty().isUUID(),
  checkUnspecialString("cart.items.*.product.name", 50),
  checkString("cart.items.*.product.description", 300),
  body("cart.items.*.product.price")
    .notEmpty()
    .isDecimal({ decimal_digits: 2 }),
  body("cart.items.*.product.stock_qty").notEmpty().isInt(),
  body("cart.items.*.orderQty").notEmpty().isInt(),
  body("cart.total").isDecimal({ decimal_digits: 2 }),

  body("shipping").notEmpty().isObject(),
  checkUnspecialString("shipping.firstName", 30),
  checkUnspecialString("shipping.lastName", 30),
  checkEmail("shipping.email", 50),
  checkCell("shipping.cellphone", 20),
  checkUnspecialString("shipping.street", 50),
  checkUnspecialString("shipping.area", 30),
  checkNumeric("shipping.zipcode", 4),
  body("shipping.province").notEmpty().trim().isAlpha().isIn(provinces),

  check("billing").optional().isObject(),
  checkOptionalString("billing", "billing.firstName", 30),
  checkOptionalString("billing", "billing.lastName", 30),
  checkOptionalEmail("billing", "billing.email", 50),
  checkOptionalCell("billing", "billing.cellphone", 20),
  checkOptionalString("billing", "billing.street", 30),
  checkOptionalString("billing", "billing.area", 30),
  checkOptionalNumeric("billing", "billing.zipcode", 10),
  check("billing.province")
    .if(body("billing").exists())
    .notEmpty()
    .isAlpha()
    .isIn(provinces),
];

exports.completeOrderChecks = [
  body("item_name").notEmpty().isInt(),
  body("pf_payment_id").notEmpty(),
  body("order").notEmpty().isObject(),
  body("signature").isHash("md5"),
];

exports.confirmPaymentChecks = [param("id").notEmpty().isUUID()];

exports.FetchOrdersChecks = [];
exports.FetchOrderChecks = [];
exports.UpdateOrdersChecks = [];
exports.DeletOrdersChecks = [];
