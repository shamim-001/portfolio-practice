import type { Metadata, ResolvingMetadata } from "next"
import { getBaseUrl } from "@/lib/environment"

// Base metadata for the site
export const siteConfig = {
  name: "Shamim Ahsan",
  description: "Professional web designer and local SEO expert helping businesses grow their online presence.",
  url: getBaseUrl(),
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/shamimahsan",
    github: "https://github.com/shamimahsan",
  },
}

// Default metadata
export const defaultMetadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Web Designer & Local SEO Expert`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "web design",
    "local SEO",
    "SEO expert",
    "web development",
    "website design",
    "Google Business Profile",
    "GBP optimization",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@shamimahsan",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL(siteConfig.url),
}

// Generate metadata for a page
export async function generateMetadata(
  params: {
    title?: string
    description?: string
    image?: string
    path?: string
    type?: "website" | "article"
    publishedAt?: string
    updatedAt?: string
    authors?: string[]
    keywords?: string[]
    noIndex?: boolean
  },
  parent?: ResolvingMetadata,
): Promise<Metadata> {
  // Merge with parent metadata
  const previousMetadata = await parent

  // Process title
  const title = params.title
    ? {
        absolute: params.title,
        template: `%s | ${siteConfig.name}`,
      }
    : previousMetadata?.title || defaultMetadata.title

  // Process description
  const description = params.description || previousMetadata?.description || defaultMetadata.description

  // Process image
  let ogImage = params.image || siteConfig.ogImage
  if (ogImage && !ogImage.startsWith("http") && !ogImage.startsWith("data:")) {
    ogImage = `${siteConfig.url}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`
  }

  // Process path
  const path = params.path || ""
  const url = `${siteConfig.url}${path.startsWith("/") ? "" : "/"}${path}`

  // Process dates
  const publishedTime = params.publishedAt ? new Date(params.publishedAt).toISOString() : undefined
  const modifiedTime = params.updatedAt ? new Date(params.updatedAt).toISOString() : undefined

  // Process authors
  const authors = params.authors?.map((name) => ({ name })) || [{ name: siteConfig.name }]

  // Process keywords
  const keywords = params.keywords || defaultMetadata.keywords

  // Process robots
  const robots = params.noIndex
    ? {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      }
    : defaultMetadata.robots

  return {
    title,
    description,
    keywords,
    authors,
    openGraph: {
      title: params.title || (typeof title === "object" ? title.absolute : title) || siteConfig.name,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: params.type || "website",
      ...(params.type === "article" &&
        publishedTime && {
          article: {
            publishedTime,
            ...(modifiedTime && { modifiedTime }),
            authors: params.authors || [siteConfig.name],
          },
        }),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: params.title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: params.title || siteConfig.name,
      description,
      images: [ogImage],
      creator: "@shamimahsan",
    },
    alternates: {
      canonical: url,
    },
    robots,
    metadataBase: new URL(siteConfig.url),
  }
}

