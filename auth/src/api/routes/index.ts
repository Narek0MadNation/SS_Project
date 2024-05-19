import { Router } from "express";
import { currentUser, validateRequest } from "@madhead_og/common";
import { currentUserController } from "../controllers/currentUser";
import { signUp } from "../controllers/signUp";
import { signIn } from "../controllers/signIn";
import { validateAuth } from "../../validate";
import { uploadFile } from "../controllers/upload";
import multer from "multer";

const [router, upload] = [
  Router(),
  multer({ storage: multer.memoryStorage() }),
];

router.get("/currentuser", currentUser, currentUserController);

router.post("/signup", validateAuth, validateRequest, signUp);

router.post("/signin", validateAuth, validateRequest, signIn);

router.post("/upload", currentUser, upload.single("image"), uploadFile);

export { router };
