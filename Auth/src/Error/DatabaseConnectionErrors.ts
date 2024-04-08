import CustomError from "./CustomError";

class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to database";

  constructor() {
    super("Error connecting to database");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default DatabaseConnectionError;
