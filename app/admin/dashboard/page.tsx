import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Eye } from "lucide-react"
import { getAllPosts } from "@/lib/posts"

export default async function AdminDashboardPage() {
  const posts = await getAllPosts()

  const stats = [
    {
      name: "Total Posts",
      value: posts.length.toString(),
      icon: FileText,
    },
    {
      name: "Latest Post",
      value: posts[0]?.title || "No posts yet",
      icon: Eye,
    },
    {
      name: "Published This Month",
      value: posts
        .filter((post) => {
          const postDate = new Date(post.date)
          const now = new Date()
          return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear()
        })
        .length.toString(),
      icon: Users,
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold truncate">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

