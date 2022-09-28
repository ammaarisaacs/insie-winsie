const express = require("express");
const router = express.Router();
const validatePayment = require("../middlewares/validatePayment");
const {
  validateCreateOrder,
  validateFetchShippingRate,
  validateConfirmPayment,
  validateCompleteOrder,
} = require("../middlewares/validateData");
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
const { postLimiter } = require("../middlewares/rateLimiter");

router.route("/shipping").post(validateFetchShippingRate, getShippingRate);

router
  .route("/success")
  .post(validatePayment, validateCompleteOrder, completeOrder);

router.route("/success/:id").get(validateConfirmPayment, confirmPayment);

router
  .route("/")
  .get(fetchOrders)
  .post(postLimiter, validateCreateOrder, createOrder);

router.route("/:id").get(fetchOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
