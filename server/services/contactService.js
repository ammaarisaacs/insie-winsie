const { ApiError } = require("../errors");
const { sendContactUsEmail } = require("../lib/email");
const { createContact } = require("../repo/contactRepo");
const { logger, errLogger } = require("../lib/logger");

exports.createContactService = async (body) => {
  const { firstName, lastName, cellphone, email, message } = body;
  logger.info({ message: "Creating a contact entry" });
  const contact = await createContact(
    firstName,
    lastName,
    cellphone,
    email,
    message
  );
  if (!contact) return ApiError.internal("Could not create contact.");
  const sentEmail = await sendContactUsEmail(contact);
  if (!sentEmail) return next(ApiError.internal("Sending email unsuccessful"));
  errLogger.error({ message: JSON.stringify(contact) });
  return contact;
};
