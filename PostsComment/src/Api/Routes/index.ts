import { Router } from "express";
import { getComments } from "../Controllers/GetComments";

const router = Router();

router.get("/:postId", getComments);

export { router };
