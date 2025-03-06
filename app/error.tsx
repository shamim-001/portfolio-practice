"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import { isClient, safeLocalStorage } from "@/lib/environment"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)

    // Store error in local storage for debugging
    if (isClient && process.env.NODE_ENV === "development") {
      safeLocalStorage(
        "lastError",
        JSON.stringify({
          message: error.message,
          stack: error.stack,
          digest: error.digest,
          time: new Date().toISOString(),
        }),
      )
    }
  }, [error])

  // Determine if it's a network error
  const isNetworkError =
    error.message.includes("fetch") || error.message.includes("network") || error.message.includes("Failed to fetch")

  // Determine if it's a timeout error
  const isTimeoutError = error.message.includes("timeout") || error.message.includes("Timeout")

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-10 w-10 text-destructive" aria-hidden="true" />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground max-w-md">
          {isNetworkError
            ? "There seems to be a network issue. Please check your internet connection and try again."
            : isTimeoutError
              ? "The request took too long to complete. Please try again."
              : "We apologize for the inconvenience. An unexpected error has occurred."}
          {process.env.NODE_ENV === "development" && error?.message && (
            <span className="block mt-2 text-sm font-mono bg-muted p-2 rounded-md">{error.message}</span>
          )}
        </p>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => {
            // Clear any cached state that might be causing the error
            if (isClient) {
              sessionStorage.removeItem("lastRoute")
            }
            reset()
          }}
        >
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
          Try Again
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
        </Button>
      </div>
      {error.digest && <p className="text-xs text-muted-foreground mt-4">Error ID: {error.digest}</p>}
    </div>
  )
}

