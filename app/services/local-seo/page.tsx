import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Local SEO Services - Improve Your Local Search Rankings",
  description:
    "Expert local SEO services to help your business rank higher in local search results and attract more customers from your area.",
}

const features = [
  "Google Business Profile Optimization",
  "Local Keyword Research",
  "Citation Building & Management",
  "Local Content Strategy",
  "Review Management",
  "Local Link Building",
  "Website Optimization",
  "Local Schema Markup",
  "Competitor Analysis",
  "Monthly Reporting",
]

const benefits = [
  {
    title: "Increased Local Visibility",
    description: "Rank higher in local search results and Google Maps.",
  },
  {
    title: "More Quality Leads",
    description: "Attract customers actively searching for your services.",
  },
  {
    title: "Better Conversion Rates",
    description: "Convert more local searches into actual customers.",
  },
  {
    title: "Improved Reputation",
    description: "Build trust through reviews and local citations.",
  },
]

export default function LocalSEOPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Local SEO Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Dominate local search results and attract more customers from your area with our expert local SEO services.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Comprehensive Local SEO Solutions</h2>
          <p className="text-muted-foreground">
            Our local SEO services are designed to help your business stand out in local search results and attract more
            customers from your target area.
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
          <Image src="/placeholder.svg" alt="Local SEO Services" fill className="object-cover" priority />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">Benefits of Local SEO</h2>
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
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-2xl font-bold">Ready to Grow Your Local Presence?</h2>
              <p className="mt-2 text-muted-foreground">
                Get a free local SEO audit and discover how we can help your business attract more local customers.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get Free SEO Audit</Link>
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

