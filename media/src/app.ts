import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import {
  Logger,
  ConsoleTransport,
  createLoggerMiddleware,
} from "@voskan/context-aware-logger";
import { NotFoundError, errorHandler } from "@madhead_og/common";
import { uploadSingleRouter } from "./routes/upload";

const app = express();

const logger = new Logger();
logger.addTransport(new ConsoleTransport());

app.use(json());
app.use(express.static("uploads"));
app.use(createLoggerMiddleware(logger));

app.use(uploadSingleRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app, logger };
