import type { Project, CaseStudy, Post } from "@/types"

export function generatePostStructuredData(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.createdAt || post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      "@type": "Person",
      name: "Shamim Ahsan",
      url: "https://shamimahsan.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Shamim Ahsan",
      logo: {
        "@type": "ImageObject",
        url: "https://shamimahsan.com/logo.png",
      },
    },
  }
}

export function generateProjectStructuredData(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.image,
    dateCreated: project.createdAt,
    dateModified: project.updatedAt,
    author: {
      "@type": "Person",
      name: "Shamim Ahsan",
      url: "https://shamimahsan.com/about",
    },
    keywords: project.tags.join(", "),
  }
}

export function generateCaseStudyStructuredData(caseStudy: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.description,
    image: caseStudy.image,
    datePublished: caseStudy.createdAt,
    dateModified: caseStudy.updatedAt,
    author: {
      "@type": "Person",
      name: "Shamim Ahsan",
      url: "https://shamimahsan.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Shamim Ahsan",
      logo: {
        "@type": "ImageObject",
        url: "https://shamimahsan.com/logo.png",
      },
    },
  }
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shamim Ahsan",
    description: "Professional web designer and local SEO expert helping businesses grow their online presence.",
    url: "https://shamimahsan.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://shamimahsan.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }
}

export function generateLocalBusinessStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Shamim Ahsan - Web Design & SEO Services",
    image: "https://shamimahsan.com/logo.png",
    "@id": "https://shamimahsan.com",
    url: "https://shamimahsan.com",
    telephone: "+1234567890",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Street Name",
      addressLocality: "City",
      addressRegion: "State",
      postalCode: "12345",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7128,
      longitude: -74.006,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    sameAs: [
      "https://www.facebook.com/shamimahsan",
      "https://twitter.com/shamimahsan",
      "https://www.linkedin.com/in/shamimahsan",
    ],
  }
}

