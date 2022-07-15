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
    return new ApiError(400, "Delivery error.");
  }

  static notAvailable() {
    return new ApiError(404, `The requested item is currently not available.`);
  }

  static noOrder() {
    return new ApiError(404, `The requested order could not be found.`);
  }

  static cartError() {
    return new ApiError(404, "Cart has invalid product.");
  }
}

module.exports = ApiError;
