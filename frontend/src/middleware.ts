import { NextRequest, NextResponse } from 'next/server'
import { validateSessionToken } from './app/api/auth/route'

export function middleware(request: NextRequest) {
  // Only apply to /admin routes
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }
  
  // Check for the session cookie
  const sessionCookie = request.cookies.get('swastify_admin_session')
  
  // If no session cookie or invalid token, redirect to login
  if (!sessionCookie || !validateSessionToken(sessionCookie.value)) {
    // If this is already the admin login page, allow it
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }
    
    // Otherwise redirect to login
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  
  // If we have a valid session and we're on the login page, redirect to admin dashboard
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
