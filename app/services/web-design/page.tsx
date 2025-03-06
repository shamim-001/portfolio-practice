import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Web Design Services - Modern & SEO-Friendly Websites",
  description:
    "Professional web design services focused on creating beautiful, responsive, and SEO-friendly websites that drive results for your business.",
}

const features = [
  "Custom Website Design",
  "Mobile-First Responsive Design",
  "SEO-Friendly Architecture",
  "Fast Loading Speed",
  "User Experience (UX) Optimization",
  "Content Management System",
  "E-commerce Integration",
  "Website Security",
  "Analytics Integration",
  "Regular Maintenance",
]

const process = [
  {
    title: "Discovery",
    description: "Understanding your business goals, target audience, and requirements.",
  },
  {
    title: "Planning",
    description: "Creating wireframes and planning the site architecture.",
  },
  {
    title: "Design",
    description: "Developing the visual design and user interface.",
  },
  {
    title: "Development",
    description: "Building the website with clean, efficient code.",
  },
  {
    title: "Testing",
    description: "Thorough testing across devices and browsers.",
  },
  {
    title: "Launch",
    description: "Deploying your website and monitoring performance.",
  },
]

export default function WebDesignPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Web Design Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Create a stunning online presence with our professional web design services. We build beautiful, responsive
          websites that drive results.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Why Choose Our Web Design Services?</h2>
          <p className="text-muted-foreground">
            We create websites that not only look great but also perform exceptionally well. Our designs are focused on
            converting visitors into customers while ensuring the best possible user experience.
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
          <Image src="/placeholder.svg" alt="Web Design Services" fill className="object-cover" priority />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">Our Web Design Process</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((step, index) => (
            <div key={step.title} className="relative rounded-lg border p-6">
              <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Step {index + 1}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <div className="rounded-lg bg-muted p-8">
          <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
          <p className="mt-2 text-muted-foreground">
            Let's discuss your web design project and create a website that helps your business grow.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get a Free Consultation</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/projects">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

