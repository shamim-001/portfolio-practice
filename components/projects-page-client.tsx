"use client"

import { useState, useEffect } from "react"
import { ProjectCard } from "@/components/project-card"
import { FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/types"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

// Main component with Suspense boundary
export function ProjectsPageClient({ initialProjects }: { initialProjects: Project[] }) {
  return (
    <Suspense fallback={<ProjectsLoadingSkeleton />}>
      <ProjectsContent initialProjects={initialProjects} />
    </Suspense>
  )
}

// Loading skeleton component
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

// Content component that uses client hooks
function ProjectsContent({ initialProjects }: { initialProjects: Project[] }) {
  const searchParams = useSearchParams()
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(initialProjects)
  const [categories, setCategories] = useState<string[]>(["All"])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Extract unique categories from projects
  useEffect(() => {
    const allCategories = initialProjects.flatMap((project) => project.categories || [])
    const uniqueCategories = ["All", ...Array.from(new Set(allCategories))]
    setCategories(uniqueCategories)
  }, [initialProjects])

  // Filter projects when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(
        projects.filter((project) => project.categories && project.categories.includes(selectedCategory)),
      )
    }
  }, [selectedCategory, projects])

  // Check for category in URL on initial load
  useEffect(() => {
    const categoryParam = searchParams?.get("category")
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [categories, searchParams])

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    // Update URL with query parameter for better SEO and sharing
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      if (category === "All") {
        url.searchParams.delete("category")
      } else {
        url.searchParams.set("category", category)
      }
      window.history.pushState({}, "", url.toString())
    }
  }

  if (error) {
    return (
      <div className="container max-w-6xl mx-auto py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h1>
          <p className="max-w-[700px] text-lg text-destructive">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 md:py-24 lg:py-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Explore my latest web design and development projects.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter projects by category">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
            onClick={() => handleCategoryClick(category)}
            role="tab"
            aria-selected={selectedCategory === category}
            aria-controls="projects-grid"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handleCategoryClick(category)
              }
            }}
          >
            {category}
          </Badge>
        ))}
      </div>

      <div
        id="projects-grid"
        className="mt-12"
        role="tabpanel"
        aria-labelledby={`${selectedCategory.toLowerCase()}-tab`}
      >
        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                link={project.id}
                tags={project.tags}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-medium">
              {projects.length === 0 ? "No projects found" : "No projects match the selected category"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {projects.length === 0
                ? "Projects will be added through the admin panel."
                : "Try selecting a different category."}
            </p>
            {projects.length > 0 && selectedCategory !== "All" && (
              <Button variant="outline" className="mt-4" onClick={() => handleCategoryClick("All")}>
                Show All Projects
              </Button>
            )}
            <Button asChild className="mt-6">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Add missing import
import { Skeleton } from "@/components/ui/skeleton"

