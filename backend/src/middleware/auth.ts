import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.ts";

declare global {
	namespace Express {
		interface Request {
			userId?: string;
			email?: string;
		}
	}
}

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		res.status(401).json({ error: "Missing or invalid authorization header" });
		return;
	}

	const token = authHeader.slice(7);
	const payload = verifyAccessToken(token);

	if (!payload) {
		res.status(401).json({ error: "Invalid or expired token" });
		return;
	}

	req.userId = payload.userId;
	req.email = payload.email;
	next();
}

export function errorHandler(
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction,
): void {
	console.error("Error:", err);

	res.status(err.status || 500).json({
		error: err.message || "Internal server error",
	});
}
