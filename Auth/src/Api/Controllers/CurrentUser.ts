import { Request, Response } from "express";

export const currentUser = async (req: Request, res: Response) => {
  res.json({ message: "Current User route" });
};
