import type { Metadata } from "next"

interface SEOProps {
  title: string
  description: string
  path: string
  image?: string
  type?: "website" | "article"
  publishedAt?: string
  updatedAt?: string
  authors?: string[]
  keywords?: string[]
}

export function generateSEO({
  title,
  description,
  path,
  image,
  type = "website",
  publishedAt,
  updatedAt,
  authors = ["Shamim Ahsan"],
  keywords = [],
}: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://shamimahsan.com"
  const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`

  // Process image URL to ensure it's absolute
  let ogImage = image || `${baseUrl}/og-image.jpg`
  if (ogImage && !ogImage.startsWith("http") && !ogImage.startsWith("data:")) {
    ogImage = `${baseUrl}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`
  }

  // Ensure dates are in ISO format
  const publishedTime = publishedAt ? new Date(publishedAt).toISOString() : undefined
  const modifiedTime = updatedAt ? new Date(updatedAt).toISOString() : undefined

  return {
    title: {
      default: title,
      template: `%s | Shamim Ahsan`,
    },
    description,
    keywords: keywords.join(", "),
    authors: authors.map((author) => ({ name: author })),
    openGraph: {
      title,
      description,
      url,
      siteName: "Shamim Ahsan",
      locale: "en_US",
      type,
      ...(type === "article" &&
        publishedTime && {
          article: {
            publishedTime,
            ...(modifiedTime && { modifiedTime }),
            authors,
          },
        }),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@shamimahsan",
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    metadataBase: new URL(baseUrl),
  }
}

