require("dotenv").config;
const makeErrLogger = ({ createLogger, transports, format }) => {
  const { combine, timestamp, errors, align, printf } = format;

  const colors = {
    info: "\x1b[36m",
    error: "\x1b[31m",
    warn: "\x1b[33m",
  };

  const logFormat = combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    align(),
    printf(({ level, message, timestamp, code, stack }) => {
      return `${timestamp} [${level.toUpperCase()}]${colors[level]}
      ${code ? code : ""}
      ${message}
      ${stack ? stack : ""}
        \x1b[0m`;
    })
  );

  return createLogger({
    format: logFormat,
    level: "error",
    transports: [
      new transports.Console(),
      new transports.File({ filename: "logs/app-error.log" }),
    ],
  });
};

module.exports = makeErrLogger;
