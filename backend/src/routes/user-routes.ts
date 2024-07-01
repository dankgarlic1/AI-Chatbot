import { Router } from "express";
import { getAllUsers, userSignup } from "../controllers/user-controllers";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signUp", userSignup);

export default userRoutes;
