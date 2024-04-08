import express from "express";
import { json } from "body-parser";
import { router } from "./Api/Routes";
import { errorHandler } from "./Middleware/ErrorHandler";

import {
  Logger,
  ConsoleTransport,
  createLoggerMiddleware,
} from "@voskan/context-aware-logger";

const app = express();

const logger = new Logger();
logger.addTransport(new ConsoleTransport());

app.use(json());

app.use(createLoggerMiddleware(logger));

app.use(router);

app.use(errorHandler);

export { app, logger };
