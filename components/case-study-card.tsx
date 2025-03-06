"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2 } from "lucide-react"
import { motion } from "framer-motion"
import { getGoogleDriveImageUrl } from "@/lib/utils"

interface CaseStudyCardProps {
  id: string
  title: string
  description: string
  image: string
  industry: string
  results?: { value: string; metric: string }[]
}

export function CaseStudyCard({ id, title, description, image, industry, results = [] }: CaseStudyCardProps) {
  // Process image URL (handle Google Drive URLs)
  const imageUrl = image.includes("drive.google.com") ? getGoogleDriveImageUrl(image) : image

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="h-full" tabIndex={0}>
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="aspect-video relative">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={`Case study thumbnail: ${title}`}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
        <CardContent className="p-6 flex-grow">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" aria-hidden="true" />
            <span>{industry}</span>
          </div>
          <h3 className="mt-2 text-2xl font-bold line-clamp-2">{title}</h3>
          <p className="mt-2 text-muted-foreground line-clamp-3">{description}</p>
          {results && results.length > 0 && (
            <div className="mt-4 rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {results[0].value} {results[0].metric}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-6 pt-0 mt-auto">
          <Button asChild>
            <Link href={`/seo-case-studies/${id}`} aria-label={`View case study: ${title}`}>
              View Case Study
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

