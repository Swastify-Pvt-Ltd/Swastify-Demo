import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { validateSessionToken } from "@/lib/auth-utils"
import { rateLimiter } from "../rate-limiter"

export async function GET() {
  // Check if the user is authenticated as admin
  const sessionCookie = (await cookies()).get("swastify_admin_session")

  if (!sessionCookie || !validateSessionToken(sessionCookie.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get all blocked IPs
  const blockedIPs = rateLimiter.getBlockedIPs()

  return NextResponse.json({
    blockedIPs,
    count: blockedIPs.length,
    message: "Note: This list will reset if the server restarts",
  })
}

