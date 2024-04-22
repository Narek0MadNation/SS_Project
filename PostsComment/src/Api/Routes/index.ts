import { Router } from "express";
import { getComments } from "../controllers/getComments";

const router = Router();

router.get("/:postId", getComments);

export { router };
