import { Request, Response } from "express";
import { z } from "zod";
import {
	recordCardReview,
	startStudySession,
	endStudySession,
} from "../services/progressService.ts";

const reviewSchema = z.object({
	cardId: z.string(),
	quality: z.number().min(0).max(5),
	responseTime: z.number().min(0),
});

export async function reviewCard(req: Request, res: Response): Promise<void> {
	try {
		const userId = (req as any).userId;
		const input = reviewSchema.parse(req.body);

		const result = await recordCardReview(userId, input);

		res.json({
			success: true,
			...result,
		});
	} catch (error: any) {
		if (error instanceof z.ZodError) {
			res.status(400).json({ error: error.errors[0].message });
		} else {
			res.status(500).json({ error: error.message });
		}
	}
}

export async function startSession(req: Request, res: Response): Promise<void> {
	try {
		const userId = (req as any).userId;
		const session = await startStudySession(userId);

		res.status(201).json(session);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}

export async function endSession(req: Request, res: Response): Promise<void> {
	try {
		const userId = (req as any).userId;
		const session = await endStudySession(userId);

		if (!session) {
			res.status(404).json({ error: "No active session found" });
			return;
		}

		res.json(session);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}
