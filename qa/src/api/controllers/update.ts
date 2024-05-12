import { Request, Response } from "express";
import { Question } from "../../model/questionModel";
import { NotFoundError } from "@madhead_og/common";

export const update = async (req: Request, res: Response) => {
  try {
    const { qaId } = req.params;
    const { title, content } = req.body;
    console.log("Updating question with ID:", qaId);

    const question = await Question.findById(qaId);

    console.log("UPDATE Question found:", question);
    if (!question) throw new NotFoundError();

    question.title = title;
    question.content = content;

    await question.save();

    res.send({ success: true, question });
  } catch (error) {
    console.error(error);
  }
};
