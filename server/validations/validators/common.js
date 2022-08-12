const { body, check } = require("express-validator");
const { onlyNumbersAndSpaces, despace, noSpecialChars } = require("./custom");

exports.checkString = (param, max) => {
  return body(param)
    .notEmpty()
    .isString()
    .isLength({ min: 1, max })
    .escape()
    .trim()
    .toLowerCase();
};

exports.checkUnspecialString = (param, max) => {
  return body(param)
    .notEmpty()
    .isString()
    .isLength({ min: 1, max })
    .custom(noSpecialChars)
    .withMessage("Remove any special characters.")
    .trim()
    .toLowerCase();
};

exports.checkNumeric = (param, max) => {
  return body(param).notEmpty().isLength({ min: 1, max }).isNumeric().escape();
};

exports.checkEmail = (param, max) => {
  return body(param)
    .notEmpty()
    .isLength({ min: 1, max })
    .escape()
    .trim()
    .isEmail()
    .normalizeEmail()
    .toLowerCase();
};

exports.checkCell = (param, max) => {
  return body(param)
    .notEmpty()
    .isLength({ min: 1, max })
    .custom(onlyNumbersAndSpaces)
    .trim()
    .escape()
    .customSanitizer(despace);
};

exports.checkOptionalString = (parent, param, max) => {
  return check(param)
    .if(body(parent).exists())
    .notEmpty()
    .isString()
    .isLength({ min: 1, max })
    .custom(noSpecialChars)
    .withMessage("Remove any special characters.")
    .trim()
    .toLowerCase();
};

exports.checkOptionalEmail = (parent, param, max) => {
  return check(param)
    .if(body(parent).exists())
    .notEmpty()
    .isLength({ min: 1, max })
    .escape()
    .trim()
    .isEmail()
    .normalizeEmail()
    .toLowerCase();
};

exports.checkOptionalCell = (parent, param, max) => {
  return check(param)
    .if(body(parent).exists())
    .notEmpty()
    .isLength({ min: 1, max })
    .custom(onlyNumbersAndSpaces)
    .trim()
    .escape()
    .customSanitizer(despace);
};

exports.checkOptionalNumeric = (parent, param, max) => {
  return check(param)
    .if(body(parent).exists())
    .notEmpty()
    .isLength({ min: 1, max })
    .isNumeric()
    .escape();
};
