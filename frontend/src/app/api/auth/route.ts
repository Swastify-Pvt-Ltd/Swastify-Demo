import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { rateLimiter } from "./rate-limiter"
import { signToken } from "@/lib/auth-utils"

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

// Generate a secure session token using Web Crypto API (Edge Runtime compatible)
async function generateSessionToken(): Promise<string> {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
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

    // Debug log to check credentials
    console.log(`Login attempt - Username: ${username}, Expected: ${ADMIN_USERNAME}`)

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      console.log("Invalid credentials")
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    console.log("Credentials validated successfully")

    // Reset rate limit after successful login
    rateLimiter.resetLimit(clientIp)

    // Generate a session token
    const rawToken = await generateSessionToken()

    // Sign the token
    const signedToken = await signToken(rawToken)

    console.log("Generated token:", signedToken)

    // Set a secure HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set({
      name: "swastify_admin_session",
      value: signedToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    console.log("Cookie set successfully")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ success: false, message: "Authentication failed" }, { status: 500 })
  }
}

export async function DELETE(): Promise<NextResponse> {
  // Clear the session cookie
  const cookieStore = await cookies()
  cookieStore.set("swastify_admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Expire immediately
  })
  return NextResponse.json({ success: true })
}

