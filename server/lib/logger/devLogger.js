require("dotenv").config();

const makeDevLogger = ({ createLogger, transports, addColors, format }) => {
  const { combine, timestamp, printf, errors, align, prettyPrint } = format;

  const logFormat = combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    align(),
    printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}] ${message}`;
    })
  );

  return createLogger({
    format: logFormat,
    level: process.env.LOG_LEVEL,
    transports: [new transports.Console()],
  });
};

module.exports = makeDevLogger;
