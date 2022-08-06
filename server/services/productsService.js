const { ApiError, UserError } = require("../errors");
const {
  getProductsBySearchAndFilter,
  getProductById,
} = require("../repo/productRepo");

exports.getProductsService = async (search, category) => {
  let validatedSearch, validatedCategory;
  //hpp protection
  if (!category) {
    validatedCategory = {};
  } else if (Array.isArray(category)) {
    validatedCategory = { name: category };
  } else if (typeof category === "string" || category instanceof String) {
    validatedCategory = { name: category.split(",") };
  }

  if (!search) {
    validatedSearch = {};
  } else if (typeof search === "string" || search instanceof String) {
    validatedSearch = { name: search };
  }

  if (validatedSearch != null && validatedCategory != null)
    return await getProductsBySearchAndFilter(
      validatedSearch,
      validatedCategory
    );
};

exports.fetchProductService = async (id) => {
  const validatedId = parseInt(id);
  if (Number.isNaN(validatedId))
    return UserError.invalidProperty("Invalid ID.");
  return (product = await getProductById(validatedId));
};
