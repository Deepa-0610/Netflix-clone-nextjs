import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Users, BarChart3 } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Add Content",
      description: "Upload new movies or TV shows",
      icon: Plus,
      href: "/admin/content/new",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Bulk Upload",
      description: "Import multiple content items",
      icon: Upload,
      href: "/admin/content/bulk",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: Users,
      href: "/admin/users",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "View Analytics",
      description: "Check platform performance",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Button variant="ghost" className="w-full justify-start h-auto p-4 hover:bg-gray-50">
                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mr-3`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">{action.title}</div>
                  <div className="text-sm text-gray-500">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
