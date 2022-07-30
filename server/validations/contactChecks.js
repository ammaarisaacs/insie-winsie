const { body, param, query } = require("express-validator");

exports.contactChecks = [
  body("firstName").notEmpty().withMessage("First name is required."),
  body("lastName").notEmpty().withMessage("Last name is required."),
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email.")
    .normalizeEmail(),
  body("cellphone")
    .notEmpty()
    .withMessage("Cellphone number is required.")
    .isNumeric()
    .withMessage("Invalid cellphone number"),
  body("message")
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ min: 5, max: 300 })
    .withMessage("Check length of message.")
    .escape(),
];
