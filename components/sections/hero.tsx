"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-background" aria-label="Hero section">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
      </div>

      <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 py-12 md:py-16 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex max-w-[800px] flex-col items-center text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground"
          >
            Available for freelance work
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="mt-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Web Designer &
            <span className="block bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Local SEO Expert
            </span>
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-6 max-w-[600px] text-lg text-muted-foreground sm:text-xl">
            I help businesses grow their online presence through beautiful websites and effective local SEO strategies.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact">
                Work with Me
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">View My Work</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

