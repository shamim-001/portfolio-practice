import type { Project } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import { readFile } from "fs/promises"
import { join } from "path"
import { PageClientWrapper } from "@/components/page-client-wrapper"
import { ProjectsPageClient } from "@/components/projects-page-client"

// Server component to fetch data
async function getProjects(): Promise<Project[]> {
  try {
    const fileContents = await readFile(join(process.cwd(), "data", "projects.json"), "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return []
    }
    console.error("Error reading projects:", error)
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <PageClientWrapper fallback={<ProjectsLoadingSkeleton />}>
      <ProjectsPageClient initialProjects={projects} />
    </PageClientWrapper>
  )
}

function ProjectsLoadingSkeleton() {
  return (
    <div className="container max-w-6xl mx-auto py-12 md:py-24 lg:py-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Explore my latest web design and development projects.
        </p>
      </div>

      {/* Skeleton for category filters */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>

      {/* Skeleton for projects */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

