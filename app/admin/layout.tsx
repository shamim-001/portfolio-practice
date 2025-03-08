import type React from "react"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Skip auth check for login page
  const pathname = headers().get("x-pathname") || ""
  if (pathname === "/admin/login") {
    return children
  }

  // Check for admin session
  const cookieStore = cookies()
  const hasAdminSession = cookieStore.has("admin_session")

  // Redirect to login if no session
  if (!hasAdminSession) {
    redirect("/admin/login")
  }

  // Render admin layout with sidebar for authenticated users
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-muted/10">{children}</main>
    </div>
  )
}

