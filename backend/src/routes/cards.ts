import { Router } from "express";
import {
	getCards,
	getCard,
	getDueCards,
	getNewCards,
	getLevelProgress,
} from "../controllers/cardController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// Public routes
router.get("/", getCards);
router.get("/:id", getCard);

// Protected routes
router.get("/due/cards", authMiddleware, getDueCards);
router.get("/new/cards", authMiddleware, getNewCards);
router.get("/progress/:level", authMiddleware, getLevelProgress);

export default router;
