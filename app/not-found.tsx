"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Suspense } from "react"

// Main component with Suspense boundary
export default function NotFoundPage() {
  return (
    <Suspense
      fallback={
        <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
          <div className="animate-pulse space-y-4">
            <div className="h-20 w-20 mx-auto rounded-full bg-muted"></div>
            <div className="h-8 w-40 mx-auto bg-muted rounded"></div>
            <div className="h-4 w-60 mx-auto bg-muted rounded"></div>
          </div>
        </div>
      }
    >
      <NotFoundContent />
    </Suspense>
  )
}

// Separate the part that uses client hooks
function NotFoundContent() {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Search className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the
          homepage.
        </p>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.history.back()
            }
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Go Back
        </Button>
      </div>
    </div>
  )
}

