import { NextResponse } from "next/server"
import { readFile, writeFile } from "fs/promises"
import { join } from "path"
import { ApiErrors, handleApiError } from "@/lib/api-utils"
import { z } from "zod"

const projectsFile = join(process.cwd(), "data", "projects.json")

// Validation schema
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image is required"),
  link: z.string().url("Must be a valid URL"),
  tags: z.union([z.string().transform((str) => str.split(",").map((tag) => tag.trim())), z.array(z.string())]),
  categories: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
})

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!params.id) {
      return ApiErrors.badRequest("Project ID is required")
    }

    const fileContents = await readFile(projectsFile, "utf8")
    const projects = JSON.parse(fileContents)
    const project = projects.find((p: any) => p.id === params.id)

    if (!project) {
      return ApiErrors.notFound("Project not found")
    }

    return NextResponse.json(project)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!params.id) {
      return ApiErrors.badRequest("Project ID is required")
    }

    // Validate request body
    const body = await request.json()
    const validationResult = projectSchema.safeParse(body)

    if (!validationResult.success) {
      return ApiErrors.unprocessableEntity("Validation failed", validationResult.error.format())
    }

    const validatedData = validationResult.data

    // Read existing projects
    const fileContents = await readFile(projectsFile, "utf8")
    const projects = JSON.parse(fileContents)
    const index = projects.findIndex((p: any) => p.id === params.id)

    if (index === -1) {
      return ApiErrors.notFound("Project not found")
    }

    // If this project is being featured, ensure we don't exceed 3 featured items
    if (validatedData.featured && !projects[index].featured) {
      const featuredCount = projects.filter((p: any) => p.featured && p.id !== params.id).length
      if (featuredCount >= 3) {
        return ApiErrors.conflict("Cannot feature more than 3 projects. Please unfeature an existing project first.")
      }
    }

    // Update project
    const updatedProject = {
      ...projects[index],
      ...validatedData,
      updatedAt: new Date().toISOString(),
    }

    projects[index] = updatedProject
    await writeFile(projectsFile, JSON.stringify(projects, null, 2))

    return NextResponse.json(updatedProject)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!params.id) {
      return ApiErrors.badRequest("Project ID is required")
    }

    const fileContents = await readFile(projectsFile, "utf8")
    const projects = JSON.parse(fileContents)
    const filteredProjects = projects.filter((p: any) => p.id !== params.id)

    // Check if project was found and removed
    if (filteredProjects.length === projects.length) {
      return ApiErrors.notFound("Project not found")
    }

    await writeFile(projectsFile, JSON.stringify(filteredProjects, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}

