import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { BadRequestError } from "@madhead_og/common";
import User from "../../model/userModel";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }
    const user = User.build({ email, password });
    await user.save();

    const token = sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    return res.status(201).json({ token });
  } catch (error) {
    throw error;
  }
};
