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
		<main className="page">
			<div className="container">
				<div className="card form-card stack">
					<div className="stack">
						<h1>Log in</h1>
						<p className="muted">Welcome back. Continue your practice.</p>
					</div>

					<form onSubmit={onSubmit} className="stack">
						<label className="field">
							<span className="label">Email</span>
							<input
								className="input"
								type="email"
								autoComplete="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</label>

						<label className="field">
							<span className="label">Password</span>
							<input
								className="input"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</label>

						{error ? (
							<p className="notice notice--error">{error}</p>
						) : null}

						<button type="submit" disabled={loading} className="button">
							{loading ? "Logging in..." : "Log in"}
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}
