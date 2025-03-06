"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"

export function BlogCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if the CTA has been closed in this session
    const hasBeenClosed = sessionStorage.getItem("blog-cta-closed") === "true"

    if (!hasBeenClosed) {
      const handleScroll = () => {
        const scrolled = window.scrollY
        const threshold = 1000 // Show after scrolling 1000px

        if (scrolled > threshold) {
          setIsVisible(true)
          // Remove the scroll listener once shown
          window.removeEventListener("scroll", handleScroll)
        }
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // Store that the CTA has been closed in this session
    sessionStorage.setItem("blog-cta-closed", "true")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm rounded-lg border bg-background p-6 shadow-lg">
      <h4 className="text-lg font-semibold">Need help with your SEO?</h4>
      <p className="mt-2 text-sm text-muted-foreground">
        I can help improve your website's visibility and attract more customers.
      </p>
      <div className="mt-4 flex gap-4">
        <Button asChild className="w-full">
          <Link href="/contact">Get Started</Link>
        </Button>
        <Button variant="outline" className="shrink-0" onClick={handleClose}>
          Close
        </Button>
      </div>
    </div>
  )
}

