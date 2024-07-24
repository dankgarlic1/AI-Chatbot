import { NextFunction, Request, Response } from "express";
import bcrypt, { compare } from "bcrypt";
import User from "../models/User";
import { createToken } from "../utils/token-manager";
import { COOKIE_NAME } from "../utils/constants";

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
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(401).json({ msg: "User already exists please Login" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    // create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(201)
      .json({ msg: "User Created!", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Failed to create User", cause: error });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ msg: "User is not registered please Sign Up" });
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ msg: "Incorrect Password" });
    }
    // create token and store cookie

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (e) {
    console.log(e);
    return res.status(200).json({ message: "ERROR", cause: e });
  }
};

export const verifyUser = async (
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
      .json({ message: "User verified", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Failed to Login User", cause: error });
  }
};
