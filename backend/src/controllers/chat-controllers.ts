import { Request, Response, NextFunction } from "express";
import User from "../models/User";

import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import dotenv from "dotenv";
import { Config } from "../config/openai-config";
import { error, log } from "console";
import mongoose from "mongoose";
dotenv.config();

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or Token malfunctionded" });
    }
    //grab the chats of user
    type UserChat = {
      role: "user" | "assistant" | "system";
      content: string;
    };

    // Convert the user's chats to the correct format
    const userChat: ChatCompletionMessageParam[] = user.chats.map(
      (chat: any) => {
        const role: "user" | "assistant" | "system" = chat.role as
          | "user"
          | "assistant"
          | "system";
        const content: string = chat.content;
        return { role, content };
      }
    );
    userChat.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" }); //pushing it in user chats also
    //send all the chats with new one to openai api

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_SECRET_KEY,
      organization: process.env.OPENAI_ORGANIZATION_KEY,
    });
    //get latest response

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: userChat,
    });
    const latestResponseContent = chatResponse.choices[0].message.content;

    // Ensure correct structure before pushing to chats array
    const latestResponse = {
      _id: new mongoose.Types.ObjectId(),
      content: latestResponseContent,
      role: "assistant",
    };

    user.chats.push(latestResponse);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id); //check token-manager.ts verifyToken to remember
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
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Failed to Login User", cause: error });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id); //check token-manager.ts verifyToken to remember
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
    await user.save();
    return res.status(200).json({ message: "Chats deleted successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Failed to Login User", cause: error });
  }
};
