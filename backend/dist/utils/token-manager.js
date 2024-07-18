"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const jwtSecret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn });
    return token;
};
exports.createToken = createToken;
