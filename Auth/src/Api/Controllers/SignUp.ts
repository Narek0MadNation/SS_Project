import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import User from "../../Model/UserModel";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    const user = User.build({ email, password });
    await user.save();

    const token = sign(
      {
        id: user._id,
        email: user.email,
      },
      "txavari_bard_key"
    );

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
  }
};
