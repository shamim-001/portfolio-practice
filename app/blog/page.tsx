import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Link from "next/link"
import { getAllPosts } from "@/lib/posts"

export default async function BlogPage() {
  const posts = await getAllPosts()

  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container max-w-6xl mx-auto py-12 md:py-24 lg:py-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blog</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Read the latest articles about web design, SEO, and digital marketing strategies.
        </p>
      </div>
      <div className="mt-12">
        {sortedPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-medium">No posts found</h2>
            <p className="mt-2 text-muted-foreground">There are no blog posts published yet.</p>
            <Button asChild className="mt-6">
              <Link href="/admin/posts/new">Create Your First Post</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

