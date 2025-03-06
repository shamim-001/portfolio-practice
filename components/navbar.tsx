"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, ChevronDown } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Projects",
    href: "/projects",
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

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const dropdownTimeoutRef = React.useRef<NodeJS.Timeout>()
  const mobileMenuRef = React.useRef<HTMLDivElement>(null)
  const menuButtonRef = React.useRef<HTMLButtonElement>(null)

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Don't close if clicking on the menu button itself
      if (menuButtonRef.current && menuButtonRef.current.contains(event.target as Node)) {
        return
      }

      // Close if clicking outside the mobile menu
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Handle escape key to close dropdowns and mobile menu
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDropdown(null)
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [])

  const handleMouseEnter = (itemName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(itemName)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 100) // Small delay before closing
  }

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent, itemName: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setActiveDropdown(activeDropdown === itemName ? null : itemName)
    }
    if (e.key === "Escape") {
      setActiveDropdown(null)
    }
  }

  // Toggle mobile menu with a clean handler
  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container relative flex h-16 items-center justify-between" aria-label="Main navigation">
        <div className="flex items-center">
          <Link href="/" className="flex items-center" aria-label="Shamim Ahsan homepage">
            <span className="text-xl font-bold">Shamim Ahsan</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <div className="flex items-center space-x-6">
            {navigation.map((item) =>
              item.dropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                      pathname.startsWith(item.href) ? "text-primary" : "text-muted-foreground",
                    )}
                    aria-expanded={activeDropdown === item.name}
                    aria-haspopup="true"
                    onKeyDown={(e) => handleKeyDown(e, item.name)}
                    id={`${item.name.toLowerCase()}-menu-button`}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", activeDropdown === item.name && "rotate-180")}
                      aria-hidden="true"
                    />
                  </button>
                  {activeDropdown === item.name && (
                    <div
                      className="absolute left-0 mt-2 w-48 rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby={`${item.name.toLowerCase()}-menu-button`}
                    >
                      <div className="py-1">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={cn(
                              "block px-4 py-2 text-sm transition-colors",
                              pathname === subItem.href
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted",
                            )}
                            role="menuitem"
                            tabIndex={0}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-muted-foreground",
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button asChild className="hidden md:inline-flex">
            <Link href="/contact">Hire Me</Link>
          </Button>
          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            className="md:hidden relative z-50"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="fixed inset-0 top-16 z-40 h-[calc(100vh-4rem)] w-full overflow-y-auto bg-background md:hidden"
          aria-label="Mobile navigation"
          role="navigation"
        >
          <div className="container divide-y">
            <nav>
              <ul className="list-none p-0 m-0">
                {navigation.map((item) =>
                  item.dropdown ? (
                    <li key={item.name} className="py-4">
                      <div id={`${item.name.toLowerCase()}-mobile-heading`} className="mb-2 font-medium">
                        {item.name}
                      </div>
                      <ul
                        className="ml-4 space-y-2 list-none p-0"
                        aria-labelledby={`${item.name.toLowerCase()}-mobile-heading`}
                      >
                        {item.items?.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className={cn(
                                "block py-1 text-sm",
                                pathname === subItem.href ? "text-primary" : "text-muted-foreground",
                              )}
                              aria-current={pathname === subItem.href ? "page" : undefined}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block py-4 text-base font-medium",
                          pathname === item.href ? "text-primary" : "text-muted-foreground",
                        )}
                        aria-current={pathname === item.href ? "page" : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ),
                )}
                <li className="py-4">
                  <Button asChild className="w-full">
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                      Hire Me
                    </Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

