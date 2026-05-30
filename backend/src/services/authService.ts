import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { RegisterInput, LoginInput } from "../schemas/auth.js";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export async function registerUser(input: RegisterInput) {
	// Check if user exists
	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [{ email: input.email }, { username: input.username }],
		},
	});

	if (existingUser) {
		throw new Error("Email or username already exists");
	}

	// Hash password
	const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

	// Create user
	const user = await prisma.user.create({
		data: {
			email: input.email,
			username: input.username,
			passwordHash,
			userStats: {
				create: {}, // Initialize stats
			},
		},
		select: {
			id: true,
			email: true,
			username: true,
			createdAt: true,
		},
	});

	return user;
}

export async function loginUser(input: LoginInput) {
	const user = await prisma.user.findUnique({
		where: { email: input.email },
	});

	if (!user) {
		throw new Error("Invalid email or password");
	}

	// Verify password
	const isPasswordValid = await bcrypt.compare(
		input.password,
		user.passwordHash,
	);

	if (!isPasswordValid) {
		throw new Error("Invalid email or password");
	}

	return {
		id: user.id,
		email: user.email,
		username: user.username,
	};
}

export async function getUserById(userId: string) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			email: true,
			username: true,
			currentLevel: true,
			totalXP: true,
			currentJLPT: true,
			dailyStreak: true,
			createdAt: true,
		},
	});

	return user;
}

export async function updateUserLastStudied(userId: string) {
	await prisma.user.update({
		where: { id: userId },
		data: { lastStudiedAt: new Date() },
	});
}
