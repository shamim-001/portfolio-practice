import type React from "react"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-muted/10">{children}</main>
    </div>
  )
}

