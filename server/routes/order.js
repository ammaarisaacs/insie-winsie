const express = require("express");
const router = express.Router();

const {
  getShippingRate,
  fetchOrder,
  deleteOrder,
  updateOrder,
  createOrder,
  fetchOrders,
} = require("../controllers/order");

router.route("/").get(fetchOrders).post(createOrder);

router.route("/:id").get(fetchOrder).patch(updateOrder).delete(deleteOrder);

router.route("/shipping").post(getShippingRate);

module.exports = router;
