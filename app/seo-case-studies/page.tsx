import { FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { CaseStudy } from "@/types"
import { readFile } from "fs/promises"
import { join } from "path"

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const fileContents = await readFile(join(process.cwd(), "data", "case-studies.json"), "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return []
    }
    console.error("Error reading case studies:", error)
    return []
  }
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  // Sort case studies: featured first, then by creation date (newest first)
  const sortedCaseStudies = [...caseStudies].sort((a, b) => {
    // First sort by featured status
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1

    // Then sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="container max-w-6xl mx-auto py-12 md:py-24 lg:py-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">SEO Case Studies</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Explore how I've helped businesses improve their online visibility and grow their customer base through
          effective SEO strategies.
        </p>
      </div>

      <div id="case-studies-grid" className="mt-12">
        {sortedCaseStudies.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedCaseStudies.map((study) => (
              <div key={study.id} className="rounded-lg border p-6">
                <h2 className="text-xl font-bold">{study.title}</h2>
                <p className="mt-2 text-muted-foreground">{study.description}</p>
                <div className="mt-4">
                  <Button asChild>
                    <Link href={`/seo-case-studies/${study.id}`}>View Case Study</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-medium">No case studies found</h2>
            <p className="mt-2 text-muted-foreground">Case studies will be added through the admin panel.</p>
            <Button asChild className="mt-6">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

