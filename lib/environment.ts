/**
 * Helper functions for checking the runtime environment
 * These help prevent hydration errors by providing consistent checks.
 */

// Check if code is running on the server
export const isServer = typeof window === "undefined"

// Check if code is running on the client
export const isClient = !isServer

// Check if the code is running in development
export const isDevelopment = process.env.NODE_ENV === "development"

// Check if the code is running in production
export const isProduction = process.env.NODE_ENV === "production"

// Check if the code is running in test
export const isTest = process.env.NODE_ENV === "test"

// Check if Do Not Track is enabled (client only)
export function isDoNotTrackEnabled(): boolean {
  if (isServer) return false

  const dnt =
    navigator.doNotTrack === "1" ||
    navigator.doNotTrack === "yes" ||
    window.navigator.msDoNotTrack === "1" ||
    (window as any).doNotTrack === "1"

  return Boolean(dnt)
}

// Safe window scroll function
export function safeWindowScroll(options: ScrollToOptions = { top: 0, behavior: "auto" }) {
  if (isClient) {
    try {
      window.scrollTo(options)
    } catch (error) {
      console.error("Error scrolling window:", error)
    }
  }
}

// Get the base URL
export function getBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (baseUrl) {
    return baseUrl
  }

  if (isClient) {
    return window.location.origin
  }

  return "https://shamimahsan.com" // Fallback default
}

// Safely access local storage
export function safeLocalStorage(key: string, value?: string): string | null {
  if (isServer) return null

  try {
    if (value !== undefined) {
      localStorage.setItem(key, value)
      return value
    }
    return localStorage.getItem(key)
  } catch (e) {
    console.error("LocalStorage error:", e)
    return null
  }
}

// Safely access session storage
export function safeSessionStorage(key: string, value?: string): string | null {
  if (isServer) return null

  try {
    if (value !== undefined) {
      sessionStorage.setItem(key, value)
      return value
    }
    return sessionStorage.getItem(key)
  } catch (e) {
    console.error("SessionStorage error:", e)
    return null
  }
}

// Check if the user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (isServer) return false

  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  } catch (e) {
    return false
  }
}

// Check if the user prefers dark mode
export function prefersDarkMode(): boolean {
  if (isServer) return false

  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  } catch (e) {
    return false
  }
}

// Safely get viewport dimensions
export function getViewportDimensions(): { width: number; height: number } {
  if (isServer) {
    return { width: 0, height: 0 }
  }

  try {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  } catch (e) {
    return { width: 0, height: 0 }
  }
}

// Detect browser
export function getBrowser(): string {
  if (isServer) return "unknown"

  try {
    const userAgent = navigator.userAgent

    if (userAgent.indexOf("Chrome") > -1) return "chrome"
    if (userAgent.indexOf("Safari") > -1) return "safari"
    if (userAgent.indexOf("Firefox") > -1) return "firefox"
    if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident/") > -1) return "ie"
    if (userAgent.indexOf("Edge") > -1) return "edge"

    return "unknown"
  } catch (e) {
    return "unknown"
  }
}

// Detect mobile device
export function isMobileDevice(): boolean {
  if (isServer) return false

  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  } catch (e) {
    return false
  }
}

// Safely add event listener
export function safeAddEventListener(
  target: EventTarget | null,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
): () => void {
  if (!target) return () => {}

  try {
    target.addEventListener(type, listener, options)
    return () => {
      try {
        target.removeEventListener(type, listener, options)
      } catch (e) {
        console.error(`Error removing event listener (${type}):`, e)
      }
    }
  } catch (e) {
    console.error(`Error adding event listener (${type}):`, e)
    return () => {}
  }
}

