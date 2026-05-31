"use client";

import Link from "next/link";
import React from "react";

import { useAuthStore } from "../../lib/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

type HealthResponse = {
	status: string;
};

export default function LearnPage() {
	const accessToken = useAuthStore((s) => s.accessToken);

	const [health, setHealth] = React.useState<string | null>(null);
	const [error, setError] = React.useState<string | null>(null);

	async function checkBackend() {
		setError(null);
		setHealth(null);

		try {
			const res = await fetch(`${API_URL}/health`);
			if (!res.ok) throw new Error(`Backend not healthy (${res.status})`);
			const data = (await res.json()) as HealthResponse;
			setHealth(data.status ?? "ok");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to reach backend");
		}
	}

	return (
		<main className="max-w-2xl mx-auto p-6">
			<h1 className="text-2xl font-semibold mb-2">Learn</h1>

			{accessToken ? (
				<p className="text-sm text-gray-600 mb-4">You are logged in.</p>
			) : (
				<p className="text-sm text-gray-600 mb-4">
					You are not logged in. <Link href="/auth/login">Log in</Link>
				</p>
			)}

			<div className="flex items-center gap-3 mb-4">
				<button
					type="button"
					onClick={() => void checkBackend()}
					className="border rounded px-3 py-2"
				>
					Check backend health
				</button>
				{health ? <span className="text-sm">Health: {health}</span> : null}
			</div>

			{error ? (
				<p className="text-sm text-red-600 whitespace-pre-wrap">{error}</p>
			) : null}
		</main>
	);
}
