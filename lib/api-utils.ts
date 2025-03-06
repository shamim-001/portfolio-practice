import { NextResponse } from "next/server"

export type ApiError = {
  code: string
  message: string
  status: number
  details?: any
}

// Standard error codes
export const ErrorCodes = {
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
  CONFLICT: "CONFLICT",
  UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY",
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
}

// Create a standard error response
export function createErrorResponse(code: string, message: string, status = 500, details?: any): NextResponse {
  console.error(`API Error [${code}]: ${message}`, details)

  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(details ? { details } : {}),
      },
    },
    { status },
  )
}

// Create a success response
export function createSuccessResponse(data: any, status = 200): NextResponse {
  return NextResponse.json({ success: true, data }, { status })
}

// Standard error responses
export const ApiErrors = {
  badRequest: (message = "Bad request", details?: any) =>
    createErrorResponse(ErrorCodes.BAD_REQUEST, message, 400, details),

  unauthorized: (message = "Unauthorized", details?: any) =>
    createErrorResponse(ErrorCodes.UNAUTHORIZED, message, 401, details),

  forbidden: (message = "Forbidden", details?: any) => createErrorResponse(ErrorCodes.FORBIDDEN, message, 403, details),

  notFound: (message = "Resource not found", details?: any) =>
    createErrorResponse(ErrorCodes.NOT_FOUND, message, 404, details),

  methodNotAllowed: (message = "Method not allowed", details?: any) =>
    createErrorResponse(ErrorCodes.METHOD_NOT_ALLOWED, message, 405, details),

  conflict: (message = "Resource conflict", details?: any) =>
    createErrorResponse(ErrorCodes.CONFLICT, message, 409, details),

  unprocessableEntity: (message = "Unprocessable entity", details?: any) =>
    createErrorResponse(ErrorCodes.UNPROCESSABLE_ENTITY, message, 422, details),

  tooManyRequests: (message = "Too many requests", details?: any) =>
    createErrorResponse(ErrorCodes.TOO_MANY_REQUESTS, message, 429, details),

  internalServerError: (message = "Internal server error", details?: any) =>
    createErrorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, message, 500, details),

  serviceUnavailable: (message = "Service unavailable", details?: any) =>
    createErrorResponse(ErrorCodes.SERVICE_UNAVAILABLE, message, 503, details),
}

// Handle API errors
export function handleApiError(error: unknown): NextResponse {
  console.error("API Error:", error)

  if (error instanceof Error) {
    return ApiErrors.internalServerError(error.message, { stack: error.stack })
  }

  return ApiErrors.internalServerError("An unknown error occurred")
}

// CORS headers for API routes
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // In production, set this to your specific domain
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

// Add CORS headers to a response
export function addCorsHeaders(response: NextResponse): NextResponse {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

