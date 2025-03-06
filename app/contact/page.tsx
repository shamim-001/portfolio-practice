import { ContactForm } from "@/components/contact-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Let's Work Together",
  description: "Get in touch to discuss your web design and SEO needs.",
}

export default function ContactPage() {
  return (
    <div className="container max-w-6xl mx-auto py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[800px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Let's Work Together</h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Have a project in mind? Get in touch and let's discuss how I can help your business grow online.
          </p>
        </div>
        <div className="mt-12">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

