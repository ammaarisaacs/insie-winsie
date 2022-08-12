const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
const makeDevLogger = require("./devLogger");
const makeProdLogger = require("./prodLogger");

const loggerDependencies = {
  createLogger,
  format,
  transports,
  combine,
  timestamp,
  label,
  printf,
};

const devLogger = makeDevLogger(loggerDependencies);
const prodLogger = makeProdLogger(loggerDependencies);

let logger = null;

if (process.env.NODE_ENV !== "production") {
  logger = prodLogger;
} else if (process.env.NODE_ENV !== "development") {
  logger = devLogger;
}

module.exports = logger;

// info you want
// req method
// req body if not sensitive info
// ip address
// user agent
// highlighted timestamp
