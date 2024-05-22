import express from "express";
import * as UserController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UserController.getAuthenticatedUser);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

// router.get("/:noteId", UserController.getNote);

// router.patch("/:noteId", UserController.updateNote);

// router.delete("/:noteId", UserController.deleteNote);

export default router;
