import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Github, Linkedin, Mail, Twitter, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "About - Shamim Ahsan",
  description:
    "Learn more about Shamim Ahsan, a web designer and local SEO expert helping businesses grow their online presence.",
}

const skills = [
  {
    category: "Design",
    items: ["Web Design", "UI/UX Design", "Responsive Design", "WordPress Development"],
  },
  {
    category: "SEO",
    items: ["Local SEO", "Technical SEO", "Content Strategy", "Link Building"],
  },
  {
    category: "Tools",
    items: ["Google Analytics", "Google Search Console", "SEMrush", "Ahrefs"],
  },
]

export default function AboutPage() {
  return (
    <div className="container max-w-6xl mx-auto py-12 md:py-16 lg:py-20">
      <div className="grid gap-12 md:gap-16 lg:grid-cols-[1fr_400px]">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Hi, I'm Shamim Ahsan, a passionate web designer and local SEO expert with over 5 years of experience in
              helping businesses establish and grow their online presence.
            </p>
            <p>
              I specialize in creating beautiful, functional websites that not only look great but also drive results.
              My approach combines creative design with data-driven SEO strategies to help businesses succeed in the
              digital landscape.
            </p>
            <p>
              When I'm not designing websites or optimizing for search engines, I enjoy writing about web design and SEO
              on my blog, helping others learn and grow in the field.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Skills & Expertise</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.category} className="space-y-3">
                    <h3 className="font-semibold text-primary">{skillGroup.category}</h3>
                    <ul className="space-y-2">
                      {skillGroup.items.map((skill) => (
                        <li key={skill} className="flex items-center gap-2 text-muted-foreground">
                          <Check className="h-4 w-4 text-primary" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Connect With Me</h2>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" asChild>
                  <Link href="https://github.com" target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="https://twitter.com" target="_blank" rel="noreferrer">
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="https://linkedin.com" target="_blank" rel="noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="mailto:hello@example.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg"
                alt="Shamim Ahsan"
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden h-72 w-72 rounded-xl border bg-muted lg:block" />
          </div>
          <Button className="w-full" size="lg" asChild>
            <Link href="/contact">Work with Me</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

