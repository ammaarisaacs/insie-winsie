const dns = require("dns");
const { ApiError } = require("../errors");

const validateSource = (req, res, next) => {
  const ip =
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  // use dns to lookup
  // use that to check if it is a valid ip
  // make origin either that dns lookup domain name || req.headers.origin

  console.log(req.headers);

  const origin = req.headers.origin;

  // check how you can get the source of the user-agent
  // possible solution: use white list of only the valid url and nothing else
  // origin contains everything with http and all that, so need to check for http / https in there

  const source = req.headers["user-agent"];

  // white list userAgent

  if (!!source.match(/Postman/) || !!source.match(/curl/)) {
    next(ApiError.invalidProperty("Invalid user agent detected as " + source));
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

  next();
};

module.exports = validateSource;
