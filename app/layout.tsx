import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { PageTransition } from "@/components/page-transition"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "sonner"
import { ErrorBoundary } from "@/components/error-boundary"
import { Suspense } from "react"
import { LoadingState } from "@/components/loading-state"
import Script from "next/script"
import { generateWebsiteStructuredData, generateLocalBusinessStructuredData } from "@/lib/structured-data"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://shamimahsan.com"),
  title: {
    default: "Shamim Ahsan - Web Designer & Local SEO Expert",
    template: "%s | Shamim Ahsan",
  },
  description:
    "Professional web designer and local SEO expert helping businesses grow their online presence through beautiful websites and effective local SEO strategies.",
  keywords: [
    "web design",
    "local SEO",
    "SEO expert",
    "web development",
    "website design",
    "Google Business Profile",
    "GBP optimization",
  ],
  authors: [{ name: "Shamim Ahsan" }],
  creator: "Shamim Ahsan",
  openGraph: {
    title: "Shamim Ahsan - Web Designer & Local SEO Expert",
    description:
      "Professional web designer and local SEO expert helping businesses grow their online presence through beautiful websites and effective local SEO strategies.",
    url: "https://shamimahsan.com",
    siteName: "Shamim Ahsan",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shamim Ahsan - Web Designer & Local SEO Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shamim Ahsan",
    description:
      "Professional web designer and local SEO expert helping businesses grow their online presence through beautiful websites and effective local SEO strategies.",
    creator: "@shamimahsan",
    images: ["/og-image.jpg"],
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
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://shamimahsan.com",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "verification_token", // Replace with your Google verification token
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Generate structured data for the website
  const websiteStructuredData = generateWebsiteStructuredData()
  const localBusinessStructuredData = generateLocalBusinessStructuredData()

  // Precompute structured data to avoid hydration issues
  const websiteStructuredDataString = JSON.stringify(websiteStructuredData)
  const localBusinessStructuredDataString = JSON.stringify(localBusinessStructuredData)

  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteStructuredDataString }}
          strategy="beforeInteractive"
        />
        <Script
          id="schema-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: localBusinessStructuredDataString }}
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.variable}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <div className="relative flex min-h-screen flex-col">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground"
              >
                Skip to main content
              </a>
              <Navbar />
              <main id="main-content" className="flex-1">
                <Suspense fallback={<LoadingState />}>
                  <PageTransition>{children}</PageTransition>
                </Suspense>
              </main>
              <Footer />
            </div>
          </ErrorBoundary>
          <Analytics />
          <Toaster position="top-right" closeButton richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'