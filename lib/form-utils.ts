import type { z } from "zod"
import { safeJsonParse } from "@/lib/async-utils"
import { isClient, safeSessionStorage } from "@/lib/environment"

// Save form data to session storage
export function saveFormData<T>(key: string, data: T): void {
  if (!isClient) return

  try {
    safeSessionStorage(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Error saving form data for ${key}:`, error)
  }
}

// Load form data from session storage
export function loadFormData<T>(key: string, defaultValue: T): T {
  if (!isClient) return defaultValue

  try {
    const savedData = safeSessionStorage(key)
    if (!savedData) return defaultValue

    return safeJsonParse<T>(savedData, defaultValue)
  } catch (error) {
    console.error(`Error loading form data for ${key}:`, error)
    return defaultValue
  }
}

// Clear form data from session storage
export function clearFormData(key: string): void {
  if (!isClient) return

  try {
    safeSessionStorage(key, null)
  } catch (error) {
    console.error(`Error clearing form data for ${key}:`, error)
  }
}

// Validate form data with Zod schema
export function validateFormData<T>(
  data: unknown,
  schema: z.ZodType<T>,
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  return { success: false, error: result.error }
}

// Format Zod errors for display
export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const formattedErrors: Record<string, string> = {}

  error.errors.forEach((err) => {
    if (err.path.length > 0) {
      const path = err.path.join(".")
      formattedErrors[path] = err.message
    }
  })

  return formattedErrors
}

