import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

type InMemRecord = { count: number; resetAt: number };

const WINDOW_MS = 60_000;
const DEFAULT_LIMIT = 6;

const inMem = new Map<string, InMemRecord>();

let cachedRedis: Redis | null = null;

function getRedisClient() {
  if (cachedRedis) return cachedRedis;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  try {
    cachedRedis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! });
    return cachedRedis;
  } catch (err) {
    console.warn("Failed to create Upstash Redis client", err);
    return null;
  }
}

export async function isRateLimited(key: string, limit = DEFAULT_LIMIT) {
  // Prefer Upstash if configured
  const redis = getRedisClient();
  if (redis) {
    try {
      const rl = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(limit, "1 m") });
      const res = await rl.limit(key);
      return !res.success;
    } catch (err) {
      // If Upstash is unavailable, fall through to in-memory
      console.warn("Upstash rate limiter failed, falling back to in-memory", err);
    }
  }

  // In-memory fallback (single-instance only)
  const now = Date.now();
  const rec = inMem.get(key);
  if (!rec || now > rec.resetAt) {
    inMem.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (rec.count >= limit) return true;
  rec.count++;
  return false;
}
