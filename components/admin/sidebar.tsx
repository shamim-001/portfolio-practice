"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Briefcase, BarChart, LogOut } from "lucide-react"
import { Suspense } from "react"

// Main component with Suspense boundary
export function AdminSidebar() {
  return (
    <Suspense fallback={<AdminSidebarSkeleton />}>
      <AdminSidebarContent />
    </Suspense>
  )
}

// Skeleton loading state
function AdminSidebarSkeleton() {
  return (
    <div className="w-64 min-h-screen bg-muted p-4 space-y-4">
      <div className="h-6 w-40 animate-pulse rounded-md bg-muted-foreground/20"></div>
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-full animate-pulse rounded-md bg-muted-foreground/20"></div>
        ))}
      </div>
    </div>
  )
}

// Content component that uses client hooks
function AdminSidebarContent() {
  const pathname = usePathname()

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Posts",
      href: "/admin/posts",
      icon: FileText,
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: Briefcase,
    },
    {
      name: "Case Studies",
      href: "/admin/case-studies",
      icon: BarChart,
    },
  ]

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      window.location.href = "/admin/login"
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div className="w-64 min-h-screen bg-muted p-4 space-y-4">
      <div className="font-semibold text-lg px-4 py-2">Admin Dashboard</div>
      <nav className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md",
                pathname === item.href || (item.href === "/admin" && pathname === "/admin/dashboard")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted-foreground/10",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="flex-1" />
      <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleLogout}>
        <LogOut className="h-5 w-5" />
        Logout
      </Button>
    </div>
  )
}

