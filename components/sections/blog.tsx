"use client"

import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/blog-card"
import { motion } from "framer-motion"
import Link from "next/link"
import { FileText } from "lucide-react"
import type { Post } from "@/lib/posts"

interface BlogSectionProps {
  posts: Post[]
}

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest Blog Posts</h2>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Read my latest articles about web design, SEO, and digital marketing.
          </p>
        </div>
        <div className="mt-12">
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No posts yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Check back soon for new articles about web design, SEO, and digital marketing.
              </p>
            </div>
          )}
        </div>
        <div className="mt-12 flex justify-center">
          <Button asChild>
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

