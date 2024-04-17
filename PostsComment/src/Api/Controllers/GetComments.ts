import { Request, Response } from "express";

export const getComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    return res.status(200).json({ comments: [] });
  } catch (error) {
    console.error(error);
  }
};
