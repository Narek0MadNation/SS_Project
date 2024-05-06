import { Router } from "express";
import { getAll } from "../controllers/getAll";
import { getById } from "../controllers/getById";

const router = Router();

router.get("/", getAll);
router.get("/:qaId", getById);

export { router };
