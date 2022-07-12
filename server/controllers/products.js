const { product, media, category_detail, category_item } = require("../models");
const ApiError = require("../errors/errors");
const { response } = require("express");

// const multer = require("multer");
// const upload = multer({ dest: "./images" });

exports.createProduct = async function (req, res, next) {
  //  also need the media info

  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock_qty: req.body.stock_qty,
    in_carousel: req.body.in_carousel,
  };

  try {
    // need to add an SKU to identify unique product to check if it exists

    const result = await product.create(newProduct);

    res.send(result);
  } catch (error) {
    return next(ApiError.internal());
  }
};

exports.fetchProducts = async function (req, res, next) {
  const { search, category } = req.query;

  let queries = {};

  // check if it is a number or array with number inside, return error invalidQuery()

  if (Array.isArray(category)) queries.category = category;

  if (typeof category === "string" || category instanceof String)
    queries.category = category.split(",");

  if (search) queries.search = search;

  try {
    // check if sql injection can happen here in search in queries

    const products = await product.findAll({
      attributes: ["id", "name", "description", "price", "stock_qty"],
      where: req.query.search ? { name: queries.search } : {},
      include: [
        { model: media, attributes: ["file_name", "alt_text"] },
        {
          model: category_detail,
          attributes: [],
          where: req.query.category ? { name: queries.category } : {},
        },
      ],
    });

    // possible check for length here, return no products found

    res.send(products);
  } catch (error) {
    return next(ApiError.internal());
  }
};

exports.fetchProduct = async function (req, res, next) {
  const id = Number.parseInt(req.params.id);

  if (id.isNaN) return next(ApiError.invalidId());

  try {
    const foundProduct = await product.findOne({
      include: "media",
      where: { id },
    });

    res.send(foundProduct);
  } catch (error) {
    return next(ApiError.internal());
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
