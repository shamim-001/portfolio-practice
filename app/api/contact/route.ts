import { NextResponse } from "next/server"
import { Resend } from "resend"
import { ApiErrors, handleApiError, addCorsHeaders } from "@/lib/api-utils"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limiting
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const MAX_ATTEMPTS = 5

// In-memory store for rate limiting (in production, use Redis or similar)
const contactAttempts = new Map<string, { count: number; timestamp: number }>()

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return ApiErrors.serviceUnavailable("Email service not configured")
  }

  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const now = Date.now()
    const attempts = contactAttempts.get(ip) || { count: 0, timestamp: now }

    // Reset count if window has passed
    if (now - attempts.timestamp > RATE_LIMIT_WINDOW) {
      attempts.count = 0
      attempts.timestamp = now
    }

    // Check if rate limit exceeded
    if (attempts.count >= MAX_ATTEMPTS) {
      return ApiErrors.tooManyRequests("Too many contact form submissions. Please try again later.")
    }

    // Parse and validate request body
    const body = await request.json()

    const validationResult = contactSchema.safeParse(body)
    if (!validationResult.success) {
      return ApiErrors.unprocessableEntity("Validation failed", validationResult.error.format())
    }

    const { name, email, subject, message } = validationResult.data

    // Increment attempt count
    attempts.count++
    contactAttempts.set(ip, attempts)

    // Send email
    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["theshamimahsan@gmail.com"],
      reply_to: email,
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    })

    if (data.error) {
      throw new Error(data.error.message)
    }

    const response = NextResponse.json({ success: true })
    return addCorsHeaders(response)
  } catch (error) {
    console.error("Email sending error:", error)
    return handleApiError(error)
  }
}

