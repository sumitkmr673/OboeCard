import { Router } from "express";
import {
	getCards,
	getCard,
	getDueCards,
	getNewCards,
	getLevelProgress,
} from "../controllers/cardController.ts";
import { authMiddleware } from "../middleware/auth.ts";

const router = Router();

// Public routes
router.get("/", getCards);
router.get("/:id", getCard);

// Protected routes
router.get("/due/cards", authMiddleware, getDueCards);
router.get("/new/cards", authMiddleware, getNewCards);
router.get("/progress/:level", authMiddleware, getLevelProgress);

export default router;
