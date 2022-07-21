// 404 resource not available
// 400 bad request from user
// 500 internal

class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg = "Bad Request.") {
    return new ApiError(400, msg);
  }

  static internal(msg = "Something wen't wrong.") {
    return new ApiError(500, msg);
  }

  static invalidId() {
    return new ApiError(400, "Invalid ID.");
  }

  static zoneNotSupported() {
    return new ApiError(
      400,
      "Unsupported delivery location. Please refer to our deliveries section in FAQ"
    );
  }

  static deliveryError() {
    return new ApiError(400, "Do not support delivery to this location.");
  }

  static notAvailable() {
    return new ApiError(404, `The requested item is currently not available.`);
  }

  static noOrder() {
    return new ApiError(404, `The requested order could not be found.`);
  }

  static cartError() {
    return new ApiError(400, "Cart has invalid product.");
  }

  static orderError() {
    return new ApiError(
      404,
      "There was an error placing an order. Please try again later."
    );
  }

  static paymentError() {
    return new ApiError(
      404,
      "There was an error making the payment. Please try again later."
    );
  }
}

module.exports = ApiError;
