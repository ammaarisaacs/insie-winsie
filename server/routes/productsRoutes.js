const express = require("express");
const router = express.Router();

const {
  fetchProduct,
  createProduct,
  fetchProducts,
  fetchCarouselProducts,
  deleteProduct,
} = require("../controllers/productsController");

const { validateFetchProducts } = require("../validations");

router
  .route("/")
  .get(validateFetchProducts, fetchProducts)
  .post(createProduct)
  .delete(deleteProduct);

router.route("/carousel").get(fetchCarouselProducts).post().patch().delete();

router.route("/:id").get(fetchProduct);

module.exports = router;
