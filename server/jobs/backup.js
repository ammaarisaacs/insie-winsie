const cron = require("node-cron");
const fs = require("fs");
const spawn = require("child_process").spawn;
const { logger, errLogger } = require("../lib/logger");
require("dotenv").config;

const backup = cron.schedule(process.env.CRON_STRING, () => {
  const currDate = new Date().toDateString().split(" ").join("");
  const fileName = `${process.env.PROD_DB_NAME}_${currDate}.sql`;
  const wstream = fs.createWriteStream(`${process.env.BACKUP_DIR}${fileName}`, {
    flags: "w",
  });

  logger.log({
    level: "info",
    message: "--------------------------------------------------",
  });
  logger.log({ level: "info", message: "Running Database Backup Cron Job" });

  const mysqldump = spawn("mysqldump", [
    "-u",
    process.env.PROD_DB_USERNAME,
    `-p${process.env.PROD_DB_PASSWORD}`,
    process.env.PROD_DB_NAME,
  ]);
  mysqldump.stdout
    .pipe(wstream)
    .on("finish", () => {
      logger.info({ message: "Database backup successful" });
      logger.info({
        message: "--------------------------------------------------",
      });
    })
    .on("error", (err) => {
      logger.info({
        message: "--------------------------------------------------",
      });
      errLogger.error({
        message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      });
      errLogger.error({ message: "Database backup failed" });
      errLogger.error({ message: err });
      errLogger.error({
        message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      });
    })
    .on("stderr", (stderr) => {
      errLogger.error({ message: "Database backup failed" });
      errLogger.error({ message: stderr });
      errLogger.error({
        message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      });
    });
});

module.exports = backup;
