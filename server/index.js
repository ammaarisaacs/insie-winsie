const db = require("./db/models");
const app = require("./api/v1");
const { logger, errLogger } = require("./lib/logger");
require("dotenv").config;

const PORT = process.env.PORT || 5000;

try {
  db.sequelize.sync().then(() => {
    logger.info({ message: "Database Synced" });
    app.listen(PORT, (err) => {
      if (err) {
        errLogger.error({ message: "Error connecting to server" });
      } else {
        logger.info({ message: `Server listening on port: ${PORT}` });
      }
    });
  });
} catch (error) {
  const { message, code, stack } = error;
  errLogger.error({ message, code, stack });
}
