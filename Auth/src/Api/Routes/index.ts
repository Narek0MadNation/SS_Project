import { Router } from "express";
import { currentUser } from "../Controllers/CurrentUser";
import { signIn } from "../Controllers/SignIn";
import { signUp } from "../Controllers/SignUp";
import { validateAuth } from "../../Validate";
import { validateRequest } from "../../Middleware/ValidateRequest";

const router = Router();

router.get("/currentuser", currentUser);

router.post("/signup", validateAuth, validateRequest, signUp);

router.post("/signin", validateAuth, validateRequest, signIn);

export { router };
