const express = require("express");
const router = express.Router();

const {
  fetchProduct,
  createProduct,
  fetchProducts,
  fetchCarouselProducts,
  deleteProduct,
} = require("../controllers/productsController");

router.route("/").get(fetchProducts).post(createProduct).delete(deleteProduct);

router.route("/carousel").get(fetchCarouselProducts).post().patch().delete();

router.route("/:id").get(fetchProduct);

module.exports = router;
