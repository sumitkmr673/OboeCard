import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cardReducer from "./slices/cardSlice";
import progressReducer from "./slices/progressSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		cards: cardReducer,
		progress: progressReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
