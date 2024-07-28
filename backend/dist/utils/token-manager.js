"use strict";
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
exports.verifyToken = exports.createToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("./constants");
dotenv_1.default.config();
dotenv_1.default.config();
const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const jwtSecret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn });
    console.log(`Token created ${token}`);
    return token;
};
exports.createToken = createToken;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.signedCookies[`${constants_1.COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        console.log(`Startng verifying the token ${token}`);
        return res.status(401).json({ message: "Token not Recieved" });
    }
    return new Promise((resolve, reject) => {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err);
                return res.status(401).json({ message: "Token Expired" });
            }
            else {
                console.log("Token Verification Successfull");
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
});
exports.verifyToken = verifyToken;
