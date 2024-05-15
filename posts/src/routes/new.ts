import { currentUser, validateRequest } from "@madhead_og/common";
import { Request, Response, Router } from "express";
import { validateNewPost } from "../validate";
import { Post } from "../model/postModel";

const router = Router();

router.post(
  "/api/posts",
  currentUser,
  validateNewPost,
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body;

      const post = Post.build({
        title,
        content,
        userId: req.currentUser!.id,
      });
      await post.save();

      res.status(201).send(post);
    } catch (error) {
      throw error;
    }
  }
);

export { router as createPostRouter };
