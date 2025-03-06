"use client"

import React from "react"

import { Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

interface NavigationWrapperProps {
  children: React.ReactNode
}

function NavigationContent({ children }: NavigationWrapperProps) {
  // This ensures useSearchParams is used within Suspense
  useSearchParams()
  const pathname = usePathname()

  // Ensure pathname doesn't change during render
  const [currentPath] = React.useState(pathname)

  return React.useMemo(() => children, [currentPath, children])
}

export function NavigationWrapper({ children }: NavigationWrapperProps) {
  return (
    <Suspense fallback={null}>
      <NavigationContent>{children}</NavigationContent>
    </Suspense>
  )
}

