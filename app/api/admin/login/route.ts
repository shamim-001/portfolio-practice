import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

// In-memory store for rate limiting (in production, use Redis or similar)
const loginAttempts = new Map<string, { count: number; timestamp: number; locked?: boolean; lockUntil?: number }>()

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"

    // Check rate limit
    const now = Date.now()
    const attempts = loginAttempts.get(ip) || { count: 0, timestamp: now }

    // Check if account is locked out
    if (attempts.locked && attempts.lockUntil) {
      const remainingLockoutTime = Math.round((attempts.lockUntil - now) / 1000 / 60)
      return NextResponse.json(
        {
          success: false,
          error: `Account temporarily locked due to too many failed attempts. Try again in ${remainingLockoutTime} minutes.`,
        },
        { status: 429 },
      )
    }

    // Reset count if window has passed
    if (now - attempts.timestamp > RATE_LIMIT_WINDOW) {
      attempts.count = 0
      attempts.timestamp = now
    }

    // Check if rate limit exceeded
    if (attempts.count >= MAX_ATTEMPTS) {
      // Lock the account
      attempts.locked = true
      attempts.lockUntil = now + LOCKOUT_DURATION
      loginAttempts.set(ip, attempts)

      return NextResponse.json(
        {
          success: false,
          error: "Too many login attempts. Your account has been temporarily locked for security reasons.",
        },
        { status: 429 },
      )
    }

    // Increment attempt count
    attempts.count++
    loginAttempts.set(ip, attempts)

    // Validate request
    const contentType = request.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
    }

    const { password } = await request.json()

    if (!process.env.ADMIN_PASSWORD) {
      console.error("ADMIN_PASSWORD environment variable is not set")
      return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 })
    }

    if (password === process.env.ADMIN_PASSWORD) {
      // Set admin session cookie
      cookies().set("admin_session", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      })

      // Reset login attempts on successful login
      loginAttempts.delete(ip)

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "An error occurred" }, { status: 500 })
  }
}

