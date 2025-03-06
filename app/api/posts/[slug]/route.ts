import { NextResponse } from "next/server"
import { writeFile, unlink } from "fs/promises"
import { join } from "path"
import matter from "gray-matter"

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { title, excerpt, content, image } = await request.json()

    // Create frontmatter
    const frontmatter = {
      title,
      date: new Date().toISOString(),
      excerpt,
      image,
    }

    // Create MDX content
    const mdxContent = matter.stringify(content, frontmatter)

    // Write file
    const filePath = join(process.cwd(), "content/blog", `${params.slug}.mdx`)
    await writeFile(filePath, mdxContent)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to update post:", error)
    return NextResponse.json({ success: false, error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const filePath = join(process.cwd(), "content/blog", `${params.slug}.mdx`)
    await unlink(filePath)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete post:", error)
    return NextResponse.json({ success: false, error: "Failed to delete post" }, { status: 500 })
  }
}

