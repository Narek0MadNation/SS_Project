import { body } from "express-validator";

export const validateAuth = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),

  body("password")
    .trim()
    .isLength({ min: 7, max: 20 })
    .withMessage("Password must be between 7 and 20 characters"),
];
