import mongoose from "mongoose";
import { app, logger } from "./app";
import { DatabaseConnectionError } from "@madhead_og/common";

const start = async () => {
  if (!process.env.MONGO_URI) throw new DatabaseConnectionError();

  if (!process.env.POSTS_COMMENT_PORT)
    throw new Error("POSTS_COMMENT_PORT must be defined");

  try {
    await mongoose.connect(process.env.MONGO_URI!);

    logger.info("POST_COMMENT DB: CONNECTED");
  } catch (error) {
    throw error;
  }

  app.listen(process.env.POSTS_COMMENT_PORT, () => {
    logger.info(
      `POST_COMMENT SERVICE: LIVE ON ${process.env.POSTS_COMMENT_PORT}`
    );
  });
};

start();
