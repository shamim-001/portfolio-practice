import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"
import type { Project, CaseStudy } from "@/types"

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://shamimahsan.com"

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/services/web-design",
    "/services/local-seo",
    "/services/gbp-optimization",
    "/services/technical-seo",
    "/projects",
    "/seo-case-studies",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ]

  // Dynamic routes from projects
  let projectRoutes: string[] = []
  try {
    const projectsFile = join(process.cwd(), "data", "projects.json")
    const fileContents = await readFile(projectsFile, "utf8")
    const projects: Project[] = JSON.parse(fileContents)
    projectRoutes = projects.map((project) => `/projects/${project.id}`)
  } catch (error) {
    console.error("Error reading projects for sitemap:", error)
  }

  // Dynamic routes from case studies
  let caseStudyRoutes: string[] = []
  try {
    const caseStudiesFile = join(process.cwd(), "data", "case-studies.json")
    const fileContents = await readFile(caseStudiesFile, "utf8")
    const caseStudies: CaseStudy[] = JSON.parse(fileContents)
    caseStudyRoutes = caseStudies.map((study) => `/seo-case-studies/${study.id}`)
  } catch (error) {
    console.error("Error reading case studies for sitemap:", error)
  }

  // Combine all routes
  const allRoutes = [...staticRoutes, ...projectRoutes, ...caseStudyRoutes]

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${route === "" ? "daily" : "weekly"}</changefreq>
    <priority>${route === "" ? "1.0" : "0.8"}</priority>
  </url>
  `,
    )
    .join("")}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}

