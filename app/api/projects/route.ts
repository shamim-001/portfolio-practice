import { NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"
import type { Project } from "@/types"

const projectsFile = join(process.cwd(), "data", "projects.json")

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = join(process.cwd(), "data")
  try {
    await mkdir(dataDir, { recursive: true })
  } catch (error) {
    // Directory already exists or cannot be created
    console.error("Error creating data directory:", error)
  }
}

export async function GET() {
  try {
    const fileContents = await readFile(projectsFile, "utf8")
    const projects = JSON.parse(fileContents)
    return NextResponse.json(projects)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      // If file doesn't exist, return empty array
      await ensureDataDirectory()
      await writeFile(projectsFile, JSON.stringify([]), "utf8")
      return NextResponse.json([])
    }
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Validate content type
    const contentType = request.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
    }

    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Ensure tags is always an array
    const tags =
      typeof body.tags === "string"
        ? body.tags.split(",").map((tag: string) => tag.trim())
        : Array.isArray(body.tags)
          ? body.tags
          : []

    // Ensure categories is always an array
    const categories = Array.isArray(body.categories) ? body.categories : []

    const project: Project = {
      id: uuidv4(),
      ...body,
      tags: tags,
      categories: categories,
      featured: Boolean(body.featured) || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await ensureDataDirectory()

    let projects: Project[] = []
    try {
      const fileContents = await readFile(projectsFile, "utf8")
      projects = JSON.parse(fileContents)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error
      }
      // If file doesn't exist, create an empty array
      projects = []
    }

    // If this project is featured, ensure we don't exceed 3 featured items
    if (project.featured) {
      const featuredCount = projects.filter((p) => p.featured).length
      if (featuredCount >= 3) {
        return NextResponse.json(
          {
            success: false,
            error: "Cannot feature more than 3 projects. Please unfeature an existing project first.",
          },
          { status: 400 },
        )
      }
    }

    projects.push(project)
    await writeFile(projectsFile, JSON.stringify(projects, null, 2))

    return NextResponse.json(project)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create project"
    console.error("Error creating project:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

