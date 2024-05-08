import { body } from "express-validator";

export const validateNewQuestion = [
  body("title")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters"),
  body("content")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Content must be between 5 long"),
];

export const validateUpdateQuestion = [
  body("title")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters"),
  body("content")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Content must be between 5 long"),
];
