const express = require("express");
const router = express.Router();

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

router.route("/complete").post(completeOrder);

router.route("/:id").get(fetchOrder).patch(updateOrder).delete(deleteOrder);
module.exports = router;
