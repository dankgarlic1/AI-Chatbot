import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import appRouter from "./routes";
import cookieParser from "cookie-parser";

import cors from "cors";

dotenv.config();

const app = express();
//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
