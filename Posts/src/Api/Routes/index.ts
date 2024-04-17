import { Router } from "express";
import { getAll } from "../Controllers/GetAll";

const router = Router();

router.get("/", getAll);

export { router };
