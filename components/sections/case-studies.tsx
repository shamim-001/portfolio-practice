"use client"

import { Button } from "@/components/ui/button"
import { CaseStudyCard } from "@/components/case-study-card"
import { motion } from "framer-motion"
import Link from "next/link"
import { BarChart3, FileText } from "lucide-react"
import type { CaseStudy } from "@/types"

interface CaseStudiesSectionProps {
  caseStudies?: CaseStudy[]
}

export function CaseStudiesSection({ caseStudies = [] }: CaseStudiesSectionProps) {
  // Sort case studies: featured first, then by creation date (newest first)
  const sortedCaseStudies = [...caseStudies].sort((a, b) => {
    // First sort by featured status
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1

    // Then sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  // Only show up to 3 case studies
  const featuredCaseStudies = sortedCaseStudies.slice(0, 3)

  return (
    <section className="container py-12 md:py-16 lg:py-20 bg-muted/30">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-2 text-primary">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured SEO Case Studies</h2>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Real results from real clients. See how my SEO strategies have helped businesses improve their online
            visibility and grow their customer base.
          </p>
        </div>
        <div className="mt-12">
          {featuredCaseStudies.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredCaseStudies.map((study) => (
                <CaseStudyCard
                  key={study.id}
                  id={study.id}
                  title={study.title}
                  description={study.description}
                  image={study.image}
                  industry={study.industry}
                  results={study.results}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No featured case studies yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">Check back soon to see our featured case studies.</p>
            </div>
          )}
        </div>
        <div className="mt-12 flex justify-center">
          <Button asChild>
            <Link href="/seo-case-studies">View All Case Studies</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

