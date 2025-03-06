import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Code2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Technical SEO Services - Optimize Your Website's Performance",
  description:
    "Expert technical SEO services to improve your website's performance, crawlability, and search engine rankings through advanced optimization techniques.",
}

const features = [
  "Site Architecture Optimization",
  "Core Web Vitals Optimization",
  "Mobile Optimization",
  "Schema Markup Implementation",
  "XML Sitemap Generation",
  "Robots.txt Configuration",
  "Page Speed Optimization",
  "Security & SSL Implementation",
  "Crawl Error Resolution",
  "Technical SEO Audits",
]

const benefits = [
  {
    title: "Better Search Rankings",
    description: "Improve your website's visibility in search results.",
  },
  {
    title: "Faster Loading Speed",
    description: "Enhance user experience with optimized performance.",
  },
  {
    title: "Improved Crawlability",
    description: "Help search engines better understand your content.",
  },
  {
    title: "Mobile Optimization",
    description: "Ensure great performance across all devices.",
  },
]

export default function TechnicalSEOPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Technical SEO Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Optimize your website's technical foundation to improve search engine rankings and user experience.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Comprehensive Technical SEO Solutions</h2>
          <p className="text-muted-foreground">
            Our technical SEO services ensure your website meets modern SEO standards and performs optimally in search
            results.
          </p>
          <ul className="grid gap-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image src="/placeholder.svg" alt="Technical SEO Services" fill className="object-cover" priority />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">Benefits of Technical SEO</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-lg border p-6">
              <h3 className="text-xl font-bold">{benefit.title}</h3>
              <p className="mt-2 text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <div className="rounded-lg bg-muted p-8">
          <div className="flex items-center gap-4">
            <Code2 className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-2xl font-bold">Ready to Improve Your Technical SEO?</h2>
              <p className="mt-2 text-muted-foreground">
                Get a comprehensive technical SEO audit and discover how we can help improve your website's performance.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get Technical SEO Audit</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/seo-case-studies">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

