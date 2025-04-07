// Edge-compatible rate limiter for login attempts

interface RateLimitRecord {
  attempts: number
  firstAttempt: number
  lastAttempt: number
  blocked: boolean
  blockedUntil?: number
}

class RateLimiter {
  private records: Map<string, RateLimitRecord> = new Map()
  private readonly MAX_ATTEMPTS = 5 // Maximum login attempts
  private readonly WINDOW_MS = 15 * 60 * 1000 // 15 minutes window
  private readonly BLOCK_DURATION_MS = 30 * 60 * 1000 // 30 minutes block
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor() {
    // Only set up the interval in environments that support it (not during static generation)
    if (typeof window === "undefined" && typeof setInterval === "function") {
      // Clean up old records every 10 minutes
      this.cleanupInterval = setInterval(() => this.cleanup(), 10 * 60 * 1000)
    }
  }

  /**
   * Check if an IP is rate limited
   * @param ip The IP address to check
   * @returns Object containing isLimited status and remaining time if limited
   */
  isRateLimited(ip: string): { isLimited: boolean; remainingSeconds?: number } {
    const now = Date.now()
    const record = this.records.get(ip)

    // If no record exists, the IP is not rate limited
    if (!record) {
      return { isLimited: false }
    }

    // If the IP is blocked, check if the block duration has expired
    if (record.blocked && record.blockedUntil) {
      if (now < record.blockedUntil) {
        const remainingSeconds = Math.ceil((record.blockedUntil - now) / 1000)
        return { isLimited: true, remainingSeconds }
      } else {
        // Block duration expired, reset the record
        this.records.delete(ip)
        return { isLimited: false }
      }
    }

    // Check if the window has expired
    if (now - record.firstAttempt > this.WINDOW_MS) {
      // Window expired, reset the record
      this.records.delete(ip)
      return { isLimited: false }
    }

    // Check if max attempts reached within the window
    if (record.attempts >= this.MAX_ATTEMPTS) {
      // Block the IP
      record.blocked = true
      record.blockedUntil = now + this.BLOCK_DURATION_MS
      this.records.set(ip, record)

      const remainingSeconds = Math.ceil(this.BLOCK_DURATION_MS / 1000)
      return { isLimited: true, remainingSeconds }
    }

    return { isLimited: false }
  }

  // Add logging for rate limited IPs
  recordAttempt(ip: string): void {
    const now = Date.now()
    const record = this.records.get(ip)

    if (!record) {
      // First attempt for this IP
      this.records.set(ip, {
        attempts: 1,
        firstAttempt: now,
        lastAttempt: now,
        blocked: false,
      })
      console.log(`[Auth] First login attempt from IP: ${ip}`)
    } else if (!record.blocked) {
      // Increment attempts for existing record
      record.attempts += 1
      record.lastAttempt = now

      console.log(`[Auth] Login attempt ${record.attempts} from IP: ${ip}`)

      // If max attempts reached, block the IP
      if (record.attempts >= this.MAX_ATTEMPTS) {
        record.blocked = true
        record.blockedUntil = now + this.BLOCK_DURATION_MS
        console.warn(
          `[Auth] IP blocked due to too many attempts: ${ip}, blocked until: ${new Date(record.blockedUntil).toISOString()}`,
        )
      }

      this.records.set(ip, record)
    }
  }

  /**
   * Reset rate limit for an IP (used after successful login)
   * @param ip The IP address to reset
   */
  resetLimit(ip: string): void {
    this.records.delete(ip)
  }

  /**
   * Clean up old records to prevent memory leaks
   */
  private cleanup(): void {
    const now = Date.now()

    for (const [ip, record] of this.records.entries()) {
      // Remove records that are no longer blocked and outside the window
      if (!record.blocked && now - record.lastAttempt > this.WINDOW_MS) {
        this.records.delete(ip)
      }
      // Remove blocked records where the block has expired
      else if (record.blocked && record.blockedUntil && now > record.blockedUntil) {
        this.records.delete(ip)
      }
    }
  }

  // Add a method to get all blocked IPs (for debugging)
  getBlockedIPs(): { ip: string; blockedUntil: Date }[] {
    const now = Date.now()
    const blockedIPs: { ip: string; blockedUntil: Date }[] = []

    for (const [ip, record] of this.records.entries()) {
      if (record.blocked && record.blockedUntil && record.blockedUntil > now) {
        blockedIPs.push({
          ip,
          blockedUntil: new Date(record.blockedUntil),
        })
      }
    }

    return blockedIPs
  }
}

// Create a singleton instance
export const rateLimiter = new RateLimiter()

