const rateLimiter = require("express-rate-limit");

// https://stackoverflow.com/questions/65569610/i-need-to-apply-middleware-for-everyone-excepte-a-few-ips-but-i-cant-get-req-a

exports.limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

exports.postLimiter = rateLimiter({
  windowMs: 0.5 * 60 * 1000,
  max: 1,
  standardHeaders: false,
  legacyHeaders: false,
});
