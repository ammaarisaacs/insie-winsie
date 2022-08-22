const { ApiError, UserError } = require("../errors");
const { logger } = require("../lib/logger");
const {
  getProductsBySearchAndFilter,
  getProductById,
  getCarouselProducts,
  deleteProduct,
  createProduct,
  findProduct,
} = require("../repo/productRepo");

exports.getProductsService = async (search, category) => {
  let validatedSearch, validatedCategory;

  console.log(typeof search, typeof category);
  //hpp protection

  if (search || category) {
    logger.info({
      message: `Product query received: search [${search}] category [${category}]`,
    });
  }

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
  // do validation for uuid in exp-val
  return await getProductById(id);
};

exports.fetchCarouseProductsService = async () => {
  return await getCarouselProducts();
};

exports.createProductService = async (
  name,
  description,
  price,
  stock_qty,
  in_carousel
) => {
  // validate params
  // need to add an SKU to identify unique product to check if it exists
  // check if product is already in db
  // maybe create some sort of lookup first and let admin know you have it or not
  const existingProduct = await findProduct(
    name,
    description,
    price,
    stock_qty,
    in_carousel
  );

  if (existingProduct) return UserError.badRequest("Product already exists");

  const created = await createProduct(
    name,
    description,
    price,
    stock_qty,
    in_carousel
  );

  return created;
};

exports.deleteProductService = async (id) => {
  // do validation here for uuid in exp-val
  const deleted = await deleteProduct(id);

  if (!result)
    return ApiError.notFound("Product was not found, could not be deleted");

  return deleted;
};
