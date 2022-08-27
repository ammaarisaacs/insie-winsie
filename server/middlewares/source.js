const dns = require("dns");
const { ApiError } = require("../errors");
const { logger } = require("../lib/logger");

const validateSource = (req, res, next) => {
  const ip =
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const { hostname, method } = req;
  // use dns to lookup, use that to check if it is a valid ip, make origin either that dns lookup domain name || req.headers.origin
  const origin = req.headers.origin;
  // check how you can get the source of the user-agent, possible solution: use white list of only the valid url and nothing else, origin contains everything with http and all that, so need to check for http / https in there, white list userAgent
  const ua = req.headers["user-agent"];

  if (!!ua.match(/Postman/) || !!ua.match(/curl/)) {
    next(ApiError.invalidProperty("Invalid user agent detected as " + ua));
    return;
  }

  if (!origin) {
    next(ApiError.notFound("No origin found in request headers."));
    return;
  }

  const parsed = new URL(origin);
  const isValidUrl = ["https:", "http:"].includes(parsed.protocol);

  if (isValidUrl === false) {
    next(ApiError.invalidProperty("Invalid request origin as ", origin));
    return;
  }

  logger.log({
    level: "info",
    message: `${method} | ${ip} | ${hostname} | ${ua}`,
  });
  next();
};

module.exports = validateSource;
