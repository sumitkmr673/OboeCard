"use client";

import React from "react";
import { useAuthStore, type AuthState } from "../lib/authStore";

export function Providers({ children }: { children: React.ReactNode }) {
	const hydrateFromStorage = useAuthStore(
		(s: AuthState) => s.hydrateFromStorage,
	);

	React.useEffect(() => {
		hydrateFromStorage();
	}, [hydrateFromStorage]);

	return <>{children}</>;
}
