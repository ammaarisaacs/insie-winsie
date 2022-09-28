const express = require("express");
const router = express.Router();
const { createContact } = require("../controllers/contactController");
const { postLimiter } = require("../middlewares/rateLimiter");
const { validateCreateContact } = require("../middlewares/validateData");

router.route("/").post(postLimiter, validateCreateContact, createContact);

module.exports = router;
