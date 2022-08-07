const { body, check } = require("express-validator");
const noSpecialChars = require("../utils/noSpecialChars");

// https://www.freecodecamp.org/news/how-to-perform-custom-validation-in-your-express-js-app-432eb423510f

// change all id's to uuid

const provinces = ["NL", "WP", "GT", "LP", "NC", "NW", "FS", "EC"];

exports.FetchOrdersChecks = () => {};
exports.FetchOrderChecks = () => {};
exports.ShippingRateChecks = [
  body().isObject(),
  body("firstName")
    .notEmpty()
    .isLength({ min: 1, max: 50 })
    .custom((val) => noSpecialChars(val))
    .trim()
    .toLowerCase(),
  body("lastName")
    .notEmpty()
    .isLength({ min: 1, max: 50 })
    .custom((val) => noSpecialChars(val))
    .trim()
    .toLowerCase(),
  body("email")
    .notEmpty()
    .isLength({ min: 1, max: 50 })
    .custom((val) => noSpecialChars(val))
    .trim()
    .toLowerCase(),
  body("cellphone").notEmpty().isNumeric().isLength({ min: 1, max: 100 }),
  body("street")
    .notEmpty()
    .isLength({ min: 1, max: 100 })
    .custom((val) => noSpecialChars(val))
    .trim()
    .toLowerCase(),
  body("area").notEmpty().isLength({ min: 1, max: 50 }).trim().toLowerCase(),
  body("zipcode").notEmpty().isNumeric().isLength({ min: 1, max: 10 }),
  body("province").notEmpty().isAlpha().isIn(provinces).trim().toLowerCase(),
];
exports.CreateOrdersChecks = [
  body().isObject(),
  body("cart").notEmpty().isObject(),
  body("cart.items").notEmpty().isArray({ min: 1 }),
  body("cart.items.*.product").notEmpty().isObject(),
  body("cart.items.*.orderQty").notEmpty().isInt(),
  // change all id's to uuid's
  body("cart.items.*.product.id").notEmpty().isInt(),
  body("cart.items.*.product.name")
    .notEmpty()
    .isLength({ min: 1, max: 50 })
    .custom((val) => noSpecialChars(val)),
  body("cart.items.*.product.description")
    .notEmpty()
    .custom((val) => noSpecialChars(val)),
  body("cart.items.*.product.price")
    .notEmpty()
    .isDecimal({ decimal_digits: 2 }),
  body("cart.items.*.product.stock_qty").notEmpty().isInt(),
  body("cart.total").isDecimal().isDecimal({ decimal_digits: 2 }),
  body("shipping").notEmpty().isObject(),
  body("shipping.firstName")
    .notEmpty()
    .trim()
    .toLowerCase()
    .isLength({ min: 1, max: 30 }),
  body("shipping.lastName")
    .notEmpty()
    .trim()
    .toLowerCase()
    .isLength({ min: 1, max: 30 })
    .custom((val) => noSpecialChars(val)),
  body("shipping.email")
    .notEmpty()
    .trim()
    .normalizeEmail()
    .toLowerCase()
    .isLength({ min: 1, max: 50 })
    .custom((val) => noSpecialChars(val)),
  body("shipping.cellphone")
    .notEmpty()
    .trim()
    .isLength({ min: 1, max: 20 })
    .custom((val) => noSpecialChars(val)),
  body("shipping.street")
    .notEmpty()
    .trim()
    .isLength({ min: 1, max: 50 })
    .custom((val) => noSpecialChars(val)),
  body("shipping.area")
    .notEmpty()
    .trim()
    .isLength({ min: 1, max: 30 })
    .custom((val) => noSpecialChars(val)),
  body("shipping.zipcode").notEmpty().trim().isLength({ min: 1, max: 10 }),
  body("shipping.province").notEmpty().trim().isAlpha().isIn(provinces),
  check("billing").optional().isObject(),
  check("billing.firstName")
    .if(body("billing").exists())
    .notEmpty()
    .isLength({ min: 1, max: 30 }),
  check("billing.lastName")
    .if(body("billing").exists())
    .notEmpty()
    .isLength({ min: 1, max: 30 }),
  check("billing.email")
    .if(body("billing").exists())
    .notEmpty()
    .isLength({ min: 1, max: 50 }),
  check("billing.cellphone")
    .if(body("billing").exists())
    .isLength({ min: 1, max: 20 })
    .notEmpty()
    .isNumeric(),
  check("billing.street")
    .if(body("billing").exists())
    .notEmpty()
    .isLength({ min: 1, max: 50 }),
  check("billing.area")
    .if(body("billing").exists())
    .notEmpty()
    .isLength({ min: 1, max: 30 }),
  check("billing.zipcode")
    .if(body("billing").exists())
    .notEmpty()
    .isNumeric()
    .isLength({ min: 1, max: 10 }),
  check("billing.province")
    .if(body("billing").exists())
    .notEmpty()
    .isAlpha()
    .isIn(provinces),
];
exports.ITNChecks = [];
exports.UpdateOrdersChecks = [];
exports.DeletOrdersChecks = [];
