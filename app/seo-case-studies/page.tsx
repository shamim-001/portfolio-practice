"use client"

import { useState, useEffect, useCallback } from "react"
import { CaseStudyCard } from "@/components/case-study-card"
import { FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { CaseStudy } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import Head from "next/head"

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudy[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCaseStudies = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/case-studies", {
        headers: {
          "Cache-Control": "no-store",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch case studies: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      // Sort case studies: featured first, then by creation date (newest first)
      const sortedCaseStudies = [...data].sort((a, b) => {
        // First sort by featured status
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1

        // Then sort by creation date (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })

      setCaseStudies(sortedCaseStudies)
      setFilteredCaseStudies(sortedCaseStudies)

      // Extract unique categories
      const allCategories = sortedCaseStudies.flatMap((study) => study.categories || [])
      const uniqueCategories = ["All", ...Array.from(new Set(allCategories))]
      setCategories(uniqueCategories)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error fetching case studies:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCaseStudies()
  }, [fetchCaseStudies])

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredCaseStudies(caseStudies)
    } else {
      setFilteredCaseStudies(
        caseStudies.filter((study) => study.categories && study.categories.includes(selectedCategory)),
      )
    }
  }, [selectedCategory, caseStudies])

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    // Update URL with query parameter for better SEO and sharing
    const url = new URL(window.location.href)
    if (category === "All") {
      url.searchParams.delete("category")
    } else {
      url.searchParams.set("category", category)
    }
    window.history.pushState({}, "", url.toString())
  }

  // Check for category in URL on initial load
  useEffect(() => {
    const url = new URL(window.location.href)
    const categoryParam = url.searchParams.get("category")
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [categories])

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">SEO Case Studies</h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Explore how I've helped businesses improve their online visibility and grow their customer base.
          </p>
        </div>

        {/* Skeleton for category filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>

        {/* Skeleton for case studies */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col space-y-3">
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

  if (error) {
    return (
      <div className="container max-w-6xl mx-auto py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">SEO Case Studies</h1>
          <p className="max-w-[700px] text-lg text-destructive">Error: {error}</p>
          <Button onClick={() => fetchCaseStudies()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>SEO Case Studies - Real Results</title>
        <meta name="description" content="Explore real-world SEO success stories and results from my client work." />
      </Head>
      <div className="container max-w-6xl mx-auto py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">SEO Case Studies</h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Explore how I've helped businesses improve their online visibility and grow their customer base through
            effective SEO strategies.
          </p>
        </div>

        {/* Category Filter */}
        <div
          className="mt-8 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filter case studies by category"
        >
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
              onClick={() => handleCategoryClick(category)}
              role="tab"
              aria-selected={selectedCategory === category}
              aria-controls="case-studies-grid"
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
          id="case-studies-grid"
          className="mt-12"
          role="tabpanel"
          aria-labelledby={`${selectedCategory.toLowerCase()}-tab`}
        >
          {filteredCaseStudies.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCaseStudies.map((study) => (
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
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <FileText className="h-16 w-16 text-muted-foreground" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-medium">
                {caseStudies.length === 0 ? "No case studies found" : "No case studies match the selected category"}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {caseStudies.length === 0
                  ? "Case studies will be added through the admin panel."
                  : "Try selecting a different category."}
              </p>
              {caseStudies.length > 0 && selectedCategory !== "All" && (
                <Button variant="outline" className="mt-4" onClick={() => handleCategoryClick("All")}>
                  Show All Case Studies
                </Button>
              )}
              <Button asChild className="mt-6">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

