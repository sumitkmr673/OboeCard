import type { NextPageContext } from "next";

type ErrorProps = {
	statusCode?: number;
};

export default function ErrorPage({ statusCode }: ErrorProps) {
	return (
		<main className="page">
			<div className="container stack">
				<h1>Something went wrong</h1>
				<p className="muted">
					{statusCode
						? `Error ${statusCode} occurred on the server.`
						: "An unexpected error occurred."}
				</p>
				<a href="/" className="button">
					Go home
				</a>
			</div>
		</main>
	);
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
	const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
	return { statusCode };
};
