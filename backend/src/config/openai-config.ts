// import opneai from "openai";
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();
export const configureOpenAI = () => {
  //   const config = new opneai({
  //     apiKey: process.env.OPENAI_SECRET_KEY,
  //     organization: process.env.OPENAI_ORGANIZATION_KEY,
  //   });
  //   return config;
  return new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY,
    organization: process.env.OPENAI_ORGANIZATION_KEY,
  });
};
