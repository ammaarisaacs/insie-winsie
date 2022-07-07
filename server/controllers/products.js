const { product, media, category_detail, category_item } = require("../models");
const ApiError = require("../errors/errors");
const { response } = require("express");

// const multer = require("multer");
// const upload = multer({ dest: "./images" });

exports.createProduct = async function (req, res, next) {
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
    console.log(result);
  } catch (error) {
    return next(ApiError.internal());
  }

  //   product
  //     .create(newProduct)
  //     .then((result) => {
  //       res.status(200).json({
  //         message: "Product added successfully",
  //       });
  //     })
  //     .catch((err) => {
  //       next(ApiError.internal());
  //     });
};

exports.fetchProducts = async function (req, res, next) {
  // check these links out for further stuff on search
  // https://youtu.be/672cituGWac
  // https://youtu.be/9asw2jSi4zE
  // https://www.youtube.com/watch?v=mZvKPtH9Fzo&ab_channel=PedroTech
  // https://youtu.be/MY6ZZIn93V8
  // https://youtu.be/x7niho285qs

  // pagination
  // https://youtu.be/QoI_F_Fj8Lo

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
  const { id } = req.body;

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
exports.createCarouselProduct = async function (req, res, next) {};
exports.updateCarouselProducts = async function (req, res, next) {};
exports.deleteCarouselProduct = async function (req, res, next) {};

// pagination
// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
// look at count and offset
// ordering and sorting for sort functionality
