class UserError extends Error {
  constructor(code, message) {
    super(code, message);
    this.code = code;
    this.message = message;
  }

  static badRequest(msg = "Bad request.") {
    return new UserError(400, msg);
  }

  static notFound() {
    return new ApiError(404, `The requested item is not available.`);
  }

  static invalidProperty(msg = "Invalid property.") {
    return new UserError(400, msg);
  }

  static uniqueConstraintError(value) {
    return new UserError(`${value} must be unique.`);
  }

  static requiredParameterError(param) {
    return new UserError(`${param} can not be null or undefined.`);
  }
}

module.exports = UserError;

// 429 Too Many Requests
// The user has sent too many requests in a given amount of time ("rate limiting").
