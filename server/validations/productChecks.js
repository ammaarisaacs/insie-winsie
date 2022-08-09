const { param, query } = require("express-validator");
const noSpecialChars = require("../utils/noSpecialChars");

const hasJavascript = (val) => {
  if (!val.includes("javascript")) return true;
  return false;
};

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
// must change id to uuid
exports.fetchProductChecks = [param("id").notEmpty().isUUID()];
exports.createProductChecks = {};
exports.deleteProductChecks = {};
exports.updateProductChecks = {};
