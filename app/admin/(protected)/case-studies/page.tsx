import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Pencil } from "lucide-react"
import { readFile } from "fs/promises"
import { join } from "path"
import type { CaseStudy } from "@/types"
import { DeleteCaseStudyButton } from "@/components/admin/delete-case-study-button"
import { Badge } from "@/components/ui/badge"

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const fileContents = await readFile(join(process.cwd(), "data", "case-studies.json"), "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return []
    }
    throw error
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Case Studies</h1>
        <Button asChild>
          <Link href="/admin/case-studies/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Case Study
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCaseStudies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No case studies found. Create your first case study.
                </TableCell>
              </TableRow>
            ) : (
              sortedCaseStudies.map((study) => (
                <TableRow key={study.id}>
                  <TableCell className="font-medium">{study.title}</TableCell>
                  <TableCell>{study.industry}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {study.categories && study.categories.length > 0 ? (
                        study.categories.map((category) => (
                          <Badge key={category} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-xs">None</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{study.featured ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                        <Link href={`/admin/case-studies/${study.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <DeleteCaseStudyButton id={study.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

