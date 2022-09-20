const dns = require("dns");
const { ApiError } = require("../errors");
const { logger, errLogger } = require("../lib/logger");

const allowedBrowsers = ["mozilla", "firefox", "safari", "opera mini"];
const allowedUrl = ["your url of your frontend"];

const validateSource = async (req, res, next) => {
  const ip =
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  // use dns to lookup, use that to check if it is a valid ip, make origin either that dns lookup domain name || req.headers.origin
  const { hostname, method, protocol } = req;
  const { origin, referer } = req.headers; // for post requests and CORS
  const ua = req.headers["user-agent"];
  // check how you can get the source of the user-agent, possible solution: use white list of only the valid url and nothing else, origin contains everything with http and all that, so need to check for http / https in there, white list userAgent

  logger.info({
    message: `\n
    ---------------------- INCOMING REQUEST ------------------------\n
    ${method} -- ${ip} -- ${referer || origin} -- ${ua}\n
    ----------------------------------------------------------------`,
  });

  // validate protocol
  // console.log("full url apparently", req.get("Host"));
  // console.log("remoteadress", req.socket.remoteAddress);
  // console.log(req);
  // console.log(ip);

  try {
    const parsed = new URL(origin || referer);

    // valid url
    const isValidUrl = ["https:", "http:"].includes(parsed.protocol);
    if (!isValidUrl)
      return next(ApiError.invalidProperty("Invalid origin: ", origin));

    // allowlist using referer || origin || hostname
    const clientIp = await ipLookup(parsed.host);
    logger.info({ message: `Client IP Address received as: ${clientIp}` });

    if (!!ua.match(/Postman/) || !!ua.match(/curl/))
      return next(ApiError.invalidProperty("Invalid user agent: ", ua));
  } catch (error) {
    // next(error);
  }

  // ua, instead make allowlist for browsers
  next();
};

module.exports = validateSource;

async function ipLookup(domain) {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, { all: true }, (err, address, family) => {
      if (err) {
        reject(err);
      } else {
        const addressIps = address.map(function (item) {
          return item.address;
        });
        resolve(addressIps);
      }
    });
  });
}
