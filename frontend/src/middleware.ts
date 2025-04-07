import { type NextRequest, NextResponse } from "next/server"
import { validateSessionToken } from "@/lib/auth-utils"

export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next()

  // Add security headers to all responses
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // Only apply auth middleware to /admin routes
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return response
  }

  // Check for the session cookie
  const sessionCookie = request.cookies.get("swastify_admin_session")

  // If no session cookie or invalid token, redirect to login
  if (!sessionCookie || !validateSessionToken(sessionCookie.value)) {
    // If this is already the admin login page, allow it
    if (request.nextUrl.pathname === "/admin/login") {
      return response
    }

    // Otherwise redirect to login
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // If we have a valid session and we're on the login page, redirect to admin dashboard
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

