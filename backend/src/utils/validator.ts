import { body } from "express-validator";

const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().trim().isEmail().withMessage("Email is required"),
  body("password")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should contain atleast 6 characters"),
];
