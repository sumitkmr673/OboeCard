import Link from "next/link";

export default function Home() {
	return (
		<main className="page">
			<section className="container hero">
				<div className="stack">
					<p className="muted">Quiet focus. Steady progress.</p>
					<h1 className="hero__title">Calm Japanese practice, built to last.</h1>
					<p className="muted">
						A gentle learning space for Hiragana, Katakana, Kanji, and
						vocabulary with thoughtful spacing.
					</p>
					<div className="button-row">
						<Link href="/learn" className="button">
							Start learning
						</Link>
						<Link href="/auth/signup" className="button button--ghost">
							Create account
						</Link>
					</div>
				</div>

				<div className="card hero__card">
					<div className="hero__label">Today</div>
					<div className="hero__character">あ</div>
					<div className="hero__answer">a</div>
					<div className="muted">Short sessions, clear progress.</div>
				</div>
			</section>

			<section className="container feature-grid">
				<div className="card feature-card">
					<h3>Balanced pacing</h3>
					<p className="muted">
						Review cards at the right time with a calm rhythm.
					</p>
				</div>
				<div className="card feature-card">
					<h3>Simple focus</h3>
					<p className="muted">
						No clutter, just the next card and a clear path forward.
					</p>
				</div>
				<div className="card feature-card">
					<h3>Gentle progress</h3>
					<p className="muted">
						See your momentum build without pressure or noise.
					</p>
				</div>
			</section>
		</main>
	);
}
