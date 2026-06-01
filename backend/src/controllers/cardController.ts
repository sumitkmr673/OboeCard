import { Request, Response } from "express";
import {
	getCardsByLevel,
	getCardById,
	getUserDueCards,
	getNewCardsForUser,
	getUserLevelProgress,
	getUserCardStats,
} from "../services/cardService.ts";

export async function getCards(req: Request, res: Response): Promise<void> {
	try {
		const { level } = req.query;

		if (!level) {
			res.status(400).json({ error: "Level parameter required" });
			return;
		}

		const cards = await getCardsByLevel(parseInt(level as string));

		res.json({
			level: parseInt(level as string),
			count: cards.length,
			cards,
		});
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}

export async function getCard(req: Request, res: Response): Promise<void> {
	try {
		const { id } = req.params;
		const card = await getCardById(id);

		if (!card) {
			res.status(404).json({ error: "Card not found" });
			return;
		}

		res.json(card);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}

export async function getDueCards(req: Request, res: Response): Promise<void> {
	try {
		const userId = (req as any).userId;
		const { limit } = req.query;

		const cards = await getUserDueCards(
			userId,
			parseInt(limit as string) || 20,
		);

		res.json({
			count: cards.length,
			cards,
		});
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}

export async function getNewCards(req: Request, res: Response): Promise<void> {
	try {
		const userId = (req as any).userId;
		const { level, limit } = req.query;

		if (!level) {
			res.status(400).json({ error: "Level parameter required" });
			return;
		}

		const cards = await getNewCardsForUser(
			userId,
			parseInt(level as string),
			parseInt(limit as string) || 10,
		);

		res.json({
			level: parseInt(level as string),
			count: cards.length,
			cards,
		});
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}

export async function getLevelProgress(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const userId = (req as any).userId;
		const { level } = req.params;

		const progress = await getUserLevelProgress(userId, parseInt(level));

		res.json(progress);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}

export async function getStats(req: Request, res: Response): Promise<void> {
	try {
		const userId = (req as any).userId;
		const stats = await getUserCardStats(userId);
		res.json(stats);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}
