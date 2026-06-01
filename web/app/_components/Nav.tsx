"use client";

import Link from "next/link";
import React from "react";

import { useAuthStore } from "../../lib/authStore";

export function Nav() {
	const user = useAuthStore((s) => s.user);
	const signOut = useAuthStore((s) => s.signOut);

	return (
		<nav className="nav">
			<div className="container nav__inner">
				<div className="nav__links">
					<Link href="/" className="nav__brand">
						Flashcard
					</Link>
					<Link href="/learn" className="nav__link">
						Learn
					</Link>
				</div>

				{user ? (
					<div className="nav__links">
						<span className="muted">{user.email}</span>
						<button
							type="button"
							onClick={() => signOut()}
							className="button button--ghost"
						>
							Sign out
						</button>
					</div>
				) : (
					<div className="nav__links">
						<Link href="/auth/login" className="nav__link">
							Log in
						</Link>
						<Link href="/auth/signup" className="button button--soft">
							Sign up
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
}
