"use client"

import type React from "react"
import { Suspense } from "react"

interface NavigationWrapperProps {
  children: React.ReactNode
}

export function NavigationWrapper({ children }: NavigationWrapperProps) {
  return (
    <Suspense fallback={null}>
      <div>{children}</div>
    </Suspense>
  )
}

