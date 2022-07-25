const express = require("express");
const router = express.Router();

const verifyPayment = require("../middlewares/verifyPayment");

const {
  validateCreateOrder,
  validateFetchShippingRate,
} = require("../validations");

const {
  getShippingRate,
  fetchOrder,
  deleteOrder,
  updateOrder,
  createOrder,
  fetchOrders,
  completeOrder,
  confirmPayment,
} = require("../controllers/order");

router.route("/").get(fetchOrders).post(validateCreateOrder, createOrder);

router.route("/shipping").post(validateFetchShippingRate, getShippingRate);

router.route("/success").post(verifyPayment, completeOrder);

router.route("/success/:id").get(confirmPayment);

router.route("/:id").get(fetchOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
