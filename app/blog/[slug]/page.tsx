import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { notFound } from "next/navigation"
import { getPost } from "@/lib/posts"
import { BlogCTA } from "@/components/blog-cta"
import { generateSEO } from "@/lib/seo"
import { generatePostStructuredData } from "@/lib/structured-data"
import Script from "next/script"
import { getGoogleDriveImageUrl } from "@/lib/utils"

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The post you're looking for doesn't exist",
    }
  }

  return generateSEO({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${params.slug}`,
    image: post.image,
    type: "article",
    publishedAt: post.date,
    updatedAt: post.date,
    authors: ["Shamim Ahsan"],
    keywords: ["SEO", "Web Design", "Digital Marketing", ...post.title.split(" ")],
  })
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPost(params.slug)

  if (!post) {
    notFound()
  }

  // Format date for display
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Process image URL (handle Google Drive URLs)
  const imageUrl = post.image.includes("drive.google.com") ? getGoogleDriveImageUrl(post.image) : post.image

  // Generate structured data
  const structuredData = generatePostStructuredData({
    ...post,
    createdAt: post.date,
    updatedAt: post.date,
  })

  return (
    <>
      <Script
        id="blog-post-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="container py-12 md:py-16 lg:py-20">
        <Button variant="ghost" asChild className="mb-8 group">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            Back to Blog
          </Link>
        </Button>
        <div className="mx-auto max-w-3xl">
          <div className="aspect-video overflow-hidden rounded-lg border">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={post.title}
              width={1200}
              height={675}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="mt-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>

            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4" aria-hidden="true" />
                <span>Shamim Ahsan</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" aria-hidden="true" />
                <time dateTime={new Date(post.date).toISOString()}>{formattedDate}</time>
              </div>
            </div>

            <div
              className="mt-8 prose prose-gray dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 border-t pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">Written by</h2>
                  <p className="text-base font-medium">Shamim Ahsan</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/about">About the Author</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/contact">Contact</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <BlogCTA />
    </>
  )
}

