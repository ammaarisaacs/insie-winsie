const { UserError } = require("../errors");
const { errLogger } = require("../lib/logger");

const apiErrorHandler = (err, req, res, next) => {
  if (err instanceof UserError) {
    res.status(err.code).json(err.message);
  } else {
    res.status(500).json("Something went wrong.");
  }

  errLogger.error({
    message: err.message,
    code: err.code,
    stack: err.stack,
  });
};

module.exports = apiErrorHandler;
