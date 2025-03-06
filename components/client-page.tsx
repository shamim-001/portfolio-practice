"use client"

import type React from "react"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

interface ClientPageProps {
  children: React.ReactNode
}

function ClientPageContent({ children }: ClientPageProps) {
  // This ensures useSearchParams is used within Suspense
  useSearchParams()
  return children
}

export function ClientPage({ children }: ClientPageProps) {
  return (
    <Suspense fallback={null}>
      <ClientPageContent>{children}</ClientPageContent>
    </Suspense>
  )
}

