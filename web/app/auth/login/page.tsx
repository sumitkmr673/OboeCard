"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useAuthStore, type User } from "../../../lib/authStore";

type LoginResponse = {
	user: User;
	accessToken: string;
	refreshToken?: string | null;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export default function LoginPage() {
	const router = useRouter();
	const setAuth = useAuthStore((s) => s.setAuth);

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			const res = await fetch(`${API_URL}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (!res.ok) {
				const msg = await res.text();
				throw new Error(msg || `Login failed (${res.status})`);
			}

			const data = (await res.json()) as LoginResponse;
			setAuth({
				user: data.user,
				accessToken: data.accessToken,
				refreshToken: data.refreshToken ?? null,
			});
			router.push("/learn");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Login failed");
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="max-w-md mx-auto p-6">
			<h1 className="text-2xl font-semibold mb-4">Log in</h1>

			<form onSubmit={onSubmit} className="space-y-3">
				<label className="block">
					<span className="text-sm">Email</span>
					<input
						className="mt-1 w-full border rounded px-3 py-2"
						type="email"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>

				<label className="block">
					<span className="text-sm">Password</span>
					<input
						className="mt-1 w-full border rounded px-3 py-2"
						type="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>

				{error ? (
					<p className="text-sm text-red-600 whitespace-pre-wrap">{error}</p>
				) : null}

				<button
					type="submit"
					disabled={loading}
					className="w-full bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
				>
					{loading ? "Logging in..." : "Log in"}
				</button>
			</form>
		</main>
	);
}
