const express = require("express");
const router = express.Router();

const verifyPayment = require("../middlewares/verifyPayment");

const { validateShippingRateRequest } = require("../validations");

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

router.route("/").get(fetchOrders).post(createOrder);

router.route("/shipping").post(validateShippingRateRequest, getShippingRate);

router.route("/success").post(verifyPayment, completeOrder);

router.route("/success/:id").get(confirmPayment);

router.route("/:id").get(fetchOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
