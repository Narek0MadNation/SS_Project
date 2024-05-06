import mongoose from "mongoose";
import { app, logger } from "./app";
import { DatabaseConnectionError } from "@madhead_og/common";

const start = async () => {
  if (!process.env.MONGO_URI) throw new DatabaseConnectionError();

  if (!process.env.QA_PORT) throw new Error("QA_PORT must be defined");

  try {
    await mongoose.connect(process.env.MONGO_URI!);

    logger.info("QA DB: CONNECTED");
  } catch (error) {
    throw error;
  }

  app.listen(process.env.QA_PORT, () => {
    logger.info(`QA SERVICE: LIVE ON ${process.env.QA_PORT}`);
  });
};

start();
