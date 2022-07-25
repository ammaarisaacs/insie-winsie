const { contact, sequelize } = require("../models");
const ApiError = require("../errors/errors");

exports.createContact = async (req, res, next) => {
  const { firstName, lastName, cellphone, email, message } = req.body;

  try {
    const createdContact = await contact.create({
      first_name: firstName,
      last_name: lastName,
      cellphone,
      email,
      message,
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (!createdContact) return next(ApiError.contactError());

    res.send("Success. We will be in contact with you.");
  } catch (error) {
    return next(
      ApiError.internal("Error making contact. Please try again later.")
    );
  }
};
