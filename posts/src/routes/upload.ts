import { Request, Response, Router } from "express";
import multer from "multer";
import { bucket } from "../services/firebase";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/api/posts/upload",
  upload.single("image"),
  (req: Request, res: Response) => {
    if (!req.file) return res.status(400).send("No file uploaded");

    const file = req.file;
    const blob = bucket.file(file.originalname);

    const blobStream = blob.createWriteStream({
      metadata: { contentType: file.mimetype },
    });

    blobStream.on("error", (error) => {
      res.status(500).send({ error: error.message });
    });

    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res.status(200).send({ url: publicUrl });
    });

    blobStream.end(file.buffer);
  }
);

export { router as uploadImageRouter };
