import { Request, Response } from "express";
import { Question } from "../../model/questionModel";

export const create = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    const newQuestion = Question.build({
      userId: req.currentUser!.id,
      title,
      content,
    });
    await newQuestion.save();
    res.status(201).send(newQuestion);
  } catch (error) {
    console.error(error);
  }
};
