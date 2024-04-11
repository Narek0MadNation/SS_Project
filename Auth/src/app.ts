import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import { router } from "./Api/Routes";
import { errorHandler } from "./Middleware/ErrorHandler";

import {
  Logger,
  ConsoleTransport,
  createLoggerMiddleware,
} from "@voskan/context-aware-logger";
import { NotFoundError } from "./Error/NotFoundError";

const app = express();

const logger = new Logger();
logger.addTransport(new ConsoleTransport());

app.use(json());

app.use(createLoggerMiddleware(logger));

app.use("/api/users", router);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app, logger };
