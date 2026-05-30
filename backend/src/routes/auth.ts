import { Router } from "express";
import {
	register,
	login,
	refreshToken,
	me,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);

// Protected routes
router.get("/me", authMiddleware, me);

export default router;
