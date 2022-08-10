const { body } = require("express-validator");

exports.checkString = (param, max) => {
  return body(param)
    .notEmpty()
    .isLength({ min: 1, max })
    .isString()
    .escape()
    .trim()
    .toLowerCase();
};
