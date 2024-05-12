import { currentUser, validateRequest } from "@madhead_og/common";
import { Request, Response, Router } from "express";
import { checkFileType, validateNewPost } from "../validate";
import { Post } from "../model/postModel";
import multer from "multer";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: "../uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => checkFileType(file, cb),
}).single("image");

router.post("/api/posts/upload", (req: Request, res: Response) => {
  upload(req, res, (error: any) => {
    if (error) {
      return res.status(400).send({ message: error });
    }
    return res.send({ file: req.file });
  });
});

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
