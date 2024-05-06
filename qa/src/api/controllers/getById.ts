import { Request, Response } from "express";

export const getById = async (req: Request, res: Response) => {
  try {
    const { qaId } = req.params;
    return res.status(200).json({ qa: {} });
  } catch (error) {
    console.error(error);
  }
};
