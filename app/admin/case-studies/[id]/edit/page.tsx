import { CaseStudyForm } from "@/components/admin/case-study-form"
import { readFile } from "fs/promises"
import { join } from "path"
import { notFound } from "next/navigation"
import type { CaseStudy } from "@/types"

async function getCaseStudy(id: string): Promise<CaseStudy | null> {
  try {
    const fileContents = await readFile(join(process.cwd(), "data", "case-studies.json"), "utf8")
    const caseStudies = JSON.parse(fileContents)
    return caseStudies.find((cs: CaseStudy) => cs.id === id) || null
  } catch (error) {
    return null
  }
}

interface EditCaseStudyPageProps {
  params: {
    id: string
  }
}

export default async function EditCaseStudyPage({ params }: EditCaseStudyPageProps) {
  const caseStudy = await getCaseStudy(params.id)

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Case Study</h1>
      <CaseStudyForm initialData={caseStudy} caseStudyId={params.id} />
    </div>
  )
}

