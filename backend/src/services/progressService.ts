import { prisma } from "../lib/prisma.ts";
import {
	calculateSRS,
	getNextReviewDate,
	calculateMastery,
} from "../utils/srs.ts";

export interface ReviewInput {
	cardId: string;
	quality: number; // 0-5, where 3+ is correct
	responseTime: number; // milliseconds
}

export async function recordCardReview(userId: string, review: ReviewInput) {
	// Get or create card progress
	let cardProgress = await prisma.cardProgress.findUnique({
		where: {
			userId_cardId: {
				userId,
				cardId: review.cardId,
			},
		},
	});

	if (!cardProgress) {
		// First time reviewing this card
		cardProgress = await prisma.cardProgress.create({
			data: {
				userId,
				cardId: review.cardId,
				status: "LEARNING",
				attempts: 0,
				correctCount: 0,
				wrongCount: 0,
			},
		});
	}

	// Calculate SRS metrics
	const srsMetrics = calculateSRS(review.quality, {
		interval: cardProgress.interval,
		easeFactor: cardProgress.easeFactor,
		repetitions: cardProgress.repetitions,
	});

	const nextReviewDate = getNextReviewDate(srsMetrics.interval);
	const isCorrect = review.quality >= 3;
	const newCorrectCount = isCorrect
		? cardProgress.correctCount + 1
		: cardProgress.correctCount;
	const newWrongCount = !isCorrect
		? cardProgress.wrongCount + 1
		: cardProgress.wrongCount;
	const newAttempts = cardProgress.attempts + 1;
	const newMastery = calculateMastery(newCorrectCount, newAttempts);

	// Determine status
	let newStatus: "LEARNING" | "REVIEW" | "MASTERED" = "LEARNING";
	if (newMastery >= 80) {
		newStatus = "REVIEW";
	}
	if (newMastery >= 90) {
		newStatus = "MASTERED";
	}

	// Update card progress
	const updated = await prisma.cardProgress.update({
		where: {
			userId_cardId: {
				userId,
				cardId: review.cardId,
			},
		},
		data: {
			interval: srsMetrics.interval,
			easeFactor: srsMetrics.easeFactor,
			repetitions: srsMetrics.repetitions,
			masteryLevel: newMastery,
			attempts: newAttempts,
			correctCount: newCorrectCount,
			wrongCount: newWrongCount,
			status: newStatus,
			lastReviewedAt: new Date(),
			nextReviewDue: nextReviewDate,
		},
	});

	// Record session detail
	const session = await prisma.studySession.findFirst({
		where: {
			userId,
			endedAt: null, // Current session
		},
	});

	if (session) {
		await prisma.sessionDetail.create({
			data: {
				sessionId: session.id,
				cardId: review.cardId,
				userAnswer: isCorrect ? "correct" : "incorrect",
				isCorrect,
				responseTime: review.responseTime,
			},
		});
	}

	// Award XP
	const xpReward = isCorrect ? 10 : 2;
	await prisma.user.update({
		where: { id: userId },
		data: {
			totalXP: {
				increment: xpReward,
			},
		},
	});

	return {
		updated,
		xpReward,
		nextReviewDate,
		masteryLevel: newMastery,
	};
}

export async function startStudySession(userId: string) {
	// End any existing open sessions
	await prisma.studySession.updateMany({
		where: {
			userId,
			endedAt: null,
		},
		data: {
			endedAt: new Date(),
		},
	});

	// Create new session
	const session = await prisma.studySession.create({
		data: {
			userId,
		},
	});

	return session;
}

export async function endStudySession(userId: string) {
	const session = await prisma.studySession.findFirst({
		where: {
			userId,
			endedAt: null,
		},
		include: {
			sessionDetails: true,
		},
	});

	if (!session) {
		return null;
	}

	const durationMinutes = Math.round(
		(new Date().getTime() - session.startedAt.getTime()) / 60000,
	);

	const accuracy =
		session.sessionDetails.length > 0
			? (session.sessionDetails.filter((d) => d.isCorrect).length /
					session.sessionDetails.length) *
				100
			: 0;

	const updated = await prisma.studySession.update({
		where: { id: session.id },
		data: {
			endedAt: new Date(),
			durationMinutes,
			cardsReviewed: session.sessionDetails.length,
			correctAnswers: session.sessionDetails.filter((d) => d.isCorrect).length,
			accuracy,
		},
	});

	// Update user stats — upsert guards against missing UserStats row
	await prisma.userStats.upsert({
		where: { userId },
		update: {
			cardsStudied: { increment: session.sessionDetails.length },
			correctAnswers: { increment: session.sessionDetails.filter((d) => d.isCorrect).length },
			totalAnswers: { increment: session.sessionDetails.length },
			totalStudyMinutes: { increment: durationMinutes },
		},
		create: {
			userId,
			cardsStudied: session.sessionDetails.length,
			correctAnswers: session.sessionDetails.filter((d) => d.isCorrect).length,
			totalAnswers: session.sessionDetails.length,
			totalStudyMinutes: durationMinutes,
		},
	});

	return updated;
}
