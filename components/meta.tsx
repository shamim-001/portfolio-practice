"use client"

import { Suspense } from "react"

interface MetaProps {
  title: string
  description: string
  ogImage?: string
  ogType?: "website" | "article"
  canonical?: string
  keywords?: string[]
}

// Main component with Suspense boundary
export function Meta(props: MetaProps) {
  return (
    <Suspense fallback={null}>
      <MetaContent {...props} />
    </Suspense>
  )
}

// Content component that uses client hooks
function MetaContent({
  title,
  description,
  ogImage = "/og-image.jpg",
  ogType = "website",
  canonical,
  keywords = [],
}: MetaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://shamimahsan.com"
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="Shamim Ahsan" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Canonical */}
      <link rel="canonical" href={fullCanonical} />
    </>
  )
}

