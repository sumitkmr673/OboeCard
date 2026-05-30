import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgressState {
	currentLevel: number;
	totalXP: number;
	currentJLPT: string;
	dailyStreak: number;
	cardsStudied: number;
	cardsMastered: number;
	loading: boolean;
}

const initialState: ProgressState = {
	currentLevel: 1,
	totalXP: 0,
	currentJLPT: "N5",
	dailyStreak: 0,
	cardsStudied: 0,
	cardsMastered: 0,
	loading: false,
};

export const progressSlice = createSlice({
	name: "progress",
	initialState,
	reducers: {
		setProgress: (state, action: PayloadAction<Partial<ProgressState>>) => {
			Object.assign(state, action.payload);
		},
		addXP: (state, action: PayloadAction<number>) => {
			state.totalXP += action.payload;
		},
		updateStreak: (state, action: PayloadAction<number>) => {
			state.dailyStreak = action.payload;
		},
		incrementCardsStudied: (state) => {
			state.cardsStudied += 1;
		},
		incrementCardsMastered: (state) => {
			state.cardsMastered += 1;
		},
	},
});

export const {
	setProgress,
	addXP,
	updateStreak,
	incrementCardsStudied,
	incrementCardsMastered,
} = progressSlice.actions;
export default progressSlice.reducer;
