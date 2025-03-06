import { NextResponse } from "next/server"
import { readFile, writeFile } from "fs/promises"
import { join } from "path"
import type { CaseStudy } from "@/types"

const caseStudiesFile = join(process.cwd(), "data", "case-studies.json")

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const fileContents = await readFile(caseStudiesFile, "utf8")
    const caseStudies = JSON.parse(fileContents)
    const caseStudy = caseStudies.find((cs: CaseStudy) => cs.id === params.id)

    if (!caseStudy) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 })
    }

    return NextResponse.json(caseStudy)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch case study" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const fileContents = await readFile(caseStudiesFile, "utf8")
    const caseStudies = JSON.parse(fileContents)
    const index = caseStudies.findIndex((cs: CaseStudy) => cs.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 })
    }

    // Ensure categories is always an array
    const categories = Array.isArray(body.categories) ? body.categories : []

    // If this case study is being featured, ensure we don't exceed 3 featured items
    if (body.featured && !caseStudies[index].featured) {
      const featuredCount = caseStudies.filter((cs: CaseStudy) => cs.featured && cs.id !== params.id).length
      if (featuredCount >= 3) {
        return NextResponse.json({ error: "Cannot feature more than 3 case studies" }, { status: 400 })
      }
    }

    const updatedCaseStudy = {
      ...caseStudies[index],
      ...body,
      categories: categories,
      updatedAt: new Date().toISOString(),
    }

    caseStudies[index] = updatedCaseStudy
    await writeFile(caseStudiesFile, JSON.stringify(caseStudies, null, 2))

    return NextResponse.json(updatedCaseStudy)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update case study" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const fileContents = await readFile(caseStudiesFile, "utf8")
    const caseStudies = JSON.parse(fileContents)
    const filteredCaseStudies = caseStudies.filter((cs: CaseStudy) => cs.id !== params.id)

    await writeFile(caseStudiesFile, JSON.stringify(filteredCaseStudies, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete case study" }, { status: 500 })
  }
}

