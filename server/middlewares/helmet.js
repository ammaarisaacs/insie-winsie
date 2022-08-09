const helmet = require("helmet");

const helmetConfig = helmet();
// const helmetConfig = helmet({
//   crossOriginEmbedderPolicy: false,
// });

module.exports = helmetConfig;
