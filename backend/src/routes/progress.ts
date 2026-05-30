import { Router } from "express";
import {
	reviewCard,
	startSession,
	endSession,
} from "../controllers/progressController.ts";
import { authMiddleware } from "../middleware/auth.ts";

const router = Router();

// All protected routes
router.use(authMiddleware);

router.post("/review", reviewCard);
router.post("/session/start", startSession);
router.post("/session/end", endSession);

export default router;
