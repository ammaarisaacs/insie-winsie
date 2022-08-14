require("dotenv").config();

const makeProdLogger = ({ createLogger, transports, format }) => {
  const { combine, timestamp, json, prettyPrint, align } = format;

  const logFormat = combine(timestamp(), align(), json(), prettyPrint());

  return createLogger({
    format: logFormat,
    level: process.env.LOG_LEVEL,
    transports: [
      new transports.Console({ colorize: true }),
      new transports.File({ filename: "logs/app.log", level: "info" }),
      // new transports.File({ filename: "logs/app-error.log", level: "error" }),
    ],
  });
};

module.exports = makeProdLogger;
