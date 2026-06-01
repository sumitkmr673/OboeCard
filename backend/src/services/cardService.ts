import { prisma } from "../lib/prisma.ts";

export async function getCardsByLevel(level: number) {
	const cards = await prisma.card.findMany({
		where: { level },
		select: {
			id: true,
			character: true,
			romaji: true,
			reading: true,
			meaning: true,
			type: true,
			strokeOrder: true,
			audioUrl: true,
		},
	});

	return cards;
}

export async function getCardById(cardId: string) {
	const card = await prisma.card.findUnique({
		where: { id: cardId },
	});

	return card;
}

export async function getUserDueCards(userId: string, limit: number = 20) {
	const now = new Date();

	// Get cards due for review
	const cardProgress = await prisma.cardProgress.findMany({
		where: {
			userId,
			nextReviewDue: {
				lte: now,
			},
		},
		take: limit,
		include: {
			card: {
				select: {
					id: true,
					character: true,
					romaji: true,
					reading: true,
					meaning: true,
					type: true,
					strokeOrder: true,
					audioUrl: true,
				},
			},
		},
	});

	return cardProgress.map((cp) => ({
		progressId: cp.id,
		...cp.card,
		masteryLevel: cp.masteryLevel,
	}));
}

export async function getNewCardsForUser(
	userId: string,
	level: number,
	limit: number = 10,
) {
	// Get cards at level that user hasn't studied
	const cards = await prisma.card.findMany({
		where: {
			level,
			cardProgress: {
				none: {
					userId,
				},
			},
		},
		take: limit,
		select: {
			id: true,
			character: true,
			romaji: true,
			reading: true,
			meaning: true,
			type: true,
			strokeOrder: true,
			audioUrl: true,
		},
	});

	return cards;
}

export async function getUserLevelProgress(userId: string, level: number) {
	const totalCards = await prisma.card.count({
		where: { level },
	});

	const masteredCards = await prisma.cardProgress.count({
		where: {
			userId,
			status: "MASTERED",
			card: { level },
		},
	});

	const studiedCards = await prisma.cardProgress.count({
		where: {
			userId,
			card: { level },
		},
	});

	return {
		level,
		totalCards,
		studiedCards,
		masteredCards,
		progressPercent:
			studiedCards > 0 ? (masteredCards / studiedCards) * 100 : 0,
	};
}

/**
 * Aggregate stats for the user's study dashboard.
 * Returns total, learned, due-today and new card counts.
 */
export async function getUserCardStats(userId: string) {
	const now = new Date();

	const [total, learned, due, newCards] = await prisma.$transaction([
		// Total cards that have any progress record for this user
		prisma.cardProgress.count({ where: { userId } }),

		// Cards marked MASTERED
		prisma.cardProgress.count({ where: { userId, status: "MASTERED" } }),

		// Cards whose nextReviewDue is in the past (overdue)
		prisma.cardProgress.count({
			where: { userId, nextReviewDue: { lte: now } },
		}),

		// Cards in the DB the user has never touched
		prisma.card.count({
			where: {
				cardProgress: { none: { userId } },
			},
		}),
	]);

	return { total, learned, due, new: newCards };
}
