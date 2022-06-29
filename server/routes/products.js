const express = require("express");
const router = express.Router();

const {
  fetchProduct,
  createProduct,
  fetchProducts,
  fetchCarouselProducts,
} = require("../controllers/products");

router.route("/").get(fetchProducts).post(createProduct);

router.route("/carousel").get(fetchCarouselProducts).post().patch().delete();

router.route("/:id").get(fetchProduct);

module.exports = router;
