"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { isClient, safeSessionStorage } from "@/lib/environment"
import { withErrorBoundary } from "@/components/error-boundary"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

// Type for form values
type FormValues = z.infer<typeof formSchema>

function ContactFormComponent() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  // Get values from URL parameters if they exist
  const subjectParam = searchParams?.get("subject") || ""
  const messageParam = searchParams?.get("message") || ""

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: subjectParam,
      message: messageParam,
    },
  })

  // Update form values when URL parameters change
  React.useEffect(() => {
    if (mounted && searchParams) {
      form.setValue("subject", subjectParam)
      form.setValue("message", messageParam)
    }
  }, [form, mounted, messageParam, searchParams, subjectParam])

  React.useEffect(() => {
    setMounted(true)

    // Check if there was a previous submission attempt
    if (isClient) {
      const savedFormData = safeSessionStorage("contactFormData")
      if (savedFormData) {
        try {
          const parsedData = JSON.parse(savedFormData)
          form.reset(parsedData)
        } catch (e) {
          console.error("Error parsing saved form data:", e)
          safeSessionStorage("contactFormData", null)
        }
      }
    }
  }, [form])

  if (!mounted) {
    return (
      <div className="space-y-8" aria-busy="true" aria-label="Loading contact form">
        <div className="space-y-4">
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-32 w-full animate-pulse rounded-md bg-muted" />
        </div>
        <div className="h-10 w-full animate-pulse rounded-md bg-primary/50" />
      </div>
    )
  }

  async function onSubmit(values: FormValues) {
    setIsLoading(true)
    setSubmitError(null)

    // Save form data in case of error
    if (isClient) {
      safeSessionStorage("contactFormData", JSON.stringify(values))
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      if (!response.ok) {
        // Handle rate limiting specifically
        if (response.status === 429) {
          throw new Error("Too many submissions. Please try again later.")
        }

        // Handle other API errors with the error message from the server if available
        throw new Error(data.error?.message || "Failed to send message")
      }

      // Clear saved form data on success
      if (isClient) {
        safeSessionStorage("contactFormData", null)
      }

      form.reset()
      setIsSubmitted(true)
      toast.success("Message sent successfully! We'll get back to you soon.")
    } catch (error) {
      console.error("Contact form error:", error)

      // Handle abort error specifically
      if (error instanceof DOMException && error.name === "AbortError") {
        setSubmitError("Request timed out. Please try again.")
        toast.error("Request timed out. Please try again.")
        return
      }

      const errorMessage = error instanceof Error ? error.message : "Failed to send message. Please try again later."
      setSubmitError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  function handleTryAgain() {
    setIsSubmitted(false)
    setSubmitError(null)
  }

  if (isSubmitted) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-primary"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-medium">Thank you for your message!</h3>
        <p className="mt-2 text-muted-foreground">I'll get back to you as soon as possible.</p>
        <Button className="mt-6" onClick={handleTryAgain}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {submitError && (
          <div className="rounded-md bg-destructive/10 p-4 text-destructive">
            <p>{submitError}</p>
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Project Inquiry" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell me about your project..." className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <svg
                className="mr-2 h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  )
}

// Export with error boundary
export const ContactForm = withErrorBoundary(ContactFormComponent)

