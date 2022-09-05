const express = require(express);
const db = require("./db/models");
const app = require("./api/v1");
require("dotenv").config;
const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  logger.log({ level: "info", message: "Database Synced" });
  app.listen(PORT, (err) => {
    if (err)
      errLogger.log({ level: "info", message: "Error connecting to server" });
    logger.log({
      level: "info",
      message: `Server listening on port: ${PORT}`,
    });
  });
});
