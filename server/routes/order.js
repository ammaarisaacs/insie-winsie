const express = require("express");
const router = express.Router();

const verifyPayment = require("../middlewares/verifyPayment");

const {
  getShippingRate,
  fetchOrder,
  deleteOrder,
  updateOrder,
  createOrder,
  fetchOrders,
  completeOrder,
} = require("../controllers/order");

router.route("/").get(fetchOrders).post(createOrder);

router.route("/shipping").post(getShippingRate);

router.route("/success").post(verifyPayment, completeOrder);

router.route("/:id").get(fetchOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
