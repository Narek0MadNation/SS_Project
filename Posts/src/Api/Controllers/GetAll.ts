import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ posts: [] });
  } catch (error) {
    console.error(error);
  }
};
