const { contact } = require("../db/models");

exports.createContact = (first_name, last_name, cellphone, email, message) => {
  return contact.create({
    first_name,
    last_name,
    cellphone,
    email,
    message,
    created_at: new Date(),
    updated_at: new Date(),
  });
};
