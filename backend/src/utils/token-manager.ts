import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const jwtSecret = process.env.JWT_SECRET!;
  const token = jwt.sign(payload, jwtSecret, { expiresIn });
  return token;
};
