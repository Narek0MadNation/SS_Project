import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "@madhead_og/common";

export const currentUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.currentUser;

  if (!user) {
    throw new NotFoundError();
  }

  return res.send({ currentUser: user });
};
