import { Request, Response } from "express";

export const signIn = async (req: Request, res: Response) => {
  res.json({ message: "Sign In route" });
};
