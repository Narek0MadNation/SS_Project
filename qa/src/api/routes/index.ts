import { Router } from "express";
import { getAll } from "../controllers/getAll";
import { getById } from "../controllers/getById";
import { create } from "../controllers/create";
import { update } from "../controllers/update";
import { currentUser, validateRequest } from "@madhead_og/common";
import { validateNewQuestion, validateUpdateQuestion } from "../../validate";

const router = Router();

router.get("/", getAll);

router.get("/:qaId", getById);

router.post("/", currentUser, validateNewQuestion, validateRequest, create);

router.put(
  "/:qaId",
  currentUser,
  validateUpdateQuestion,
  validateRequest,
  update
);

export { router };
