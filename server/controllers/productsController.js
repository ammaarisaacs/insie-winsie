const { product } = require("../db/models");
const { ApiError, UserError } = require("../errors/");
const {
  getProductsService,
  fetchProductService,
} = require("../services/productsService");

// const multer = require("multer");
// const upload = multer({ dest: "./images" });

exports.createProduct = async function (req, res, next) {
  const { name, description, price, stock_qty, in_carousel } = req.body;
  //  also need the media info
  // validate info

  try {
    // need to add an SKU to identify unique product to check if it exists
    // maybe create some sort of lookup first and let admin know you have it or not

    const result = await product.create(
      name,
      description,
      price,
      stock_qty,
      in_carousel
    );
    res.send(result);
  } catch (error) {
    next(error);
  }
};

exports.fetchProducts = async function (req, res, next) {
  const { search, category } = req.query;
  try {
    const result = await getProductsService(search, category);
    if (result instanceof ApiError || result instanceof UserError) {
      next(result);
      return;
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
};

exports.fetchProduct = async function (req, res, next) {
  const { id } = req.params;
  try {
    const result = await fetchProductService(id);
    if (result instanceof ApiError || result instanceof UserError) {
      next(result);
      return;
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
};

exports.fetchCarouselProducts = async function (req, res, next) {
  try {
    const products = await product.findAll({
      include: "media",
      where: { in_carousel: true },
    });

    res.send(products);
  } catch (error) {
    return next(ApiError.internal());
  }
};

exports.deleteProduct = async function (req, res, next) {
  // validate admin user

  const { id } = req.params;

  if (isNaN(id)) return next(ApiError.invalidId());

  try {
    const result = await product.destroy({ where: { id } });

    if (!result) return res.send("Product wasn't found, could not delete.");

    res.send("Product successfully deleted.");
  } catch (error) {
    console.log(error);
    return next(ApiError.internal());
  }
};

exports.updateProduct = async function (req, res, next) {};
