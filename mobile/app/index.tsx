import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Flashcard Platform</Text>
				<Text style={styles.subtitle}>Master Japanese Learning</Text>
			</View>

			<View style={styles.grid}>
				<TouchableOpacity
					style={styles.card}
					onPress={() => router.push("/learn")}
				>
					<Text style={styles.cardTitle}>📚 Learn</Text>
					<Text style={styles.cardDesc}>Start your study session</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.card}>
					<Text style={styles.cardTitle}>📊 Progress</Text>
					<Text style={styles.cardDesc}>View your stats</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.card}>
					<Text style={styles.cardTitle}>🎯 Goals</Text>
					<Text style={styles.cardDesc}>Set learning targets</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.card}>
					<Text style={styles.cardTitle}>⚙️ Settings</Text>
					<Text style={styles.cardDesc}>Configure preferences</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
		paddingTop: 20,
	},
	header: {
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: "#007AFF",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#fff",
	},
	subtitle: {
		fontSize: 16,
		color: "#e8e8e8",
		marginTop: 4,
	},
	grid: {
		padding: 16,
		gap: 12,
	},
	card: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 8,
		marginBottom: 8,
		borderLeftWidth: 4,
		borderLeftColor: "#007AFF",
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 4,
	},
	cardDesc: {
		fontSize: 14,
		color: "#666",
	},
});
