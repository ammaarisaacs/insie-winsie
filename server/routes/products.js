const express = require("express");
const router = express.Router();
const products = require("../mockProducts");
const carouselProducts = require("../CarouselMockProducts");

router
  .route("/")
  .get((req, res) => {
    res.send(products);
  })
  .post((req, res) => {
    console.log(req.body);
    const newProduct = User;
  });

router
  .route("/carousel")
  .get((req, res) => {
    res.send(carouselProducts);
  })
  .post((req, res) => {})
  .patch((req, res) => {})
  .delete((req, res) => {});

router.route("/:id").get((req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === parseInt(id));
  res.send(product);
});

module.exports = router;
