import { ProjectForm } from "@/components/admin/project-form"
import { readFile } from "fs/promises"
import { join } from "path"
import { notFound } from "next/navigation"
import type { Project } from "@/types"

async function getProject(id: string): Promise<Project | null> {
  try {
    const fileContents = await readFile(join(process.cwd(), "data", "projects.json"), "utf8")
    const projects = JSON.parse(fileContents)
    return projects.find((p: Project) => p.id === id) || null
  } catch (error) {
    return null
  }
}

interface EditProjectPageProps {
  params: {
    id: string
  }
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Project</h1>
      <ProjectForm initialData={project} projectId={params.id} />
    </div>
  )
}

