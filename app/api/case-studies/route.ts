import { NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"
import type { CaseStudy } from "@/types"

const caseStudiesFile = join(process.cwd(), "data", "case-studies.json")

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
    const fileContents = await readFile(caseStudiesFile, "utf8")
    const caseStudies = JSON.parse(fileContents)
    return NextResponse.json(caseStudies)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      // If file doesn't exist, return empty array
      await ensureDataDirectory()
      await writeFile(caseStudiesFile, JSON.stringify([]), "utf8")
      return NextResponse.json([])
    }
    console.error("Error fetching case studies:", error)
    return NextResponse.json({ error: "Failed to fetch case studies" }, { status: 500 })
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
    if (!body.title || !body.description || !body.image || !body.industry) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Ensure categories is always an array
    const categories = Array.isArray(body.categories) ? body.categories : []

    const caseStudy: CaseStudy = {
      id: uuidv4(),
      ...body,
      categories: categories,
      featured: Boolean(body.featured) || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await ensureDataDirectory()

    let caseStudies: CaseStudy[] = []
    try {
      const fileContents = await readFile(caseStudiesFile, "utf8")
      caseStudies = JSON.parse(fileContents)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error
      }
      // If file doesn't exist, create an empty array
      caseStudies = []
    }

    // If this case study is featured, ensure we don't exceed 3 featured items
    if (caseStudy.featured) {
      const featuredCount = caseStudies.filter((cs) => cs.featured).length
      if (featuredCount >= 3) {
        throw new Error("Cannot feature more than 3 case studies")
      }
    }

    caseStudies.push(caseStudy)
    await writeFile(caseStudiesFile, JSON.stringify(caseStudies, null, 2))

    return NextResponse.json(caseStudy)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create case study"
    console.error("Error creating case study:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

