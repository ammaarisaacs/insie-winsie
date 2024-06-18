const dns = require("dns");
const { ApiError } = require("../errors");
const { logger, errLogger } = require("../lib/logger");
const useragent = require("useragent");

const validateSource = async (req, res, next) => {
  const ip =
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const ua = req.headers["user-agent"];
  const agent = useragent.parse(ua);

  logger.info({
    message: `\n
    ---------------------- INCOMING REQUEST ------------------------
    method -- ${req.method} 
    ip -- ${ip} 
    origin -- ${req.headers.referer || req.headers.origin} 
    user-agent -- ${agent}
    ----------------------------------------------------------------`,
  });

  try {
    // only browsers
    if (agent.family == "Other") {
      next(ApiError.invalidProperty(`Invalid user agent: ${agent.source}`));
      return;
    }
    const parsed = new URL(origin || referer);
    // valid url
    const isValidUrl = ["https:", "http:"].includes(parsed.protocol);
    if (!isValidUrl) {
      next(ApiError.invalidProperty(`Invalid origin: ${origin}`));
      return;
    }
    // get ip
    const clientIp = await ipLookup(parsed.host);
    logger.info({ message: `Client IP Address received as: ${clientIp}` });
  } catch ({ message, code, stack }) {
    errLogger.error({ message, code, stack });
  }
  next();
  return;
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

// check how you can get the source of the user-agent, possible solution: use white list of only the valid url and nothing else, origin contains everything with http and all that, so need to check for http / https in there, white list userAgent
// validate protocol
// console.log("full url apparently", req.get("Host"));
// console.log("remoteadress", req.socket.remoteAddress);
// console.log(req);
// console.log(ip);
// use dns to lookup, use that to check if it is a valid ip, make origin either that dns lookup domain name || req.headers.origin
