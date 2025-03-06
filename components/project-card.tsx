"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { prefersReducedMotion } from "@/lib/environment"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
  tags?: string[]
}

export function ProjectCard({ title, description, image, link, tags }: ProjectCardProps) {
  // Disable animations if user prefers reduced motion
  const shouldReduceMotion = prefersReducedMotion()

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
      tabIndex={0}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="aspect-video relative">
          <ImageWithFallback
            src={image || "/placeholder.svg"}
            alt={`Project thumbnail: ${title}`}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
        <CardContent className="p-6 flex-grow">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="mt-2 text-muted-foreground line-clamp-3">{description}</p>
          {tags && tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-6 pt-0 mt-auto">
          <div className="flex gap-2 w-full">
            <Button asChild className="flex-1">
              <Link href={`/projects/${link}`} aria-label={`View details for ${title}`}>
                View Details
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild className="shrink-0">
              <a
                href={typeof link === "string" && link.startsWith("http") ? link : `https://example.com`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${title} website`}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

