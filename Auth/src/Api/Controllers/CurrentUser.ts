import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return next();
    }

    const token = req.headers.authorization.split(" ")[1];

    const payload = verify(token, process.env.JWT_KEY!);

    if (!payload) return next();

    return res.json(payload);
  } catch (error) {
    throw error;
  }
};
