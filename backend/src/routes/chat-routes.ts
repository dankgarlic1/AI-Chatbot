import { Router } from "express";
import { verifyToken } from "../utils/token-manager";
import { chatCompletionValidator, validate } from "../utils/validator";
import { generateChatCompletion } from "../controllers/chat-controllers";

//Protected API
const chatRoutes = Router();

chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

export default chatRoutes;
