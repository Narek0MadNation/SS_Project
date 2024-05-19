import mongoose from "mongoose";
import { app, logger } from "./app";
import { DatabaseConnectionError } from "@madhead_og/common";

const start = async () => {
  if (!process.env.MONGO_URI) throw new DatabaseConnectionError();

  if (!process.env.FILE_PORT) throw new Error("FILE_PORT must be defined");

  try {
    await mongoose.connect(process.env.MONGO_URI!);

    logger.info("FILE DB: CONNECTED");
  } catch (error) {
    throw error;
  }

  app.listen(process.env.FILE_PORT, () => {
    logger.info(`FILE SERVICE: LIVE ON ${process.env.FILE_PORT}`);
  });
};

start();
