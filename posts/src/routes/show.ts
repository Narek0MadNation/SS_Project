import { Request, Response, Router } from "express";
import { Post } from "../model/postModel";
import { NotFoundError } from "@madhead_og/common";

const router = Router();

router.get("/api/posts/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) throw new NotFoundError();

    return res.send(post);
  } catch (error) {
    throw error;
  }
});

export { router as showPostRouter };
