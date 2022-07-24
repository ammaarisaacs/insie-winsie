const ApiError = require("../errors/errors");
// require a logger lib because clg is synch. therefore not good for prod.

const apiErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }

  res.status(500).json("Internal server error.");
};

module.exports = apiErrorHandler;
