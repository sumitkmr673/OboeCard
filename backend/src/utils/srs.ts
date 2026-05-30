/**
 * SRS (Spaced Repetition System) Algorithm - SM2 Implementation
 * Based on: https://super-memory.com/english/ol/sm2.htm
 */

export interface SRSMetrics {
	interval: number; // Days until next review
	easeFactor: number; // Difficulty multiplier (default 2.5)
	repetitions: number; // How many times in a row answered correctly
}

/**
 * Calculate next review interval and metrics based on user response
 * @param quality - Quality of response (0-5)
 *   0-2: incorrect/hard (too easy)
 *   3: ok/good
 *   4: good
 *   5: perfect
 * @param metrics - Current SRS metrics
 * @returns Updated metrics
 */
export function calculateSRS(quality: number, metrics: SRSMetrics): SRSMetrics {
	if (quality < 3) {
		// Wrong answer - reset
		return {
			interval: 1,
			easeFactor: Math.max(1.3, metrics.easeFactor - 0.2),
			repetitions: 0,
		};
	}

	// Correct answer
	let newInterval = metrics.interval;

	if (metrics.repetitions === 0) {
		newInterval = 1;
	} else if (metrics.repetitions === 1) {
		newInterval = 3;
	} else {
		newInterval = Math.round(metrics.interval * metrics.easeFactor);
	}

	const newEaseFactor = Math.max(
		1.3,
		metrics.easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02),
	);

	return {
		interval: newInterval,
		easeFactor: newEaseFactor,
		repetitions: metrics.repetitions + 1,
	};
}

/**
 * Get next review date
 */
export function getNextReviewDate(intervalDays: number): Date {
	const date = new Date();
	date.setDate(date.getDate() + intervalDays);
	return date;
}

/**
 * Calculate mastery percentage
 */
export function calculateMastery(
	correctCount: number,
	totalAttempts: number,
): number {
	if (totalAttempts === 0) return 0;
	return (correctCount / totalAttempts) * 100;
}
