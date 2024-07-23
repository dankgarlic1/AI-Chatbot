import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { configureOpenAI } from "../config/openai-config";
import { OpenAI } from "openai";
import {
  ChatCompletionMessage,
  ChatCompletionMessageParam,
  ChatCompletionUserMessageParam,
} from "openai/resources";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
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
  const userChat: ChatCompletionMessageParam[] = user.chats.map((chat: any) => {
    const role: "user" | "assistant" | "system" = chat.role as
      | "user"
      | "assistant"
      | "system";
    const content: string = chat.content;
    return { role, content };
  });
  userChat.push({ content: message, role: "user" });
  user.chats.push({ content: message, role: "user" }); //pushing it in user chats also
  //send all the chats with new one to openai api

  const config: OpenAI = configureOpenAI();
  const openai = new OpenAI(config);
  const chatResponse = await openai.chat.completions.create({
    model: "gpt-3.5.turbo",
    messages: userChat,
  });

  //get latest response
};
