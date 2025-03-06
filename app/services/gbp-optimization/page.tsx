import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Google Business Profile Optimization Services",
  description:
    "Expert Google Business Profile optimization services to improve your local visibility and attract more customers through Google Search and Maps.",
}

const features = [
  "Profile Optimization & Verification",
  "Keyword-Rich Business Description",
  "Photo & Video Optimization",
  "Review Management & Response",
  "Post Creation & Management",
  "Q&A Management",
  "Category & Attribute Optimization",
  "Service Area Setup",
  "Products & Services Listing",
  "Performance Tracking",
]

const benefits = [
  {
    title: "Improved Local Visibility",
    description: "Show up more prominently in Google Search and Maps.",
  },
  {
    title: "Better First Impression",
    description: "Professional profile that builds trust with potential customers.",
  },
  {
    title: "More Customer Engagement",
    description: "Increase interactions through posts, reviews, and Q&As.",
  },
  {
    title: "Higher Conversion Rate",
    description: "Turn more searches into calls, visits, and customers.",
  },
]

export default function GBPOptimizationPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Google Business Profile Optimization
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Maximize your local presence with expert Google Business Profile optimization services.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Comprehensive GBP Management</h2>
          <p className="text-muted-foreground">
            Our Google Business Profile optimization services ensure your business stands out in local search results
            and attracts more customers.
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
          <Image
            src="/placeholder.svg"
            alt="Google Business Profile Optimization"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">Benefits of GBP Optimization</h2>
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
            <MapPin className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-2xl font-bold">Ready to Improve Your Local Presence?</h2>
              <p className="mt-2 text-muted-foreground">
                Get a free GBP audit and discover how we can help your business stand out in local search results.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get Free GBP Audit</Link>
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

