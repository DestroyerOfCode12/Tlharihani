/**
 * Best-effort, in-memory rate limiting keyed by IP. Netlify Functions run in
 * ephemeral, per-instance containers, so this resets on cold start and isn't
 * shared across concurrent instances — it slows down a single abusive client
 * hitting a warm function, not a distributed attack. For stronger guarantees,
 * back this with a durable store (Netlify Blobs, Upstash Redis, etc).
 */

interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5

export function isRateLimited(ip: string, endpoint: string): boolean {
  const key = `${endpoint}:${ip}`
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  bucket.count += 1
  return bucket.count > MAX_REQUESTS
}

export function getClientIp(headers: Record<string, string | undefined>): string {
  return (
    headers['x-nf-client-connection-ip'] ||
    headers['client-ip'] ||
    headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    'unknown'
  )
}
