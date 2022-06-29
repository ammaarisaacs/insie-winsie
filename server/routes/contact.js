const express = require("express");
const ApiError = require("../errors/errors");
const router = express.Router();
const contactInfo = require("../mockdata/mockContactInfo");

router.route("/").post((req, res, next) => {});

module.exports = router;
