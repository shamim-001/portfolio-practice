"use client"

import type React from "react"
import { Suspense } from "react"

interface ClientPageProps {
  children: React.ReactNode
}

export function ClientPage({ children }: ClientPageProps) {
  return (
    <Suspense fallback={null}>
      <div>{children}</div>
    </Suspense>
  )
}

