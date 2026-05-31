"use client";

import Link from "next/link";
import React from "react";

import { useAuthStore } from "../../lib/authStore";

export function Nav() {
	const user = useAuthStore((s) => s.user);
	const signOut = useAuthStore((s) => s.signOut);

	return (
		<nav className="w-full border-b px-4 py-3 flex items-center justify-between">
			<div className="flex items-center gap-4">
				<Link href="/" className="font-semibold">
					Flashcard
				</Link>
				<Link href="/learn" className="text-sm">
					Learn
				</Link>
			</div>

			<div className="flex items-center gap-3">
				{user ? (
					<>
						<span className="text-sm text-gray-600">{user.email}</span>
						<button
							type="button"
							onClick={() => signOut()}
							className="text-sm underline"
						>
							Sign out
						</button>
					</>
				) : (
					<>
						<Link href="/auth/login" className="text-sm underline">
							Log in
						</Link>
						<Link href="/auth/signup" className="text-sm underline">
							Sign up
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}
