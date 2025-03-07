"use client"

export default function Custom404Page() {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <SearchIcon className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
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
            <HomeIcon className="mr-2 h-4 w-4" aria-hidden="true" />
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
          <ArrowLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          Go Back
        </Button>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeftIcon, HomeIcon, SearchIcon } from "lucide-react"

