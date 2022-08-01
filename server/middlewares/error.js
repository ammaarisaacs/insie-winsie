const { UserError } = require("../errors");

const apiErrorHandler = (err, req, res, next) => {
  if (err instanceof UserError) {
    res.status(err.code).json(err.message);
  } else {
    res.status(500).json("Something went wrong.");
  }

  // logger of error
  console.error("\x1b[31m%s\x1b[31m", err.code);
  console.error("\x1b[31m%s\x1b[31m", err.message);
  console.error("\x1b[31m%s\x1b[31m", err.stack);
};

module.exports = apiErrorHandler;
