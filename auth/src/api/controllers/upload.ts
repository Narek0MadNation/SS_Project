import { Request, Response } from "express";
import { bucket } from "../../service/firebase";
import sharp from "sharp";

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  const file = req.file;

  const processImage = await sharp(file.buffer)
    .resize({
      width: 992,
      height: 500,
      fit: sharp.fit.cover,
      position: sharp.strategy.entropy,
    })
    .toFormat("webp")
    .toBuffer();

  const blob = bucket.file(file.originalname);

  const blobStream = blob.createWriteStream({
    metadata: { contentType: file.mimetype },
  });

  blobStream.on("error", (error) => {
    res.status(500).send({ error: error.message });
  });

  blobStream.on("finish", async () => {
    await blob.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    res.status(200).send({ url: publicUrl });
  });

  blobStream.end(processImage);
};
