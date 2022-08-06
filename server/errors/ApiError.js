// 404 resource not available
// 400 bad request from user
// 500 internal

// add more to constructor for more meaningful errors for you
// these will actually be logged in the server

class ApiError extends Error {
  constructor(code, message) {
    super(code, message);
    this.code = code;
    this.message = message;
    this.timestamp = Date.now();
  }

  static notFound(msg = "Resource not found.") {
    return new ApiError(404, msg);
  }

  static invalidProperty(msg = "Invalid property.") {
    return new ApiError(400, msg);
  }

  static mismatch(msg = "Mismatch.") {
    return new ApiError(409, msg);
  }

  static notAvailable() {
    return new ApiError(404, `The requested item is currently not available.`);
  }

  static noOrder() {
    return new ApiError(404, `The requested order could not be found.`);
  }

  static internal(msg = "Internal server error.") {
    return new ApiError(500, msg);
  }

  // static cartError(msg = "Cart Error") {
  //   return new ApiError(404, msg);
  // }

  // static orderError(msg = "Order Error") {
  //   return new ApiError(404, msg);
  // }

  // static paymentError(msg = "Payment Error.") {
  //   return new ApiError(404, msg);
  // }

  // static contactError(msg = "Contact Error.") {
  //   return new ApiError(404, msg);
  // }
}

module.exports = ApiError;
