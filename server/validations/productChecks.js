const { param, query } = require("express-validator");
const noSpecialChars = require("../utils/noSpecialChars");

const hasJavascript = (val) => {
  if (!val.includes("javascript")) return true;
  return false;
};
// search
// sanitize

// category
// whitelist check with categories
// can be an array
// check if it is a number or array with number inside, return error invalidQuery()

exports.fetchProductsChecks = [
  query("category")
    .default("")
    .if(query("category").isString())
    .trim()
    .toLowerCase()
    .if(query("category").isArray()),
  query("category.*").isString().trim().toLowerCase(),

  query("search")
    .default("")
    .if(query("search").isString())
    .trim()
    .toLowerCase(),
];
// must change id to uuid
exports.fetchProductChecks = [param("id").notEmpty().isInt()];
exports.createProductChecks = {};
exports.deleteProductChecks = {};
exports.updateProductChecks = {};
