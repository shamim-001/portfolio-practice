"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const skills = ["Web Design", "Local SEO", "UI/UX Design", "Technical SEO"]

export function AboutSection() {
  return (
    <section className="container py-12 md:py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="grid gap-12 lg:grid-cols-2 lg:gap-16"
      >
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            With over 5 years of experience in web design and SEO, I specialize in creating beautiful, functional
            websites that drive results. My approach combines creative design with data-driven SEO strategies to help
            businesses succeed online.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center rounded-lg border bg-background p-4">
                <span className="text-sm font-medium">{skill}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/about">
                Learn More About Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-xl md:mx-auto md:max-w-[500px]">
            <Image
              src="/placeholder.svg"
              alt="About Shamim Ahsan"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden h-72 w-72 rounded-xl border bg-muted lg:block" />
        </div>
      </motion.div>
    </section>
  )
}

