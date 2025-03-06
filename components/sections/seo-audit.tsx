"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  websiteUrl: z.string().url({
    message: "Please enter a valid website URL.",
  }),
})

const auditFeatures = [
  "Technical SEO Analysis",
  "Content Optimization Review",
  "Mobile-Friendly Check",
  "Page Speed Insights",
  "Competitor Analysis",
  "Keyword Opportunities",
]

export function SEOAuditSection() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteUrl: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Construct the query parameters for the contact page
      const queryParams = new URLSearchParams({
        subject: "Free SEO Audit Request",
        message: `I would like to request a free SEO audit for my website: ${values.websiteUrl}`,
      }).toString()

      // Show success message
      toast.success("Redirecting to contact form...")

      // Short delay to allow the toast to be seen
      setTimeout(() => {
        // Navigate to the contact page with the pre-filled form
        router.push(`/contact?${queryParams}`)
      }, 1000)
    } catch (error) {
      console.error("Error:", error)
      toast.error("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <section className="container py-12 md:py-24 lg:py-32 bg-muted/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="grid gap-8 lg:grid-cols-2"
      >
        <div className="flex flex-col justify-center space-y-4">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-2 text-primary w-12 h-12">
            <Search className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get Your Free SEO Audit</h2>
          <p className="text-lg text-muted-foreground max-w-[600px]">
            Discover how your website performs in search results and get actionable insights to improve your rankings.
          </p>
          <div className="grid gap-4 mt-4">
            {auditFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Request Free SEO Audit"
                )}
              </Button>
            </form>
          </Form>
          <p className="mt-4 text-sm text-muted-foreground text-center">
            Get your detailed SEO analysis within 24 hours
          </p>
        </Card>
      </motion.div>
    </section>
  )
}

