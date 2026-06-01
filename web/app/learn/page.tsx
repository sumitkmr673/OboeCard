"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "../../lib/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

type Card = {
	id: string;
	character?: string | null;
	reading?: string | null;
	romaji?: string | null;
	meaning?: string | null;
	level: number;
};

type DueCardsResponse = {
	cards: Card[];
};

type StatsResponse = {
	total: number;
	learned: number;
	due: number;
	new: number;
};

export default function LearnPage() {
	const router = useRouter();
	const accessToken = useAuthStore((s) => s.accessToken);

	const [cards, setCards] = React.useState<Card[]>([]);
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [flipped, setFlipped] = React.useState(false);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);
	const [stats, setStats] = React.useState<StatsResponse | null>(null);
	const [submitting, setSubmitting] = React.useState(false);

	const currentCard = cards[currentIndex] ?? null;
	const frontText =
		currentCard?.character ||
		currentCard?.reading ||
		currentCard?.romaji ||
		"";
	const backText = currentCard
		? [currentCard.reading, currentCard.romaji, currentCard.meaning]
				.filter(Boolean)
				.join(" · ") || "—"
		: "";

	React.useEffect(() => {
		if (!accessToken) {
			router.push("/auth/login");
			return;
		}

		(async () => {
			setLoading(true);
			setError(null);

			try {
				const [cardsRes, statsRes] = await Promise.all([
					fetch(`${API_URL}/api/cards/due/cards`, {
						headers: { Authorization: `Bearer ${accessToken}` },
					}),
					fetch(`${API_URL}/api/cards/stats`, {
						headers: { Authorization: `Bearer ${accessToken}` },
					}),
				]);

				if (!cardsRes.ok) {
					throw new Error(`Failed to fetch cards (${cardsRes.status})`);
				}

				const cardsData = (await cardsRes.json()) as DueCardsResponse;
				setCards(cardsData.cards ?? []);

				if (statsRes.ok) {
					const statsData = (await statsRes.json()) as StatsResponse;
					setStats(statsData);
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load cards");
			} finally {
				setLoading(false);
			}
		})();
	}, [accessToken, router]);

	async function submitReview(quality: number) {
		if (!currentCard) return;

		setSubmitting(true);
		try {
			const res = await fetch(`${API_URL}/api/progress/review`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({
					cardId: currentCard.id,
					quality,
					responseTime: 5000,
				}),
			});

			if (!res.ok) {
				throw new Error(`Review failed (${res.status})`);
			}

			if (currentIndex < cards.length - 1) {
				setCurrentIndex(currentIndex + 1);
				setFlipped(false);
			} else {
				setError("All cards reviewed! Great job! 🎉");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to submit review");
		} finally {
			setSubmitting(false);
		}
	}

	if (!accessToken) {
		return (
			<main className="page">
				<div className="container">
					<p className="notice notice--error">Please log in to continue.</p>
				</div>
			</main>
		);
	}

	if (loading) {
		return (
			<main className="page">
				<div className="container">
					<div className="card form-card">
						<p className="muted">Loading cards...</p>
					</div>
				</div>
			</main>
		);
	}

	if (cards.length === 0) {
		return (
			<main className="page">
				<div className="container stack">
					<div className="stack">
						<h1>Learn</h1>
						<p className="muted">No cards due for review right now.</p>
					</div>
					{stats ? (
						<div className="feature-grid">
							<div className="card feature-card">
								<div className="muted">Total cards</div>
								<div>{stats.total}</div>
							</div>
							<div className="card feature-card">
								<div className="muted">Learned</div>
								<div>{stats.learned}</div>
							</div>
							<div className="card feature-card">
								<div className="muted">Due today</div>
								<div>{stats.due}</div>
							</div>
							<div className="card feature-card">
								<div className="muted">New</div>
								<div>{stats.new}</div>
							</div>
						</div>
					) : null}
				</div>
			</main>
		);
	}

	return (
		<main className="page">
			<div className="container stack">
				<div className="learn-header">
					<div className="stack">
						<h1>Learn</h1>
						<p className="muted">Take a breath, then review the next card.</p>
					</div>
					<div className="pill-group">
						<span className="pill">
							Card {currentIndex + 1} of {cards.length}
						</span>
						{stats ? <span className="pill">Due today: {stats.due}</span> : null}
						{stats ? (
							<span className="pill">Learned: {stats.learned}</span>
						) : null}
					</div>
				</div>

				{error ? <div className="notice">{error}</div> : null}

				<div
					className="card learn-card"
					onClick={() => setFlipped(!flipped)}
				>
					<div>
						<div className="learn-card__label">
							{flipped ? "Back" : "Front"} · Click to flip
						</div>
						<div className="learn-card__text">
							{flipped ? backText : frontText}
						</div>
					</div>
				</div>

				<div className="rating-grid">
					<button
						type="button"
						onClick={() => void submitReview(1)}
						disabled={submitting}
						className="rating-button"
					>
						Forgot (1)
					</button>
					<button
						type="button"
						onClick={() => void submitReview(2)}
						disabled={submitting}
						className="rating-button"
					>
						Hard (2)
					</button>
					<button
						type="button"
						onClick={() => void submitReview(3)}
						disabled={submitting}
						className="rating-button"
					>
						Medium (3)
					</button>
					<button
						type="button"
						onClick={() => void submitReview(4)}
						disabled={submitting}
						className="rating-button"
					>
						Good (4)
					</button>
					<button
						type="button"
						onClick={() => void submitReview(5)}
						disabled={submitting}
						className="rating-button"
					>
						Perfect (5)
					</button>
				</div>

				<p className="muted">
					Level {currentCard.level} · Card ID {currentCard.id}
				</p>
			</div>
		</main>
	);
}
