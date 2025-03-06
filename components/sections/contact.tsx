"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, MessageSquare } from "lucide-react"

export function ContactSection() {
  return (
    <section className="container pt-0 pb-12 md:pt-0 md:pb-24 lg:pt-0 lg:pb-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Let's Work Together</h2>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Have a project in mind? Let's discuss how I can help your business grow online.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="https://wa.me/8801749181410" target="_blank" rel="noopener noreferrer">
              <MessageSquare className="mr-2 h-4 w-4" />
              Schedule a Call
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

