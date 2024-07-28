import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants";

dotenv.config();

dotenv.config();
export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const jwtSecret = process.env.JWT_SECRET!;
  const token = jwt.sign(payload, jwtSecret, { expiresIn });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    console.log(token);

    return res.status(401).json({ message: "Token not Recieved" });
  }
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(
      token,
      process.env.JWT_SECRET!,
      (err: any, success: any) => {
        if (err) {
          reject(err);
          return res.status(401).json({ message: "Token Expired" });
        } else {
          console.log("Token Verification Successfull");
          resolve();
          res.locals.jwtData = success;
          return next();
        }
      }
    );
  });
};
