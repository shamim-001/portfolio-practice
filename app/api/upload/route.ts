import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"
import { existsSync } from "fs"
import path from "path"
import { ApiErrors, handleApiError, addCorsHeaders } from "@/lib/api-utils"

// Define allowed file types and max size
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"]

// Handle OPTIONS request (preflight)
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
  try {
    // Check if the uploads directory exists, create it if it doesn't
    const uploadDir = join(process.cwd(), "public", "uploads")
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Parse form data
    let formData: FormData
    try {
      formData = await request.formData()
    } catch (error) {
      return ApiErrors.badRequest("Invalid form data")
    }

    const file = formData.get("file")

    if (!file || !(file instanceof File)) {
      return ApiErrors.badRequest("No file provided or invalid file")
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return ApiErrors.badRequest(`File size exceeds the maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`)
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return ApiErrors.badRequest(`File type not allowed. Allowed types: ${ALLOWED_MIME_TYPES.join(", ")}`)
    }

    // Validate file extension
    const fileExt = path.extname(file.name).toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      return ApiErrors.badRequest(`File extension not allowed. Allowed extensions: ${ALLOWED_EXTENSIONS.join(", ")}`)
    }

    // Read file as buffer
    let buffer: Buffer
    try {
      const bytes = await file.arrayBuffer()
      buffer = Buffer.from(bytes)
    } catch (error) {
      return ApiErrors.badRequest("Failed to read file")
    }

    // Create unique filename with original extension
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_") // Sanitize original filename
    const fileName = `${uuidv4()}-${sanitizedName}`
    const filePath = join(uploadDir, fileName)

    // Save file
    try {
      await writeFile(filePath, buffer)
    } catch (error) {
      return ApiErrors.internalServerError("Failed to save file", { error })
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      url: `/uploads/${fileName}`,
      fileName: fileName,
      originalName: file.name,
      size: file.size,
      type: file.type,
    })

    return addCorsHeaders(response)
  } catch (error) {
    return handleApiError(error)
  }
}

