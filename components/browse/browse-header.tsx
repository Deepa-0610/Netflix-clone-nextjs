"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, User, ChevronDown, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function BrowseHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()

  const navItems = [
    { name: "Home", href: "/browse", active: true },
    { name: "TV Shows", href: "/browse/tv-shows" },
    { name: "Movies", href: "/browse/movies" },
    { name: "New & Popular", href: "/browse/new" },
    { name: "My List", href: "/browse/my-list" },
  ]

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black via-black/80 to-transparent transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/browse" className="text-red-600 text-2xl font-bold">
            NETFLIXCLONE
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  item.active ? "text-white" : "text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Search movies, shows..."
                  className="w-64 bg-black/70 border-white/20 text-white placeholder-gray-400"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-gray-300"
              >
                <Search className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
            <Bell className="w-5 h-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-white hover:text-gray-300">
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-black/90 border-gray-700">
              <DropdownMenuItem className="text-white hover:bg-gray-800">
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-800">Account Settings</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="text-white hover:bg-gray-800 cursor-pointer" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
