const { ApiError } = require("../errors");
const { createContact } = require("../repo/contactRepo");

exports.createContactService = async (body) => {
  const { firstName, lastName, cellphone, email, message } = body;
  const contact = await createContact(
    firstName,
    lastName,
    cellphone,
    email,
    message
  );
  if (!contact) return ApiError.internal("Could not create contact.");
  return contact;
};
