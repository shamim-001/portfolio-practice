import type React from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

// Simple authentication check
async function validateAdmin() {
  const headersList = headers()
  const password = headersList.get("x-admin-password")

  // In production, use proper authentication
  if (password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login")
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

