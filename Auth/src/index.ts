import mongoose from "mongoose";
import { app, logger } from "./app";
import { DatabaseConnectionError } from "@madhead_og/common";

const start = async () => {
  if (!process.env.MONGO_URI) throw new DatabaseConnectionError();

  if (!process.env.AUTH_PORT) throw new Error("AUTH_PORT must be defined");

  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined");

  try {
    await mongoose.connect(process.env.MONGO_URI!);

    logger.info("AUTH DB: CONNECTED");
  } catch (error) {
    throw error;
  }

  app.listen(process.env.AUTH_PORT, () => {
    logger.info(`AUTH SERVICE: LIVE ON ${process.env.AUTH_PORT}`);
  });
};

start();
