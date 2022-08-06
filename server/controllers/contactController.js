const { ApiError, UserError } = require("../errors");
const { createContactService } = require("../services/contactService");

exports.createContact = async (req, res, next) => {
  try {
    const result = await createContactService(req.body);
    if (result instanceof ApiError || result instanceof UserError) {
      next(result);
      return;
    }
    res.send("Success. We will be in contact with you.");
  } catch (error) {
    return next(error);
  }
};
