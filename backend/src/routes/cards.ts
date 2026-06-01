import { Router } from "express";
import {
	getCards,
	getCard,
	getDueCards,
	getNewCards,
	getLevelProgress,
	getStats,
} from "../controllers/cardController.ts";
import { authMiddleware } from "../middleware/auth.ts";

const router = Router();

// Public routes
router.get("/", getCards);

// Protected routes — must come BEFORE /:id or Express will swallow them
router.get("/stats", authMiddleware, getStats);
router.get("/due/cards", authMiddleware, getDueCards);
router.get("/new/cards", authMiddleware, getNewCards);
router.get("/progress/:level", authMiddleware, getLevelProgress);

// Dynamic route — always last
router.get("/:id", getCard);

export default router;
