import { Request, Response } from "express";
import { Question } from "../../model/questionModel";
import { NotFoundError } from "@madhead_og/common";

export const getById = async (req: Request, res: Response) => {
  try {
    const { qaId } = req.params;
    console.log("Fetching question with ID:", qaId);
    const question = await Question.findById(qaId);
    console.log("Question found:", question);
    if (!question) throw new NotFoundError();

    return res.status(200).json(question);
  } catch (error) {
    console.error(error);
  }
};
