import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { rateLimiter } from "./rate-limiter"

const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
const SESSION_SECRET = process.env.NEXT_PUBLIC_SESSION_SECRET // Used to sign session tokens

// Generate a secure session token using Web Crypto API (Edge Runtime compatible)
async function generateSessionToken(): Promise<string> {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

// Hash a string using Web Crypto API (Edge Runtime compatible)
async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

// Sign a token with the session secret
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function signToken(token: string): Promise<string> {
  // In a production app, you would use a proper HMAC here
  // For now, we'll concatenate the token with a hash of token+secret
  const signature = await hashString(token + SESSION_SECRET)
  return `${token}.${signature}`
}

// Get client IP address from request
function getClientIp(request: NextRequest): string {
  // Try to get IP from Vercel-specific headers
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim()
  }

  // Fallback to other headers or default
  const realIp = request.headers.get("x-real-ip")
  if (realIp) {
    return realIp
  }

  // Last resort - this won't be accurate behind proxies
  return "127.0.0.1"
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get client IP address
    const clientIp = getClientIp(request)

    // Check if the IP is rate limited
    const rateLimitCheck = rateLimiter.isRateLimited(clientIp)
    if (rateLimitCheck.isLimited) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many login attempts. Please try again in ${rateLimitCheck.remainingSeconds} seconds.`,
        },
        { status: 429 },
      )
    }

    // Record this attempt
    rateLimiter.recordAttempt(clientIp)

    const { username, password } = (await request.json()) as { username: string; password: string }

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    // Reset rate limit after successful login
    rateLimiter.resetLimit(clientIp)

    // Generate a session token
    const sessionToken = await generateSessionToken()

    // In a real application, you would store this token in a database
    // along with the user ID and expiration time

    // Set a secure HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set({
      name: "swastify_admin_session",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ success: false, message: "Authentication failed" }, { status: 500 })
  }
}

export async function DELETE(): Promise<NextResponse> {
  // Clear the session cookie
  const cookieStore = await cookies()
  cookieStore.delete("swastify_admin_session")
  return NextResponse.json({ success: true })
}

