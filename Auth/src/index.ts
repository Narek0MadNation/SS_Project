import express from "express";
import { json } from "body-parser";
import { router } from "./Api/Routes";
import mongoose from "mongoose";

const app = express();
app.use(json());

app.use(router);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("AUTH DB: CONNECTED");
  } catch (error) {
    console.error(error);
  }

  app.listen(process.env.AUTH_PORT, () =>
    console.log(`AUTH SERVICE: LIVE ON ${process.env.AUTH_PORT}`)
  );
};

start();
