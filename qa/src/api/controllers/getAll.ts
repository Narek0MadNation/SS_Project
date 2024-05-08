import { Request, Response } from "express";
import { Question } from "../../model/questionModel";
import { NotFoundError } from "@madhead_og/common";

export const getAll = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find();

    if (!questions) throw new NotFoundError();

    return res.send(questions);
  } catch (error) {
    console.error(error);
  }
};
