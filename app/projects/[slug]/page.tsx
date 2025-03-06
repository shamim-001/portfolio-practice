import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react"
import { notFound } from "next/navigation"
import { readFile } from "fs/promises"
import { join } from "path"
import type { Project } from "@/types"
import { generateSEO } from "@/lib/seo"
import { generateProjectStructuredData } from "@/lib/structured-data"
import Script from "next/script"
import { getGoogleDriveImageUrl } from "@/lib/utils"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

async function getProject(id: string): Promise<Project | null> {
  try {
    const fileContents = await readFile(join(process.cwd(), "data", "projects.json"), "utf8")
    const projects = JSON.parse(fileContents)
    return projects.find((p: Project) => p.id === id) || null
  } catch (error) {
    console.error("Error reading project:", error)
    return null
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The project you're looking for doesn't exist",
    }
  }

  return generateSEO({
    title: project.title,
    description: project.description,
    path: `/projects/${params.slug}`,
    image: project.image,
    type: "article",
    publishedAt: project.createdAt,
    updatedAt: project.updatedAt,
    keywords: project.tags,
  })
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  // Format dates for better display
  const createdDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const updatedDate = new Date(project.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Process image URL (handle Google Drive URLs)
  const imageUrl = project.image.includes("drive.google.com") ? getGoogleDriveImageUrl(project.image) : project.image

  // Generate structured data
  const structuredData = generateProjectStructuredData(project)

  return (
    <>
      <Script
        id="project-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="container py-12 md:py-24 lg:py-32">
        <Button variant="ghost" asChild className="mb-8 group">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            Back to Projects
          </Link>
        </Button>
        <div className="mx-auto max-w-4xl">
          <div className="aspect-video overflow-hidden rounded-lg border">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={project.title}
              width={1200}
              height={675}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" aria-hidden="true" />
                <time dateTime={new Date(project.createdAt).toISOString()}>{createdDate}</time>
              </div>
              <div className="flex items-center">
                <Tag className="mr-1 h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Tags:</span>
                <span>
                  {project.tags.slice(0, 3).join(", ")}
                  {project.tags.length > 3 ? "..." : ""}
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{project.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{project.description}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Project Overview</h2>
                <p className="text-muted-foreground">
                  This project showcases my expertise in {project.tags.slice(0, 3).join(", ")}. It was designed to
                  provide an exceptional user experience while meeting all the client's requirements.
                </p>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Responsive design for all devices</li>
                    <li>Optimized for performance and SEO</li>
                    <li>Intuitive user interface</li>
                    <li>Accessible to all users</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Project Details</h2>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Technologies Used</h3>
                    <p>{project.tags.join(", ")}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Project Timeline</h3>
                    <p>Created: {createdDate}</p>
                    {project.updatedAt && project.updatedAt !== project.createdAt && <p>Last Updated: {updatedDate}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.title} website`}
                >
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                  Visit Live Site
                </a>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link
                  href={`/contact?subject=Project Inquiry&message=I'm interested in a project similar to your '${project.title}' work.`}
                  aria-label="Request a similar project"
                >
                  Request Similar Project
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

