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
exports.deleteChats = exports.sendChatsToUser = exports.generateChatCompletion = void 0;
const User_1 = __importDefault(require("../models/User"));
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const generateChatCompletion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    try {
        const user = yield User_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not registered or Token malfunctionded" });
        }
        // Convert the user's chats to the correct format
        const userChat = user.chats.map((chat) => {
            const role = chat.role;
            const content = chat.content;
            return { role, content };
        });
        userChat.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" }); //pushing it in user chats also
        //send all the chats with new one to openai api
        const openai = new openai_1.OpenAI({
            apiKey: process.env.OPENAI_SECRET_KEY,
            organization: process.env.OPENAI_ORGANIZATION_KEY,
        });
        //get latest response
        const chatResponse = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: userChat,
        });
        const latestResponseContent = chatResponse.choices[0].message.content;
        // Ensure correct structure before pushing to chats array
        const latestResponse = {
            _id: new mongoose_1.default.Types.ObjectId(),
            content: latestResponseContent,
            role: "assistant",
        };
        user.chats.push(latestResponse);
        yield user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.generateChatCompletion = generateChatCompletion;
const sendChatsToUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(res.locals.jwtData.id); //check token-manager.ts verifyToken to remember
        console.log(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ msg: "User is not registered or Token malfunctioned" });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).json({ msg: "Permissions didn't match" });
        }
        return res
            .status(200)
            .json({ message: "Chats sent successfully", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Failed to Login User", cause: error });
    }
});
exports.sendChatsToUser = sendChatsToUser;
const deleteChats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(res.locals.jwtData.id); //check token-manager.ts verifyToken to remember
        console.log(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ msg: "User is not registered or Token malfunctioned" });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).json({ msg: "Permissions didn't match" });
        }
        //@ts-ignore
        user.chats = [];
        yield user.save();
        return res.status(200).json({ message: "Chats deleted successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Failed to Login User", cause: error });
    }
});
exports.deleteChats = deleteChats;
