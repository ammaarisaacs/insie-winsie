const cron = require("node-cron");
const fs = require("fs");
const spawn = require("child_process").spawn;
const { logger, errLogger } = require("../lib/logger");
const { sendDbBackupEmail } = require("../lib/email");
require("dotenv").config;

const infoLineBreak = "--------------------------------------------------";
const errorLinebreak = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const backup = cron.schedule(process.env.CRON_STRING, () => {
  const currDate = new Date().toDateString().split(" ").join("");
  const fileName = `${process.env.PROD_DB_NAME}_${currDate}.sql`;
  const wstream = fs.createWriteStream(`${process.env.BACKUP_DIR}${fileName}`, {
    flags: "w",
  });

  logger.log({ level: "info", message: infoLineBreak });
  logger.log({ level: "info", message: "Running Database Backup Cron Job" });

  const mysqldump = spawn("mysqldump", [
    "-u",
    process.env.PROD_DB_USERNAME,
    `-p${process.env.PROD_DB_PASSWORD}`,
    process.env.PROD_DB_NAME,
  ]);

  mysqldump.stdout
    .pipe(wstream)
    .on("finish", handleSuccess(fileName))
    .on("error", handleFailure)
    .on("stderr", handleStdErr);
});

module.exports = backup;

const handleSuccess = (fileName) => {
  logger.info({ message: "Database backup successful" });
  logger.info({ message: infoLineBreak });
  logger.info({ message: "Sending Db backup email" });
  // sendDbBackupEmail(fileName);
};

const handleFailure = (err) => {
  logger.info({ message: infoLineBreak });
  errLogger.error({ message: errorLinebreak });
  errLogger.error({ message: "Database backup failed" });
  errLogger.error({ message: err });
  errLogger.error({ message: errorLinebreak });
};

const handleStdErr = (stderr) => {
  logger.info({ message: infoLineBreak });
  errLogger.error({ message: "Database backup failed" });
  errLogger.error({ message: stderr });
  errLogger.error({ message: errorLinebreak });
};
