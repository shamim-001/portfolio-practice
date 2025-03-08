import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Set security headers
  const response = NextResponse.next()

  // Add pathname to headers for layout to use
  response.headers.set("x-pathname", request.nextUrl.pathname)

  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self'; connect-src 'self' https:; media-src 'self'; object-src 'none'; frame-src 'self';",
  )

  // Handle admin login redirects
  if (request.nextUrl.pathname === "/admin/login") {
    const hasAdminSession = request.cookies.has("admin_session")

    // Redirect to admin dashboard if already logged in
    if (hasAdminSession) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url))
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

