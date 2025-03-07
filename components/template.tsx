"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Suspense } from "react"

// Main component with Suspense boundary
export function Template({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<TemplateSkeleton />}>
      <TemplateContent>{children}</TemplateContent>
    </Suspense>
  )
}

// Skeleton loading state
function TemplateSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 w-full border-b bg-background/95">
        <div className="container flex h-16 items-center justify-between">
          <div className="animate-pulse h-6 w-32 bg-muted rounded" />
          <div className="animate-pulse h-6 w-96 bg-muted rounded" />
          <div className="animate-pulse h-6 w-32 bg-muted rounded" />
        </div>
      </div>
      <main className="flex-1">
        <div className="container py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-[200px] bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-[90%] bg-muted rounded" />
          </div>
        </div>
      </main>
      <div className="h-96 bg-muted/10" />
    </div>
  )
}

// Content component that uses client hooks
function TemplateContent({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <TemplateSkeleton />
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

