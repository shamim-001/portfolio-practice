"use client"

import { Suspense, type ReactNode } from "react"

interface ClientWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ClientWrapper({ children, fallback = null }: ClientWrapperProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>
}

