export interface CaseStudy {
  id: string
  title: string
  description: string
  image: string
  industry: string
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
  }[]
  categories: string[]
  featured: boolean
  content: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  link: string
  tags: string[]
  categories: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface UploadResponse {
  url: string
  success: boolean
  error?: string
}

