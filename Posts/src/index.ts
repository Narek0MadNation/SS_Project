import mongoose from "mongoose";
import { app, logger } from "./app";
import { DatabaseConnectionError } from "@madhead_og/common";

const start = async () => {
  if (!process.env.MONGO_URI) throw new DatabaseConnectionError();

  if (!process.env.POSTS_PORT) throw new Error("POSTS_PORT must be defined");

  try {
    await mongoose.connect(process.env.MONGO_URI!);

    logger.info("POSTS DB: CONNECTED");
  } catch (error) {
    throw error;
  }

  app.listen(process.env.POSTS_PORT, () => {
    logger.info(`POSTS SERVICE: LIVE ON ${process.env.POSTS_PORT}`);
  });
};

start();
