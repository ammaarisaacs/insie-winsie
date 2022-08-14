require("dotenv").config();

const makeDbLogger = ({ createLogger, transports, format }) => {
  const { combine, timestamp, printf, errors, align, colorize } = format;

  const colors = {
    info: "\x1b[36m",
    error: "\x1b[31m",
    warn: "\x1b[33m",
  };

  const logFormat = combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    align(),
    printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} [${level.toUpperCase()}] ${colors[level] || ""} ${
        stack || message
      }\x1b[0m`;
    })
  );

  return createLogger({
    format: logFormat,
    level: process.env.LOG_LEVEL,
    transports: [new transports.Console()],
  });
};

module.exports = makeDbLogger;
