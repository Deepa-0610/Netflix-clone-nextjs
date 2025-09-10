"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, Shield, User } from "lucide-react"

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  subscription_plan: string
  is_admin: boolean
  created_at: string
}

interface UsersTableProps {
  users: UserProfile[]
}

export function UsersTable({ users }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPlan, setFilterPlan] = useState<"all" | "basic" | "standard" | "premium">("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesPlan = filterPlan === "all" || user.subscription_plan === filterPlan
    return matchesSearch && matchesPlan
  })

  const getPlanBadge = (plan: string) => {
    const variants = {
      basic: "bg-gray-100 text-gray-800",
      standard: "bg-blue-100 text-blue-800",
      premium: "bg-purple-100 text-purple-800",
    }
    return variants[plan as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Accounts</CardTitle>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value as "all" | "basic" | "standard" | "premium")}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Plans</option>
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.full_name || "No name"}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{user.email}</TableCell>
                <TableCell>
                  <Badge className={`text-xs capitalize ${getPlanBadge(user.subscription_plan)}`}>
                    {user.subscription_plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.is_admin ? (
                    <Badge className="text-xs bg-red-100 text-red-800">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      User
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-gray-600">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">No users found matching your criteria.</div>
        )}
      </CardContent>
    </Card>
  )
}
