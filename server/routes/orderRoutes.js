const express = require("express");
const router = express.Router();
const validatePayment = require("../middlewares/validatePayment");
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
} = require("../controllers/orderController");

router.route("/").get(fetchOrders).post(validateCreateOrder, createOrder);

router.route("/shipping").post(validateFetchShippingRate, getShippingRate);

router.route("/success").post(validatePayment, completeOrder);

router.route("/success/:id").get(confirmPayment);

router.route("/:id").get(fetchOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
