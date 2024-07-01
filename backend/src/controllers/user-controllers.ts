import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res
      .status(200)
      .json({ msg: "Users retrieved from Database Successfully", users });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ msg: "Users failed to retrieve from Database", cause: error });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res
      .status(200)
      .json({ msg: "User Created!", id: user._id.toString() });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Failed to create User", cause: error });
  }
};
