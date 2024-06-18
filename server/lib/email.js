const nodemailer = require("nodemailer");
const path = require("path");
const { errLogger, logger } = require("./logger");
require("dotenv").config;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PWD,
  },
  disableUrlAccess: true,
});

exports.sendDbBackupEmail = (filename) => {
  transporter.sendMail(
    {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Insie Winsie Data Backup",
      text: `Insie winsie data backup ${filename}.`,
      attachments: [
        { filename, path: path.resolve(__dirname, `../backups/${filename}`) },
      ],
    },
    (err, info) => {
      if (err) {
        const { message, code, stack } = err;
        errLogger.error({ message, code, stack });
        // some logic to report to you
      } else {
        logger.info({ message: JSON.stringify(info) });
      }
    }
  );
};

exports.sendContactUsEmail = (contact) => {
  const { firstname, lastname, email, message } = contact;
  return transporter.sendMail(
    {
      from: email,
      to: process.env.EMAIL,
      subject: `Insie Winsie Contact - ${firstname} ${lastname} ${new Date()} `,
      text: message,
    },
    (err, info) => {
      if (err) {
        const { message, code, stack } = err;
        errLogger.error({ message, code, stack });
        // some logic to report to you
      } else {
        logger.info({ message: JSON.stringify(info) });
      }
    }
  );
};
