"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  if (pathname === "/") return null

  // Create a handler that stops propagation completely
  const handleLinkClick = (e: React.MouseEvent) => {
    // Stop the event from bubbling up to parent elements
    e.stopPropagation()
  }

  return (
    <nav aria-label="Breadcrumb" className="container py-4">
      <ol className="flex items-center justify-end space-x-2 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="flex items-center hover:text-primary" onClick={handleLinkClick}>
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`
          const isLast = index === segments.length - 1
          const title = segment.charAt(0).toUpperCase() + segment.slice(1)

          return (
            <li key={segment} className="flex items-center">
              <ChevronRight className="h-4 w-4" />
              {isLast ? (
                <span className="ml-2 font-medium text-foreground">{title}</span>
              ) : (
                <Link href={href} className="ml-2 hover:text-primary" onClick={handleLinkClick}>
                  {title}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

