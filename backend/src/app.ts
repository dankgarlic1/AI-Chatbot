import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import appRouter from "./routes";
import cookieParser from "cookie-parser";
import { COOKIE_NAME } from "./utils/constants";

dotenv.config();

const app = express();
//middlewares
app.use(express.json());
app.use(cookieParser(COOKIE_NAME));

//remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
