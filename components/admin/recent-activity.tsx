import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      action: "New user registered",
      user: "john.doe@example.com",
      time: "2 minutes ago",
      type: "user" as const,
    },
    {
      id: 2,
      action: "Content added",
      user: "admin",
      details: "The Dark Knight",
      time: "15 minutes ago",
      type: "content" as const,
    },
    {
      id: 3,
      action: "User subscription upgraded",
      user: "jane.smith@example.com",
      details: "Basic → Premium",
      time: "1 hour ago",
      type: "subscription" as const,
    },
    {
      id: 4,
      action: "Content updated",
      user: "admin",
      details: "Stranger Things",
      time: "2 hours ago",
      type: "content" as const,
    },
    {
      id: 5,
      action: "New category created",
      user: "admin",
      details: "Documentary",
      time: "3 hours ago",
      type: "category" as const,
    },
  ]

  const getTypeBadge = (type: string) => {
    const variants = {
      user: "bg-blue-100 text-blue-800",
      content: "bg-green-100 text-green-800",
      subscription: "bg-purple-100 text-purple-800",
      category: "bg-orange-100 text-orange-800",
    }
    return variants[type as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <Badge className={`text-xs ${getTypeBadge(activity.type)}`}>{activity.type}</Badge>
                  <span className="text-sm font-medium text-gray-900">{activity.action}</span>
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  {activity.user}
                  {activity.details && <span className="text-gray-400"> • {activity.details}</span>}
                </div>
              </div>
              <div className="text-xs text-gray-400">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
