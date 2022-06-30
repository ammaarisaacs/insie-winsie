const { product, media, category_detail, category_item } = require("../models");
const ApiError = require("../errors/errors");

const multer = require("multer");
const upload = multer({ dest: "./images" });

exports.createProduct = async function (req, res, next) {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock_qty: req.body.stock_qty,
    in_carousel: req.body.in_carousel,
  };

  product
    .create(newProduct)
    .then((result) => {
      res.status(200).json({
        message: "Product added successfully",
      });
    })
    .catch((err) => {
      next(ApiError.internal());
    });
};
category_item;
exports.fetchProducts = async function (req, res, next) {
  const products = await product.findAll({
    include: [{ model: media }, { model: category_detail, as: "category" }],
  });

  if (!products) next(ApiError.internal());

  res.send(products);
};

exports.fetchProduct = async function (req, res, next) {
  const id = Number.parseInt(req.params.id);

  if (id.isNaN) return next(ApiError.invalidId());

  const foundProduct = await product.findOne({
    include: "media",
    where: { id },
  });

  if (!foundProduct) next(ApiError.notAvailable());

  res.send(foundProduct);
};

exports.fetchCarouselProducts = async function (req, res, next) {
  const products = await product.findAll({
    include: "media",
    where: { in_carousel: true },
  });

  if (!products) return next(ApiError.internal());

  res.send(products);
};

exports.deleteProduct = async function (req, res, next) {};
exports.updateProduct = async function (req, res, next) {};
exports.createCarouselProduct = async function (req, res, next) {};
exports.updateCarouselProducts = async function (req, res, next) {};
exports.deleteCarouselProduct = async function (req, res, next) {};
