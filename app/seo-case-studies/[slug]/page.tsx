import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Building2, TrendingUp, Calendar, CheckCircle } from "lucide-react"
import { notFound } from "next/navigation"
import { readFile } from "fs/promises"
import { join } from "path"
import type { CaseStudy } from "@/types"
import { generateSEO } from "@/lib/seo"
import { generateCaseStudyStructuredData } from "@/lib/structured-data"
import Script from "next/script"
import { getGoogleDriveImageUrl } from "@/lib/utils"

interface CaseStudyPageProps {
  params: {
    slug: string
  }
}

async function getCaseStudy(id: string): Promise<CaseStudy | null> {
  try {
    const fileContents = await readFile(join(process.cwd(), "data", "case-studies.json"), "utf8")
    const caseStudies = JSON.parse(fileContents)
    return caseStudies.find((cs: CaseStudy) => cs.id === id) || null
  } catch (error) {
    console.error("Error reading case study:", error)
    return null
  }
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = await getCaseStudy(params.slug)

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
      description: "The case study you're looking for doesn't exist",
    }
  }

  return generateSEO({
    title: caseStudy.title,
    description: caseStudy.description,
    path: `/seo-case-studies/${params.slug}`,
    image: caseStudy.image,
    type: "article",
    publishedAt: caseStudy.createdAt,
    updatedAt: caseStudy.updatedAt,
    keywords: [caseStudy.industry, "SEO", "Case Study", "Success Story"],
  })
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = await getCaseStudy(params.slug)

  if (!caseStudy) {
    notFound()
  }

  // Format date for display
  const publishDate = new Date(caseStudy.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Process image URL (handle Google Drive URLs)
  const imageUrl = caseStudy.image.includes("drive.google.com")
    ? getGoogleDriveImageUrl(caseStudy.image)
    : caseStudy.image

  // Generate structured data
  const structuredData = generateCaseStudyStructuredData(caseStudy)

  return (
    <>
      <Script
        id="case-study-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="container py-12 md:py-24 lg:py-32">
        <Button variant="ghost" asChild className="mb-8 group">
          <Link href="/seo-case-studies">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            Back to Case Studies
          </Link>
        </Button>
        <div className="mx-auto max-w-3xl">
          <div className="aspect-video overflow-hidden rounded-lg border">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={`Case study: ${caseStudy.title}`}
              width={1200}
              height={675}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="mt-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              <span>Industry: {caseStudy.industry}</span>
              <span className="mx-2">•</span>
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={new Date(caseStudy.createdAt).toISOString()}>{publishDate}</time>
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{caseStudy.title}</h1>

            {caseStudy.results && caseStudy.results[0] && (
              <div className="mt-4 inline-flex items-center rounded-lg bg-primary/10 px-4 py-2 text-primary">
                <TrendingUp className="mr-2 h-4 w-4" aria-hidden="true" />
                <span className="font-medium">
                  {caseStudy.results[0].value} {caseStudy.results[0].metric}
                </span>
              </div>
            )}

            <div className="mt-12 space-y-12">
              <section aria-labelledby="challenge-heading">
                <h2 id="challenge-heading" className="text-2xl font-bold flex items-center">
                  <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-1 mr-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  </span>
                  Challenge
                </h2>
                <p className="mt-4 text-muted-foreground">{caseStudy.challenge}</p>
              </section>

              <section aria-labelledby="solution-heading">
                <h2 id="solution-heading" className="text-2xl font-bold flex items-center">
                  <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-1 mr-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  </span>
                  Solution
                </h2>
                <p className="mt-4 text-muted-foreground">{caseStudy.solution}</p>
              </section>

              <section aria-labelledby="results-heading">
                <h2 id="results-heading" className="text-2xl font-bold flex items-center">
                  <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-1 mr-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  </span>
                  Results
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {Array.isArray(caseStudy.results) &&
                    caseStudy.results.map((result, index) => (
                      <div key={index} className="rounded-lg border p-4 flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-2xl font-bold text-primary">{result.value}</p>
                          <p className="text-sm text-muted-foreground">{result.metric}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </section>

              {caseStudy.content && (
                <section aria-labelledby="details-heading">
                  <h2 id="details-heading" className="text-2xl font-bold flex items-center">
                    <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-1 mr-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    </span>
                    Details
                  </h2>
                  <div className="mt-4 prose prose-gray dark:prose-invert max-w-none">{caseStudy.content}</div>
                </section>
              )}
            </div>

            <div className="mt-12 rounded-lg bg-muted p-6">
              <h2 className="text-xl font-bold">Ready to achieve similar results?</h2>
              <p className="mt-2 text-muted-foreground">
                Let's discuss how I can help your business improve its online visibility and attract more customers.
              </p>
              <div className="mt-4">
                <Button asChild size="lg">
                  <Link
                    href={`/contact?subject=Case Study Inquiry&message=I'm interested in achieving results similar to your '${caseStudy.title}' case study.`}
                    aria-label="Get started with a similar SEO strategy"
                  >
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

