import type { Metadata } from "next";
import React from "react";

import "./globals.css";
import { Providers } from "./providers";
import { Nav } from "./_components/Nav";

export const metadata: Metadata = {
	title: "Flashcard Platform - Learn Japanese",
	description:
		"Master Hiragana, Katakana, Kanji, and Japanese vocabulary with adaptive spaced repetition.",
	keywords: "flashcard, japanese, learning, kanji, hiragana, katakana, JLPT",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="app">
				<Providers>
					<Nav />
					{children}
				</Providers>
			</body>
		</html>
	);
}
