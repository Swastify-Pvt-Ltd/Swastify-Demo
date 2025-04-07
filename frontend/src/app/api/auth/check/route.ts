import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { validateSessionToken } from "@/lib/auth-utils"

export async function GET() {
  // Check if the user is authenticated as admin
  const sessionCookies = await cookies();
  const sessionCookie = sessionCookies.get("swastify_admin_session");

  if (!sessionCookie) {
    return NextResponse.json({ authenticated: false })
  }

  const isValid = await validateSessionToken(sessionCookie.value)

  return NextResponse.json({
    authenticated: isValid,
  })
}

