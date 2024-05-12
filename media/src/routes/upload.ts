import { Request, Response, Router } from "express";
import { upload } from "../middleware/multer";

const router = Router();

router.post("/api/media/upload", (req: Request, res: Response) => {
  upload(req, res, (error: any) => {
    if (error || !req.file) {
      return res
        .status(400)
        .send({ message: !req.file ? "No file uploaded" : error });
    }
    return res.send({ file: req.file });
  });
});

export { router as uploadSingleRouter };
