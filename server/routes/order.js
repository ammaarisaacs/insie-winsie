const express = require("express");
const router = express.Router();

const { getShippingRate, fetchOrder } = require("../controllers/order");

router.route("/").post(getShippingRate);

router.route("/:id").get(fetchOrder);

module.exports = router;
