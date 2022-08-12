const makeDevLogger = ({
  createLogger,
  format,
  transports,
  combine,
  timestamp,
  label,
  printf,
}) => {
  const logFormat = combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return `${timestamp} ----- [${level.toUpperCase()}] ${message}`;
    })
  );

  return createLogger({
    format: logFormat,
    level: "debug",
    transports: [new transports.Console()],
  });
};

module.exports = makeDevLogger;
