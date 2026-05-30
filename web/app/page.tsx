"use client";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">Flashcard Platform</h1>
				<p className="text-xl text-gray-600 mb-8">
					Master Japanese: Hiragana, Katakana, Kanji & More
				</p>

				<div className="space-y-4">
					<a
						href="/learn"
						className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
					>
						Start Learning
					</a>
					<a
						href="/auth/signup"
						className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition ml-4"
					>
						Sign Up
					</a>
				</div>

				<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
					<div className="p-4 border rounded-lg">
						<h3 className="font-bold mb-2">📚 Hiragana & Katakana</h3>
						<p className="text-sm text-gray-600">
							Master Japanese scripts with adaptive learning
						</p>
					</div>
					<div className="p-4 border rounded-lg">
						<h3 className="font-bold mb-2">🎌 Kanji & Vocabulary</h3>
						<p className="text-sm text-gray-600">
							Learn 2500+ characters with JLPT levels
						</p>
					</div>
					<div className="p-4 border rounded-lg">
						<h3 className="font-bold mb-2">🎯 Spaced Repetition</h3>
						<p className="text-sm text-gray-600">
							Optimal review intervals for retention
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
