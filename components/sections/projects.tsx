"use client"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import Link from "next/link"
import { StaggeredList, StaggeredItem } from "@/components/motion"
import { FileText } from "lucide-react"
import type { Project } from "@/types"

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  // Sort projects: featured first, then by creation date (newest first)
  const sortedProjects = [...projects].sort((a, b) => {
    // First sort by featured status
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1

    // Then sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  // Only show up to 3 projects
  const featuredProjects = sortedProjects.slice(0, 3)

  return (
    // Rest of the component remains the same
    <section className="container py-12 md:py-24 lg:py-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Check out some of my recent web design and development work.
        </p>
      </div>
      <div className="mt-12">
        {featuredProjects.length > 0 ? (
          <StaggeredList className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <StaggeredItem key={project.id}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  link={project.id} // Pass the ID as the link for internal routing
                />
              </StaggeredItem>
            ))}
          </StaggeredList>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No featured projects yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">Check back soon to see our featured projects.</p>
          </div>
        )}
      </div>
      <div className="mt-12 flex justify-center">
        <Button asChild>
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>
    </section>
  )
}

