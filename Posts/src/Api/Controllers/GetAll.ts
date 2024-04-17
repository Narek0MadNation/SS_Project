import { Request, Response } from "express";
import Post from "../../Model/PostModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const dummyData = {
      userId: "6620007a5cec8869d87f4389",
      title: "Test Title",
      context: "Test Context",
      image: "test/img/path",
    };

    const newPost = Post.build(dummyData);
    await newPost.save();

    const posts = await Post.find();
    return res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
  }
};
