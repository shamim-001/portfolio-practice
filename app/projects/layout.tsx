import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects - Web Design Portfolio",
  description: "Explore my web design and development projects.",
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

