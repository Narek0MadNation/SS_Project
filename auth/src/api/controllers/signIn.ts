import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "@madhead_og/common";
import { Password } from "../../service/password";
import User from "../../model/userModel";

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await Password.compare(user.password, password))) {
      throw new BadRequestError("Invalid credentials");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    return res.json({ token });
  } catch (error) {
    throw error;
  }
};
