const nodemailer = require("nodemailer");
const path = require("path");
const { errLogger, logger } = require("./logger");
require("dotenv").config;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.INSIE_WINSIE_EMAIL,
    pass: process.env.APP_PWD,
  },
  disableUrlAccess: true,
});

exports.sendDbBackupEmail = (filename) => {
  transporter.sendMail(
    {
      from: process.env.INSIE_WINSIE_EMAIL,
      to: process.env.INSIE_WINSIE_EMAIL,
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
      } else {
        logger.info({ message: JSON.stringify(info) });
      }
    }
  );
};

exports.sendContactUsEmail = (contact) => {
  return transporter.sendMail(
    {
      from: contact.email,
      to: process.env.INSIE_WINSIE_EMAIL,
      subject: `Insie Winsie Contact ${new Date()} `,
      text: contact.text,
    },
    (err, info) => (err ? err : info)
  );
};

exports.sendOrderEmail = (itn) => {
  return transporter.sendMail(
    {
      from: process.env.INSIE_WINSIE_EMAIL,
      to: itn.email_address,
      subject: `Insie Winsie Order ${itn.order_item}`,
    },
    (err, info) => (err ? err : info)
  );
};

//   const mail = {
//     from: contact.email,
//     to: process.env.INSIE_WINSIE_EMAIL,
//     subject: `Insie Winsie Contact ${new Date()} `,
//     text: contact.text,
//   };

//   try {
//     const info = await transporter.sendMail(mail);
//     return info;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
