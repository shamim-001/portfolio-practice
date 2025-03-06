"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import Image from "next/image"
import { Upload, X } from "lucide-react"
import type { CaseStudy } from "@/types"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image is required"),
  industry: z.string().min(1, "Industry is required"),
  challenge: z.string().min(1, "Challenge is required"),
  solution: z.string().min(1, "Solution is required"),
  results: z.array(
    z.object({
      metric: z.string(),
      value: z.string(),
    }),
  ),
  categories: z.array(z.string()).default([]),
  featured: z.boolean(),
  content: z.string().min(1, "Content is required"),
})

interface CaseStudyFormProps {
  initialData?: CaseStudy
  caseStudyId?: string
}

export function CaseStudyForm({ initialData, caseStudyId }: CaseStudyFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(initialData?.image || "")
  const [categoryInput, setCategoryInput] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      image: "",
      industry: "",
      challenge: "",
      solution: "",
      results: [{ metric: "", value: "" }],
      categories: [],
      featured: false,
      content: "",
    },
  })

  const categories = form.watch("categories")

  const addCategory = () => {
    if (!categoryInput.trim()) return

    // Prevent duplicates
    if (!categories.includes(categoryInput.trim())) {
      form.setValue("categories", [...categories, categoryInput.trim()])
    }

    setCategoryInput("")
  }

  const removeCategory = (category: string) => {
    form.setValue(
      "categories",
      categories.filter((c) => c !== category),
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addCategory()
    }
  }

  async function handleImageUpload(file: File) {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Upload failed")
      }

      const data = await response.json()
      return data.url
    } catch (error) {
      console.error("Upload error:", error)
      throw error
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch(caseStudyId ? `/api/case-studies/${caseStudyId}` : "/api/case-studies", {
        method: caseStudyId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to save case study")
      }

      toast.success(caseStudyId ? "Case study updated" : "Case study created")
      router.push("/admin/case-studies")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Case study title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          try {
                            const url = await handleImageUpload(file)
                            field.onChange(url)
                            setImagePreview(url)
                          } catch (error) {
                            toast.error(error instanceof Error ? error.message : "Failed to upload image")
                          }
                        }
                      }}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image-upload")?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                    {imagePreview && <p className="text-sm text-muted-foreground">Image uploaded successfully</p>}
                  </div>
                  {imagePreview && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                      <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Featured</FormLabel>
                <div className="text-sm text-muted-foreground">Show this case study on the home page</div>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Categories Field */}
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {categories.map((category) => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {category}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeCategory(category)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {category}</span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add category (e.g., Dental, Roofing, E-commerce)"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button type="button" onClick={addCategory} variant="outline">
                  Add
                </Button>
              </div>
              <FormDescription>
                Add categories to help filter case studies. Press Enter or click Add to add a category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Other form fields */}
        <div className="grid gap-8 md:grid-cols-2">
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Healthcare" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief description of the case study" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="challenge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Challenge</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the challenge faced by the client" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="solution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solution</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the solution implemented" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Content (MDX)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your case study content in MDX..."
                  className="min-h-[400px] font-mono"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : caseStudyId ? "Update Case Study" : "Create Case Study"}
        </Button>
      </form>
    </Form>
  )
}

