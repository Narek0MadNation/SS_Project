import { Router } from "express";
import { currentUser } from "../Controllers/CurrentUser";
import { signIn } from "../Controllers/SignIn";
import { signUp } from "../Controllers/SignUp";

const router = Router();

router.get("/api/users/currentuser", currentUser);

router.post("/api/users/signup", signUp);

router.post("/api/users/signin", signIn);

export { router };
