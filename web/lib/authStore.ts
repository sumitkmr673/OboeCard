import { create } from "zustand";

export type User = {
	id: string;
	email: string;
	name?: string | null;
};

type PersistedAuth = {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
};

export type AuthState = PersistedAuth & {
	setAuth: (payload: {
		user: User;
		accessToken: string;
		refreshToken?: string | null;
	}) => void;
	signOut: () => void;
	hydrateFromStorage: () => void;
};

const STORAGE_KEY = "flashcard.auth";

function readStorage(): PersistedAuth | null {
	if (typeof window === "undefined") return null;
	const raw = window.localStorage.getItem(STORAGE_KEY);
	if (!raw) return null;

	try {
		const parsed = JSON.parse(raw) as Partial<PersistedAuth>;
		return {
			user: (parsed.user as User) ?? null,
			accessToken:
				typeof parsed.accessToken === "string" ? parsed.accessToken : null,
			refreshToken:
				typeof parsed.refreshToken === "string" ? parsed.refreshToken : null,
		};
	} catch {
		return null;
	}
}

function writeStorage(value: PersistedAuth) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

function clearStorage() {
	if (typeof window === "undefined") return;
	window.localStorage.removeItem(STORAGE_KEY);
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	accessToken: null,
	refreshToken: null,
	setAuth: ({ user, accessToken, refreshToken = null }) => {
		const next: PersistedAuth = { user, accessToken, refreshToken };
		set(next);
		writeStorage(next);
	},
	signOut: () => {
		set({ user: null, accessToken: null, refreshToken: null });
		clearStorage();
	},
	hydrateFromStorage: () => {
		const stored = readStorage();
		if (!stored) return;
		set(stored);
	},
}));
