const express = require("express");
const router = express.Router();
const {
  fetchProduct,
  createProduct,
  fetchProducts,
  fetchCarouselProducts,
  deleteProduct,
} = require("../controllers/productsController");

const {
  validateFetchProducts,
  validateFetchProduct,
} = require("../middlewares/validateData");

router
  .route("/")
  .get(validateFetchProducts, fetchProducts)
  .post(createProduct)
  .delete(deleteProduct);

router.route("/carousel").get(fetchCarouselProducts).post().patch().delete();

router.route("/:id").get(validateFetchProduct, fetchProduct);

module.exports = router;
