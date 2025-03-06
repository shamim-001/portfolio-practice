"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { useEffect, useState } from "react"

// Define the global plausible type
declare global {
  interface Window {
    plausible?: (event: string, options?: any) => void
    doNotTrack?: () => boolean | null
  }
}

// Helper function to check Do Not Track setting
function isDoNotTrackEnabled(): boolean {
  if (typeof window === "undefined") return false

  const dnt =
    navigator.doNotTrack === "1" ||
    navigator.doNotTrack === "yes" ||
    navigator.msDoNotTrack === "1" ||
    window.doNotTrack === "1"

  return dnt
}

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)

  // Only run after component has mounted to access browser APIs
  useEffect(() => {
    setMounted(true)
  }, [])

  // Track pageviews
  useEffect(() => {
    if (!mounted) return

    // Don't track if user has enabled Do Not Track
    if (isDoNotTrackEnabled()) {
      console.log("Respecting Do Not Track setting. Analytics disabled.")
      return
    }

    // Track pageview when pathname changes
    if (typeof window.plausible !== "undefined") {
      window.plausible("pageview")
    }
  }, [pathname, searchParams, mounted])

  // Don't load analytics script if Do Not Track is enabled
  if (mounted && isDoNotTrackEnabled()) {
    return null
  }

  return (
    <Script
      data-domain={process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, "") || "shamimahsan.com"}
      src="https://plausible.io/js/script.js"
      strategy="lazyOnload"
      data-exclude="/admin/*"
    />
  )
}

