import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userLogout,
  userSignup,
  verifyUser,
} from "../controllers/user-controllers";
import { validate, signupValidator, loginValidator } from "../utils/validator";
import { verifyToken } from "../utils/token-manager";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signUp", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);
export default userRoutes;
