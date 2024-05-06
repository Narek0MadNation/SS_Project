import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response) => {
  try {
    res.send([]);
  } catch (error) {
    console.error(error);
  }
};
