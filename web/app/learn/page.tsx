"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "../../lib/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

type Card = {
	id: string;
	front: string;
	back: string;
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
			<main className="max-w-2xl mx-auto p-6">
				<p className="text-red-600">Please log in to continue.</p>
			</main>
		);
	}

	if (loading) {
		return (
			<main className="max-w-2xl mx-auto p-6">
				<p className="text-gray-600">Loading cards...</p>
			</main>
		);
	}

	if (cards.length === 0) {
		return (
			<main className="max-w-2xl mx-auto p-6">
				<h1 className="text-2xl font-semibold mb-4">Learn</h1>
				<p className="text-gray-600 mb-4">No cards due for review right now!</p>
				{stats ? (
					<div className="grid grid-cols-2 gap-4 max-w-sm">
						<div className="p-4 border rounded">
							<div className="text-sm text-gray-600">Total Cards</div>
							<div className="text-2xl font-bold">{stats.total}</div>
						</div>
						<div className="p-4 border rounded">
							<div className="text-sm text-gray-600">Learned</div>
							<div className="text-2xl font-bold">{stats.learned}</div>
						</div>
						<div className="p-4 border rounded">
							<div className="text-sm text-gray-600">Due Today</div>
							<div className="text-2xl font-bold">{stats.due}</div>
						</div>
						<div className="p-4 border rounded">
							<div className="text-sm text-gray-600">New</div>
							<div className="text-2xl font-bold">{stats.new}</div>
						</div>
					</div>
				) : null}
			</main>
		);
	}

	return (
		<main className="max-w-2xl mx-auto p-6">
			<h1 className="text-2xl font-semibold mb-4">Learn</h1>

			{stats ? (
				<div className="mb-6 p-4 bg-gray-50 rounded flex justify-between text-sm">
					<div>
						<span className="text-gray-600">Progress:</span>{" "}
						<span className="font-semibold">
							{currentIndex + 1} / {cards.length}
						</span>
					</div>
					<div>
						<span className="text-gray-600">Due Today:</span>{" "}
						<span className="font-semibold">{stats.due}</span>
					</div>
					<div>
						<span className="text-gray-600">Learned:</span>{" "}
						<span className="font-semibold">{stats.learned}</span>
					</div>
				</div>
			) : null}

			{error ? (
				<div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
					{error}
				</div>
			) : null}

			<div
				className="mb-6 p-8 min-h-64 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-indigo-200 rounded-lg flex items-center justify-center cursor-pointer transition-transform hover:shadow-lg"
				onClick={() => setFlipped(!flipped)}
			>
				<div className="text-center">
					<div className="text-sm text-gray-500 mb-2">
						{flipped ? "Back" : "Front"} • Click to flip
					</div>
					<div className="text-3xl font-bold text-gray-800 break-words">
						{flipped ? currentCard.back : currentCard.front}
					</div>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-2 mb-6">
				<button
					type="button"
					onClick={() => void submitReview(1)}
					disabled={submitting}
					className="py-3 bg-red-100 text-red-700 font-semibold rounded hover:bg-red-200 disabled:opacity-50"
				>
					Forgot (1)
				</button>
				<button
					type="button"
					onClick={() => void submitReview(2)}
					disabled={submitting}
					className="py-3 bg-orange-100 text-orange-700 font-semibold rounded hover:bg-orange-200 disabled:opacity-50"
				>
					Hard (2)
				</button>
				<button
					type="button"
					onClick={() => void submitReview(3)}
					disabled={submitting}
					className="py-3 bg-yellow-100 text-yellow-700 font-semibold rounded hover:bg-yellow-200 disabled:opacity-50"
				>
					Medium (3)
				</button>
			</div>

			<div className="grid grid-cols-2 gap-2">
				<button
					type="button"
					onClick={() => void submitReview(4)}
					disabled={submitting}
					className="py-3 bg-green-100 text-green-700 font-semibold rounded hover:bg-green-200 disabled:opacity-50"
				>
					Good (4)
				</button>
				<button
					type="button"
					onClick={() => void submitReview(5)}
					disabled={submitting}
					className="py-3 bg-emerald-100 text-emerald-700 font-semibold rounded hover:bg-emerald-200 disabled:opacity-50"
				>
					Perfect (5)
				</button>
			</div>

			<div className="mt-6 text-xs text-gray-500">
				Level: {currentCard.level} • Card ID: {currentCard.id}
			</div>
		</main>
	);
}

