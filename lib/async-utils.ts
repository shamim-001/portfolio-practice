/**
 * Utility functions for handling async operations safely
 */

// Timeout promise
export function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
  })
}

// Race a promise against a timeout
export async function withTimeout<T>(promise: Promise<T>, ms: number, errorMessage?: string): Promise<T> {
  try {
    return await Promise.race([promise, timeout(ms)])
  } catch (error) {
    if (error instanceof Error && error.message.includes("timed out")) {
      throw new Error(errorMessage || `Operation timed out after ${ms}ms`)
    }
    throw error
  }
}

// Retry a function with exponential backoff
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number
    initialDelay?: number
    maxDelay?: number
    factor?: number
    shouldRetry?: (error: unknown) => boolean
  } = {},
): Promise<T> {
  const { maxRetries = 3, initialDelay = 1000, maxDelay = 10000, factor = 2, shouldRetry = () => true } = options

  let lastError: unknown

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      if (attempt >= maxRetries - 1 || !shouldRetry(error)) {
        throw error
      }

      const delay = Math.min(initialDelay * Math.pow(factor, attempt), maxDelay)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

// Safe JSON parse
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T
  } catch (error) {
    console.error("Error parsing JSON:", error)
    return fallback
  }
}

// Debounce a function
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>): void => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// Throttle a function
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>): void => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

