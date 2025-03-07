import { readdirSync, readFileSync, existsSync } from "fs"
import { join } from "path"
import matter from "gray-matter"

const postsDirectory = join(process.cwd(), "content/blog")

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  image: string
}

// This function should only be called on the server
export function getAllPosts(): Post[] {
  try {
    // Check if directory exists
    if (!existsSync(postsDirectory)) {
      console.warn(`Blog directory does not exist: ${postsDirectory}`)
      return []
    }

    const fileNames = readdirSync(postsDirectory)

    if (!fileNames || fileNames.length === 0) {
      console.log("No blog posts found")
      return []
    }

    const posts = fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "")
        try {
          const post = getPost(slug)
          return post
        } catch (err) {
          console.error(`Error processing post ${slug}:`, err)
          return undefined
        }
      })
      .filter((post): post is Post => post !== undefined)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return posts
  } catch (error) {
    console.error("Error reading posts:", error)
    return []
  }
}

// This function should only be called on the server
export function getPost(slug: string): Post | undefined {
  try {
    const fullPath = join(postsDirectory, `${slug}.mdx`)

    // Check if file exists
    if (!existsSync(fullPath)) {
      console.warn(`Post file does not exist: ${fullPath}`)
      return undefined
    }

    const fileContents = readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    // Validate required fields
    if (!data.title || !data.date || !data.excerpt) {
      console.warn(`Post ${slug} is missing required frontmatter fields`)
      return undefined
    }

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      image: data.image || "/placeholder.svg", // Provide a default image if none exists
      content: content,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return undefined
  }
}

