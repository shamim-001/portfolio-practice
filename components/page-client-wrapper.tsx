"use client"

import { Suspense, type ReactNode } from "react"

interface PageClientWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export function PageClientWrapper({ children, fallback = null }: PageClientWrapperProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>
}

