type InMemRecord = { count: number; resetAt: number };

const WINDOW_MS = 60_000;
const DEFAULT_LIMIT = 6;

const inMem = new Map<string, InMemRecord>();

export async function isRateLimited(key: string, limit = DEFAULT_LIMIT) {
  // Prefer Upstash if configured
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const redisPkg = "@" + "upstash/redis";
      const ratelimitPkg = "@" + "upstash/ratelimit";
      const { Redis } = await import(redisPkg as any);
      const { Ratelimit, slidingWindow } = await import(ratelimitPkg as any);
      const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! });
      const rl = new Ratelimit({ redis, limiter: slidingWindow(limit, "1 m") });
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
