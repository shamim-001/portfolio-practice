import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import matter from "gray-matter"

export async function POST(request: Request) {
  try {
    const { title, excerpt, content, image } = await request.json()

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")

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
    const filePath = join(process.cwd(), "content/blog", `${slug}.mdx`)
    await writeFile(filePath, mdxContent)

    return NextResponse.json({ success: true, slug })
  } catch (error) {
    console.error("Failed to create post:", error)
    return NextResponse.json({ success: false, error: "Failed to create post" }, { status: 500 })
  }
}

