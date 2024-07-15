import { NextFunction, Request, Response } from "express";
import { body, ValidationChain } from "express-validator";

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
    }
  };
};
const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().trim().isEmail().withMessage("Email is required"),
  body("password")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should contain atleast 6 characters"),
];
