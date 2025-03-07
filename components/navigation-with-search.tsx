"use client"

import { Suspense } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Main component with Suspense boundary
export function NavigationWithSearch() {
  return (
    <Suspense fallback={<div className="animate-pulse h-6 w-96 bg-muted rounded" />}>
      <NavigationContent />
    </Suspense>
  )
}

// Content component that uses client hooks
function NavigationContent() {
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Projects",
      href: "#",
      dropdown: true,
      items: [
        { name: "Web Projects", href: "/projects" },
        { name: "SEO Case Studies", href: "/seo-case-studies" },
      ],
    },
    { name: "Blog", href: "/blog" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <div className="flex items-center justify-center gap-x-6 lg:gap-x-10">
      {navigation.map((item) =>
        item.dropdown ? (
          <div key={item.name} className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {item.name}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-popover hidden group-hover:block">
              <div className="py-1">
                {item.items?.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className={cn(
                      "block px-4 py-2 text-sm",
                      pathname === subItem.href ? "text-primary" : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            {item.name}
          </Link>
        ),
      )}
    </div>
  )
}

import { usePathname } from "next/navigation"

