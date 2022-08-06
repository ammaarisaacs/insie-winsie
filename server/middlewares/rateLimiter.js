// https://stackoverflow.com/questions/65569610/i-need-to-apply-middleware-for-everyone-excepte-a-few-ips-but-i-cant-get-req-a

const validIps = ["", "", ""];

const rateLimiter = (req, res, next) => {
  const ip = req.headers["x-forward-for"] || req.connection.remoteAddress;
};

module.exports = rateLimiter;
