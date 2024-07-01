"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user-controllers");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/", user_controllers_1.getAllUsers);
userRoutes.post("/signUp", user_controllers_1.userSignup);
exports.default = userRoutes;
