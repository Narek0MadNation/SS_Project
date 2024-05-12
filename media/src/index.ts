import mongoose from "mongoose";
import { app, logger } from "./app";
import { DatabaseConnectionError } from "@madhead_og/common";

const start = async () => {
  if (!process.env.MONGO_URI) throw new DatabaseConnectionError();

  if (!process.env.MEDIA_PORT) throw new Error("MEDIA_PORT must be defined");

  try {
    await mongoose.connect(process.env.MONGO_URI!);

    logger.info("MEDIA DB: CONNECTED");
  } catch (error) {
    throw error;
  }

  app.listen(process.env.MEDIA_PORT, () => {
    logger.info(`MEDIA SERVICE: LIVE ON ${process.env.MEDIA_PORT}`);
  });
};

start();
