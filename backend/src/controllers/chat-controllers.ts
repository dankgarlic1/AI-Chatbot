import { Request, Response, NextFunction } from "express";
import User from "../models/User";

import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import dotenv from "dotenv";
import { Config } from "../config/openai-config";
import { error, log } from "console";
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
      model: "gpt-3.5.turbo",
      messages: userChat,
    });
    const latestResponse: any = chatResponse.choices[0].message.content;

    user.chats.push(latestResponse);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Something went wrong" });
  }
};
