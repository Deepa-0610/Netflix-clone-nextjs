"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Plus, ThumbsUp, Info } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"

interface ContentGridProps {
  type?: "movie" | "series"
}

export function ContentGrid({ type }: ContentGridProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [content, setContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContent() {
      const supabase = createClient()
      let query = supabase.from("content").select("*")

      if (type) {
        query = query.eq("type", type)
      }

      const { data } = await query.order("created_at", { ascending: false })
      setContent(data || [])
      setLoading(false)
    }

    fetchContent()
  }, [type])

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading content...</div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {content.map((item) => (
        <div
          key={item.id}
          className="relative group cursor-pointer"
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="relative overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
            <Image
              src={item.thumbnail_url || "/placeholder.svg"}
              alt={item.title}
              width={300}
              height={400}
              className="object-cover w-full h-auto"
            />

            {/* Hover Overlay */}
            {hoveredItem === item.id && (
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white font-semibold mb-2 text-sm">{item.title}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1">
                      <Button size="sm" className="bg-white text-black hover:bg-gray-200 p-1.5">
                        <Play className="w-3 h-3 fill-current" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-1.5">
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-1.5">
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-1.5">
                      <Info className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-300 capitalize">{item.type}</span>
                    <span className="text-yellow-400">★ {item.imdb_rating || "N/A"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
