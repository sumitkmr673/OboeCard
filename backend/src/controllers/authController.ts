import { Request, Response } from "express";
import {
	registerSchema,
	loginSchema,
	refreshTokenSchema,
} from "../schemas/auth.ts";
import {
	registerUser,
	loginUser,
	getUserById,
} from "../services/authService.ts";
import { generateTokens, verifyRefreshToken } from "../utils/jwt.ts";
import { ZodError } from "zod";

export async function register(req: Request, res: Response): Promise<void> {
	try {
		const input = registerSchema.parse(req.body);
		const user = await registerUser(input);

		const tokens = generateTokens({
			userId: user.id,
			email: user.email,
		});

		res.status(201).json({
			user,
			...tokens,
		});
	} catch (error: any) {
		if (error instanceof ZodError) {
			res.status(400).json({ error: error.errors[0].message });
		} else {
			res.status(400).json({ error: error.message });
		}
	}
}

export async function login(req: Request, res: Response): Promise<void> {
	try {
		const input = loginSchema.parse(req.body);
		const user = await loginUser(input);

		const tokens = generateTokens({
			userId: user.id,
			email: user.email,
		});

		res.json({
			user,
			...tokens,
		});
	} catch (error: any) {
		if (error instanceof ZodError) {
			res.status(400).json({ error: error.errors[0].message });
		} else {
			res.status(401).json({ error: error.message });
		}
	}
}

export async function refreshToken(req: Request, res: Response): Promise<void> {
	try {
		const input = refreshTokenSchema.parse(req.body);
		const payload = verifyRefreshToken(input.refreshToken);

		if (!payload) {
			res.status(401).json({ error: "Invalid refresh token" });
			return;
		}

		const user = await getUserById(payload.userId);

		if (!user) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		const tokens = generateTokens({
			userId: user.id,
			email: user.email,
		});

		res.json(tokens);
	} catch (error: any) {
		if (error instanceof ZodError) {
			res.status(400).json({ error: error.errors[0].message });
		} else {
			res.status(401).json({ error: "Invalid refresh token" });
		}
	}
}

export async function me(req: Request, res: Response): Promise<void> {
	try {
		const userId = (req as any).userId;

		if (!userId) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		const user = await getUserById(userId);

		if (!user) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		res.json(user);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}
