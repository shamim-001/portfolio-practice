import type React from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"

async function validateAdmin() {
  const headersList = headers()
  const hasAdminSession = headersList.get("cookie")?.includes("admin_session=true")

  if (!hasAdminSession) {
    redirect("/admin/login")
  }
}

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await validateAdmin()

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-muted/10">{children}</main>
    </div>
  )
}

