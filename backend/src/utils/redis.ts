import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient> | null = null;

export async function getRedisClient() {
	if (!redisClient) {
		redisClient = createClient({
			url: process.env.REDIS_URL || "redis://localhost:6379",
		});

		redisClient.on("error", (err) => console.error("Redis Client Error", err));

		await redisClient.connect();
		console.log("Redis connected");
	}

	return redisClient;
}

export async function closeRedis() {
	if (redisClient) {
		await redisClient.quit();
		redisClient = null;
	}
}

/**
 * Get due cards for user SRS queue
 */
export async function getSRSQueue(userId: string): Promise<string[]> {
	const client = await getRedisClient();
	const key = `srs:${userId}:due`;
	const cardIds = await client.lRange(key, 0, -1);
	return cardIds;
}

/**
 * Add card to SRS queue
 */
export async function addToSRSQueue(
	userId: string,
	cardId: string,
): Promise<void> {
	const client = await getRedisClient();
	const key = `srs:${userId}:due`;
	await client.rPush(key, cardId);
}

/**
 * Remove card from SRS queue
 */
export async function removeFromSRSQueue(
	userId: string,
	cardId: string,
): Promise<void> {
	const client = await getRedisClient();
	const key = `srs:${userId}:due`;
	await client.lRem(key, 1, cardId);
}

/**
 * Cache user progress
 */
export async function cacheUserProgress(
	userId: string,
	data: any,
): Promise<void> {
	const client = await getRedisClient();
	const key = `user:${userId}:progress`;
	await client.setEx(key, 3600, JSON.stringify(data)); // 1 hour
}

/**
 * Get cached user progress
 */
export async function getCachedUserProgress(userId: string): Promise<any> {
	const client = await getRedisClient();
	const key = `user:${userId}:progress`;
	const data = await client.get(key);
	return data ? JSON.parse(data) : null;
}

/**
 * Invalidate cache
 */
export async function invalidateCache(pattern: string): Promise<void> {
	const client = await getRedisClient();
	const keys = await client.keys(pattern);
	if (keys.length > 0) {
		await client.del(keys);
	}
}
