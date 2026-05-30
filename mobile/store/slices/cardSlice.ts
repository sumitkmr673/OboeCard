import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Card {
	id: string;
	character: string;
	romaji: string;
	reading: string;
	meaning?: string;
	level: number;
	type: string;
}

interface CardState {
	cards: Card[];
	currentCard: Card | null;
	loading: boolean;
	error: string | null;
}

const initialState: CardState = {
	cards: [],
	currentCard: null,
	loading: false,
	error: null,
};

export const cardSlice = createSlice({
	name: "cards",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setCards: (state, action: PayloadAction<Card[]>) => {
			state.cards = action.payload;
			state.loading = false;
		},
		setCurrentCard: (state, action: PayloadAction<Card | null>) => {
			state.currentCard = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

export const { setLoading, setCards, setCurrentCard, setError } =
	cardSlice.actions;
export default cardSlice.reducer;
