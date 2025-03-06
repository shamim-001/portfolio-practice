import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SEO Case Studies",
  description: "Explore real-world SEO success stories and results.",
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

