"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { fadeIn } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        ...fadeIn,
        visible: {
          ...fadeIn.visible,
          transition: {
            ...fadeIn.visible.transition,
            delay,
          },
        },
      }}
      className={cn("", className)}
    >
      {children}
    </motion.section>
  )
}

