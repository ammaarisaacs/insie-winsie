const express = require("express");
const router = express.Router();
const { createContact } = require("../controllers/contactController");
const { validateCreateContact } = require("../middlewares/validateData");

router.route("/").post(validateCreateContact, createContact);

module.exports = router;
