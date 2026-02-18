import { describe, it, expect } from 'vitest';

// Ensure Upstash env vars are not present for these tests so the in-memory fallback is used
const origUpstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const origUpstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
delete process.env.UPSTASH_REDIS_REST_URL;
delete process.env.UPSTASH_REDIS_REST_TOKEN;

describe('rateLimiter in-memory fallback', () => {
  it('respects the provided limit', async () => {
    const { isRateLimited } = await import('../lib/rateLimiter');
    const key = `test-ip-${Date.now()}`;
    // limit = 2 -> first two calls allowed, third blocked
    const first = await isRateLimited(key, 2);
    const second = await isRateLimited(key, 2);
    const third = await isRateLimited(key, 2);
    expect(first).toBe(false);
    expect(second).toBe(false);
    expect(third).toBe(true);
  });
});

// restore env
process.env.UPSTASH_REDIS_REST_URL = origUpstashUrl;
process.env.UPSTASH_REDIS_REST_TOKEN = origUpstashToken;
