import express from "express";
import { json } from "body-parser";
import { router } from "./Api/Routes";

const app = express();
app.use(json());

app.use(router);

app.listen(process.env.AUTH_PORT, () =>
  console.log(`AUTH SERVICE: LIVE ON ${process.env.AUTH_PORT}`)
);
