"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
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

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

