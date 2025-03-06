"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar pathname={pathname} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

