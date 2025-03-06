"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Briefcase, BarChart, LogOut } from "lucide-react"

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

export function AdminSidebar() {
  const pathname = usePathname()

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
                pathname === item.href
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

