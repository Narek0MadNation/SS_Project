import { Request, Response } from "express";
import User from "../../Model/UserModel";
import validateSignUp from "../../Validate/ValidateSignUp";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const validatedFields = validateSignUp({ email, password });

    if (validatedFields.success) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
      }
      const user = await User.build({ email, password }).save();

      return res.status(201).json({ user });
    }

    return res.status(400).json({ message: validatedFields.message });
  } catch (error) {
    console.error(error);
  }
};
