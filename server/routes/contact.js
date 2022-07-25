const express = require("express");
const router = express.Router();
const { createContact } = require("../controllers/contact");
const { validateCreateContact } = require("../validations");

router.route("/").post(validateCreateContact, createContact);

module.exports = router;
