"use client"

import { Suspense, type ReactNode } from "react"
import { LoadingState } from "@/components/loading-state"

interface ClientWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ClientWrapper({ children, fallback = <LoadingState /> }: ClientWrapperProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>
}

