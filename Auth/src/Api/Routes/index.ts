import { Router } from "express";
import { currentUser, validateRequest } from "@madhead_og/common";
import { currentUserController } from "../controllers/currentUser";
import { signUp } from "../controllers/signUp";
import { signIn } from "../controllers/signIn";
import { validateAuth } from "../../validate";

const router = Router();

router.get("/currentuser", currentUser, currentUserController);

router.post("/signup", validateAuth, validateRequest, signUp);

router.post("/signin", validateAuth, validateRequest, signIn);

export { router };
