const express = require("express");
const router = express.Router();

const { getShippingRate } = require("../controllers/checkout");

// require("dotenv").config();
// const stripe = require("stripe")(provess.env.STRIPE_SECRET_KEY);

// router.route("/session").post((req, res) => {
//   const session = (async () => await stripe.checkout.sessions.create({}))();
// });

router.route("/").post(getShippingRate);

module.exports = router;
