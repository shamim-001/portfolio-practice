import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Set security headers
  const response = NextResponse.next()

  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self'; connect-src 'self' https:; media-src 'self'; object-src 'none'; frame-src 'self';",
  )

  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const hasAdminSession = request.cookies.has("admin_session")

    // Allow access to login page if no session exists
    if (request.nextUrl.pathname === "/admin/login") {
      // Redirect to admin dashboard if already logged in
      if (hasAdminSession) {
        return NextResponse.redirect(new URL("/admin", request.url))
      }
      return response
    }

    // Skip middleware for static assets
    if (
      request.nextUrl.pathname.includes("/_next") ||
      request.nextUrl.pathname.includes("/images/") ||
      request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|ico)$/)
    ) {
      return response
    }

    // Redirect to login if no session exists
    if (!hasAdminSession && request.nextUrl.pathname !== "/admin/login") {
      const loginUrl = new URL("/admin/login", request.url)
      // Preserve the original URL as a search parameter to redirect after login
      loginUrl.searchParams.set("from", request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return response
}

export const config = {
  matcher: [
    // Match all routes
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

