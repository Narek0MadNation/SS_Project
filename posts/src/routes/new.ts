import { currentUser } from "@madhead_og/common";
import { Router } from "express";

const router = Router();

router.post("/api/posts", currentUser, (req, res) => {
  res.send("Posts");
});

export { router as createPostRouter };
