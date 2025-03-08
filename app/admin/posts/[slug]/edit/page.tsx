import { PostForm } from "@/components/admin/post-form"
import { getPostBySlug } from "@/lib/mdx"
import { notFound } from "next/navigation"

interface EditPostPageProps {
  params: {
    slug: string
  }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Post</h1>
      <PostForm
        initialData={{
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          image: post.image,
        }}
        postId={post.slug}
      />
    </div>
  )
}

