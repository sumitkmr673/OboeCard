import { Router } from "express";
import {
	reviewCard,
	startSession,
	endSession,
} from "../controllers/progressController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// All protected routes
router.use(authMiddleware);

router.post("/review", reviewCard);
router.post("/session/start", startSession);
router.post("/session/end", endSession);

export default router;
