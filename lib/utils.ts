import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGoogleDriveImageUrl(url: string): string {
  // First check if the URL is valid
  if (!url || typeof url !== "string") return "/placeholder.svg"

  // Check if it's already an optimized Google Drive URL
  if (url.includes("drive.google.com/uc?export=view")) {
    return url
  }

  // Check if it's a Google Drive URL
  if (url.includes("drive.google.com")) {
    // Extract file ID - look for patterns in sharing URLs
    let fileId: string | null = null

    // Pattern 1: /file/d/FILE_ID/
    const filePattern = /\/file\/d\/([-\w]{25,})/
    const fileMatch = url.match(filePattern)
    if (fileMatch) {
      fileId = fileMatch[1]
    }

    // Pattern 2: id=FILE_ID
    const idPattern = /id=([-\w]{25,})/
    const idMatch = url.match(idPattern)
    if (!fileId && idMatch) {
      fileId = idMatch[1]
    }

    // Pattern 3: Just look for a long alphanumeric string
    const genericPattern = /[-\w]{25,}/
    const genericMatch = url.match(genericPattern)
    if (!fileId && genericMatch) {
      fileId = genericMatch[0]
    }

    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`
    }
  }

  // If it's a local path without a leading slash, add one
  if (!url.startsWith("/") && !url.startsWith("http")) {
    return `/${url}`
  }

  return url
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  const match = url.match(regex)

  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`
  }

  return null
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

