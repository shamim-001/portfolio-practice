import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"]

export async function uploadImage(file: File): Promise<string> {
  try {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size too large. Maximum size is 5MB.")
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      throw new Error("Invalid file type. Allowed types are JPEG, PNG, and WebP.")
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename with original extension
    const extension = path.extname(file.name)
    const fileName = `${uuidv4()}${extension}`

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadDir, { recursive: true })

    const filePath = path.join(uploadDir, fileName)

    // Save file
    await writeFile(filePath, buffer)

    // Return the public URL
    return `/uploads/${fileName}`
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

