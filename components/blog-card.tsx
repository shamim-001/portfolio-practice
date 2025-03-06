"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { motion } from "framer-motion"

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  image: string
  slug: string
}

export function BlogCard({ title, excerpt, date, image, slug }: BlogCardProps) {
  // Format date for better accessibility
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="h-full">
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="aspect-video relative">
          <Image
            src={image || "/placeholder.svg"}
            alt=""
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            aria-hidden="true"
          />
        </div>
        <CardContent className="p-6 flex-grow">
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <time dateTime={new Date(date).toISOString()}>{formattedDate}</time>
          </div>
          <h3 className="mt-2 text-2xl font-bold line-clamp-2">{title}</h3>
          <p className="mt-2 text-foreground/80 line-clamp-3">{excerpt}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0 mt-auto">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/blog/${slug}`}>Read More</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

