import { readdirSync, readFileSync } from "fs"
import { join } from "path"
import matter from "gray-matter"

const contentDirectory = join(process.cwd(), "content/blog")

export function getAllPosts() {
  const slugs = getPostSlugs()
  const posts = slugs.map((slug) => getPostBySlug(slug)).sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function getPostSlugs() {
  return readdirSync(contentDirectory)
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "")
  const fullPath = join(contentDirectory, `${realSlug}.mdx`)
  const fileContents = readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    image: data.image,
    content,
  }
}

