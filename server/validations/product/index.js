const { body, param, query } = require("express-validator");

exports.fetchProductsChecks = () => {
  const checks = [param("category")];
  return checks;
};

exports.fetchProductChecks = () => {};
exports.createProductChecks = () => {};
exports.deleteProductChecks = () => {};
exports.updateProductChecks = () => {};

// const { makeValidateProduct } = require("./validate");
// const { body, param, query, validationResult } = require("express-validator");
// exports.validateFetchProducts = makeValidateProduct(
//   param,
//   query,
//   validationResult
// );
// exports.validateFetchProduct = makeValidateProduct(param, validationResult);
// exports.validateCreateProduct = makeValidateProduct(body, validationResult);
// exports.validateUpdateProduct = makeValidateProduct(body, validationResult);
// exports.validateDeleteProduct = makeValidateProduct(param, validationResult);
