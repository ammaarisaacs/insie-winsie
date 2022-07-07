const express = require("express");
const ApiError = require("../errors/errors");
const router = express.Router();

router.route("/").post((req, res, next) => {});

module.exports = router;
