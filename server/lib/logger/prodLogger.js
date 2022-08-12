const makeProdLogger = ({
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
      return `${timestamp} [${level.toUpperCase().padEnd(7)}] ${message}`;
    })
  );

  return createLogger({
    format: logFormat,
    level: "info",
    transports: [
      new transports.Console(),
      new transports.File({ filename: "combined.log" }),
    ],
  });
};

module.exports = makeProdLogger;
