class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg) {
    return new ApiError(400, "Bad request.");
  }

  static internal(msg) {
    return new ApiError(500, "Something wen't wrong.");
  }

  static invalidId() {
    return new ApiError(400, "Invalid ID.");
  }

  static invalidCity(city) {
    return new ApiError(400, `${city} unavailable for delivery.`);
  }

  static invalidArea(area) {
    return new ApiError(400, `${area} unavailable for delivery.`);
  }

  static notAvailable() {
    return new ApiError(404, `The requested item is currently not available.`);
  }

  static noOrder() {
    return new ApiError(404, `The requested order could not be found.`);
  }
}

module.exports = ApiError;
