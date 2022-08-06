const { body } = require("express-validator");

exports.contactChecks = [
  body("firstName").notEmpty().withMessage("First name is required."),
  body("lastName").notEmpty().withMessage("Last name is required."),
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email.")
    .trim()
    .normalizeEmail(),
  body("cellphone")
    .notEmpty()
    .withMessage("Cellphone number is required.")
    .isNumeric()
    .withMessage("Only numbers allowed.")
    .isLength({ min: 2, max: 20 })
    .customSanitizer((value) => value.replace(/ /g, "")),
  body("message")
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ min: 5, max: 300 })
    .withMessage(
      "Message should be atleast 5 characters and at most 300 characters."
    )
    .trim()
    .escape(),
];
