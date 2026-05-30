import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";
const JWT_REFRESH_SECRET =
	process.env.JWT_REFRESH_SECRET || "refresh-secret-key";

export interface JWTPayload {
	userId: string;
	email: string;
}

/**
 * Generate access token (short-lived, 15 minutes)
 */
export function generateAccessToken(payload: JWTPayload): string {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
}

/**
 * Generate refresh token (long-lived, 7 days)
 */
export function generateRefreshToken(payload: JWTPayload): string {
	return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

/**
 * Verify access token
 */
export function verifyAccessToken(token: string): JWTPayload | null {
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
		return decoded;
	} catch (error) {
		return null;
	}
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): JWTPayload | null {
	try {
		const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
		return decoded;
	} catch (error) {
		return null;
	}
}

/**
 * Generate both tokens
 */
export function generateTokens(payload: JWTPayload) {
	return {
		accessToken: generateAccessToken(payload),
		refreshToken: generateRefreshToken(payload),
	};
}
