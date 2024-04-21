import { Router } from "express";
import { currentUser, validateRequest } from "@madhead_og/common";
import { currentUserController } from "../Controllers/CurrentUser";
import { signIn } from "../Controllers/SignIn";
import { signUp } from "../Controllers/SignUp";
import { validateAuth } from "../../Validate";

const router = Router();

router.get("/currentuser", currentUser, currentUserController);

router.post("/signup", validateAuth, validateRequest, signUp);

router.post("/signin", validateAuth, validateRequest, signIn);

export { router };
