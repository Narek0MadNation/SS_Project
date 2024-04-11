import { Request, Response } from "express";
import User from "../../Model/UserModel";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    const user = await User.build({ email, password }).save();

    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
  }
};
