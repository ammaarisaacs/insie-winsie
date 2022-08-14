const { createLogger, format, transports, addColors } = require("winston");
const makeDevLogger = require("./devLogger");
const makeProdLogger = require("./prodLogger");
const makeDbLogger = require("./dbLogger");
const makeErrLogger = require("./errLogger");

const loggerDependencies = { createLogger, transports, addColors, format };

const devLogger = makeDevLogger(loggerDependencies);
const prodLogger = makeProdLogger(loggerDependencies);
const dbLogger = makeDbLogger(loggerDependencies);
const errLogger = makeErrLogger(loggerDependencies);

let logger = null;

if (process.env.NODE_ENV !== "production") {
  logger = devLogger;
} else {
  logger = prodLogger;
}

module.exports = { logger, dbLogger, errLogger };

// info you want
// req method
// req body if not sensitive info
// ip address
// user agent
// highlighted timestamp
// privateL true for private things
// colorizer for different logs
//  error -> red
//  normal -> white
//  db -> blue
//  success -> green
// warn -> yellow
