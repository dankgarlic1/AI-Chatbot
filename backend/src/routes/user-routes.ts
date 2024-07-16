import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userSignup,
} from "../controllers/user-controllers";
import { validate, signupValidator } from "../utils/validator";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signUp", validate(signupValidator), userSignup);
userRoutes.post("/login", userLogin);

export default userRoutes;
