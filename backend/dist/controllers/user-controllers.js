"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userSignup = exports.getAllUsers = void 0;
const bcrypt_1 = __importStar(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const token_manager_1 = require("../utils/token-manager");
const constants_1 = require("../utils/constants");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        return res
            .status(200)
            .json({ msg: "Users retrieved from Database Successfully", users });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ msg: "Users failed to retrieve from Database", cause: error });
    }
});
exports.getAllUsers = getAllUsers;
const userSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser)
            return res.status(401).json({ msg: "User already exists please Login" });
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new User_1.default({ name, email, password: hashedPassword });
        yield user.save();
        return res
            .status(201)
            .json({ msg: "User Created!", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Failed to create User", cause: error });
    }
});
exports.userSignup = userSignup;
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ msg: "User not registered please Sign Up" });
        }
        const isPasswordCorrect = yield (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ msg: "Incorrect Password" });
        }
        else {
            res.clearCookie(constants_1.COOKIE_NAME, {
                httpOnly: true,
                signed: true,
                domain: "localhost",
                path: "/ ",
            });
            const token = (0, token_manager_1.createToken)(user._id.toString(), user.email, "7d");
            const expires = new Date();
            expires.setDate(expires.getDate() + 7);
            res.cookie(constants_1.COOKIE_NAME, token, {
                path: "/",
                domain: "localhost",
                expires,
                httpOnly: true,
                signed: true,
            });
            return res
                .status(200)
                .json({ msg: "User Logged In!", name: user.name, email: user.email });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Failed to Login User", cause: error });
    }
});
exports.userLogin = userLogin;
