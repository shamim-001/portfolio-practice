"use client"

import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Breadcrumbs } from "@/components/breadcrumbs"

// Main component with Suspense boundary
export function ClientNavigation() {
  return (
    <Suspense
      fallback={
        <div className="h-16 w-full border-b bg-background/95 backdrop-blur">
          <div className="container flex h-16 items-center justify-between">
            <div className="animate-pulse h-6 w-32 bg-muted rounded" />
            <div className="animate-pulse h-6 w-96 bg-muted rounded" />
            <div className="animate-pulse h-6 w-32 bg-muted rounded" />
          </div>
        </div>
      }
    >
      <div>
        <Navbar />
        <Breadcrumbs />
      </div>
    </Suspense>
  )
}

