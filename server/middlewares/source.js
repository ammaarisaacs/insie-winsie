const dns = require("dns");
const { ApiError } = require("../errors");
const { logger, errLogger } = require("../lib/logger");
const useragent = require("useragent");

// check how you can get the source of the user-agent, possible solution: use white list of only the valid url and nothing else, origin contains everything with http and all that, so need to check for http / https in there, white list userAgent
// validate protocol
// console.log("full url apparently", req.get("Host"));
// console.log("remoteadress", req.socket.remoteAddress);
// console.log(req);
// console.log(ip);
// use dns to lookup, use that to check if it is a valid ip, make origin either that dns lookup domain name || req.headers.origin

const allowedBrowsers = ["mozilla", "firefox", "safari", "opera mini"];
const allowedUrl = ["your url of your frontend"];

const validateSource = async (req, res, next) => {
  console.log(req.headers);

  const ip =
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const { hostname, method, protocol } = req;
  const { origin, referer } = req.headers; // for post requests and CORS
  const ua = req.headers["user-agent"];
  const agent = useragent.parse(ua);

  logger.info({
    message: `\n
    ---------------------- INCOMING REQUEST ------------------------
    method -- ${method} 
    ip -- ${ip} 
    origin -- ${referer || origin} 
    user-agent -- ${agent}
    ----------------------------------------------------------------`,
  });

  try {
    if (agent.family == "Other") {
      next(ApiError.invalidProperty(`Invalid user agent: ${agent.source}`));
      return;
    } // only allow browsers

    const parsed = new URL(origin || referer);

    console.log(req.get("User-Agent"));

    const isValidUrl = ["https:", "http:"].includes(parsed.protocol); // valid url

    if (!isValidUrl) {
      next(ApiError.invalidProperty(`Invalid origin: ${origin}`));
      return;
    }

    const clientIp = await ipLookup(parsed.host); // allowlist using referer || origin || hostname

    logger.info({ message: `Client IP Address received as: ${clientIp}` });

    // if (!!ua.match(/Postman/) || !!ua.match(/curl/))
    //   return next(ApiError.invalidProperty("Invalid user agent: ", ua));
  } catch ({ message, code, stack }) {
    errLogger.error({ message, code, stack });
    // } catch (error) {
    // next(error);
    // return;
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
