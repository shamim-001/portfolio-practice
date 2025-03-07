import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { ProjectsSection } from "@/components/sections/projects"
import { SEOAuditSection } from "@/components/sections/seo-audit"
import { CaseStudiesSection } from "@/components/sections/case-studies"
import { BlogSection } from "@/components/sections/blog"
import { ContactSection } from "@/components/sections/contact"
import { getAllPosts } from "@/lib/posts"
import { AnimatedSection } from "@/components/animated-section"
import { readFile } from "fs/promises"
import { join } from "path"
import type { Project, CaseStudy } from "@/types"
import { Spacer } from "@/components/ui/spacer"

async function getProjects(): Promise<Project[]> {
  try {
    const fileContents = await readFile(join(process.cwd(), "data", "projects.json"), "utf8")
    let projects: Project[] = JSON.parse(fileContents)
    // Sort projects: featured first, then by date descending
    projects = projects.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    return projects
  } catch (error) {
    console.error("Error reading projects:", error)
    return []
  }
}

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const fileContents = await readFile(join(process.cwd(), "data", "case-studies.json"), "utf8")
    let caseStudies: CaseStudy[] = JSON.parse(fileContents)
    // Sort case studies: featured first, then by date descending
    caseStudies = caseStudies.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    return caseStudies
  } catch (error) {
    console.error("Error reading case studies:", error)
    return []
  }
}

export default async function Page() {
  // Use Promise.allSettled to prevent one failed promise from affecting others
  const results = await Promise.allSettled([getAllPosts(), getProjects(), getCaseStudies()])

  // Extract values with proper defaults
  const posts = results[0].status === "fulfilled" ? results[0].value : []
  const projects = results[1].status === "fulfilled" ? results[1].value : []
  const caseStudies = results[2].status === "fulfilled" ? results[2].value : []

  return (
    <>
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <AboutSection />
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <ProjectsSection projects={projects} />
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <SEOAuditSection />
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <CaseStudiesSection caseStudies={caseStudies} />
      </AnimatedSection>

      <AnimatedSection delay={0.6}>
        <BlogSection posts={posts} className="pb-0" />
      </AnimatedSection>

      <Spacer size="sm" />

      <AnimatedSection delay={0.7}>
        <ContactSection className="pt-0" />
      </AnimatedSection>
    </>
  )
}

