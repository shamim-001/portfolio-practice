import type { Metadata } from "next"
import { ServiceCard } from "@/components/service-card"
import { SEOAuditSection } from "@/components/sections/seo-audit"
import { Code2, Globe, Search, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Services - Web Design & SEO",
  description: "Professional web design and local SEO services to help your business grow online.",
}

const services = [
  {
    id: "web-design",
    title: "Web Design",
    description: "Custom website design that looks great and drives results.",
    icon: Code2,
    features: [
      "Custom Design & Development",
      "Responsive & Mobile-First",
      "SEO-Friendly Structure",
      "Fast Loading Speed",
      "Content Management System",
      "Security & Maintenance",
    ],
    link: "/services/web-design",
  },
  {
    id: "local-seo",
    title: "Local SEO",
    description: "Improve your local search visibility and attract more customers.",
    icon: Search,
    features: [
      "Google Business Profile Optimization",
      "Local Keyword Research",
      "Citation Building & Management",
      "Review Management",
      "Local Content Strategy",
      "Competitor Analysis",
    ],
    link: "/services/local-seo",
  },
  {
    id: "gbp-optimization",
    title: "GBP Optimization",
    description: "Maximize your Google Business Profile performance.",
    icon: MapPin,
    features: [
      "Profile Optimization",
      "Photo & Video Management",
      "Review Management",
      "Post Creation & Publishing",
      "Q&A Management",
      "Performance Tracking",
    ],
    link: "/services/gbp-optimization",
  },
  {
    id: "technical-seo",
    title: "Technical SEO",
    description: "Optimize your website's technical foundation for better rankings.",
    icon: Globe,
    features: [
      "Site Architecture Optimization",
      "Core Web Vitals",
      "Mobile Optimization",
      "Schema Markup",
      "Speed Optimization",
      "Technical Audits",
    ],
    link: "/services/technical-seo",
  },
]

export default function ServicesPage() {
  return (
    <>
      <div className="container max-w-6xl mx-auto py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Services</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Professional web design and SEO services to help your business grow online.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.id} id={service.id}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
      <SEOAuditSection />
    </>
  )
}

