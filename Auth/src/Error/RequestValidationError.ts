import CustomError from "./CustomError";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid Request Parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      if ("path" in error) {
        return { message: error.msg, field: error.path as string };
      }

      return { message: error.msg };
    });
  }
}
