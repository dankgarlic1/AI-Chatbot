"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
// import opneai from "openai";
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.Config = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY,
    organization: process.env.OPENAI_ORGANIZATION_KEY,
});
