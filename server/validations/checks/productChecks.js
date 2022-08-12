const { param, query } = require("express-validator");

// category
// whitelist check with categories

exports.fetchProductsChecks = [
  query("category")
    .default("")
    .if(query("category").isString())
    .trim()
    .toLowerCase()
    .escape()
    .if(query("category").isArray()),
  query("category.*").isString().trim().toLowerCase().escape(),

  query("search")
    .default("")
    .if(query("search").isString())
    .trim()
    .toLowerCase()
    .escape(),
];
exports.fetchProductChecks = [param("id").notEmpty().isUUID()];

exports.createProductChecks = {};
exports.deleteProductChecks = {};
exports.updateProductChecks = {};
