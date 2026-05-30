import { Stack } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export default function RootLayout() {
	return (
		<Provider store={store}>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: "#007AFF",
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			>
				<Stack.Screen
					name="index"
					options={{
						title: "Flashcard",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="learn/index"
					options={{
						title: "Learn",
					}}
				/>
			</Stack>
		</Provider>
	);
}
