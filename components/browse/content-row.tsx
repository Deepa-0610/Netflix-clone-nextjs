"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown } from "lucide-react"
import Image from "next/image"

interface ContentItem {
  id: number
  title: string
  image: string
  type: "movie" | "series"
}

interface ContentRowProps {
  title: string
  items: ContentItem[]
}

export function ContentRow({ title, items }: ContentRowProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById(`row-${title}`)
    if (container) {
      const scrollAmount = 300
      const newPosition =
        direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

      container.scrollTo({ left: newPosition, behavior: "smooth" })
      setScrollPosition(newPosition)
    }
  }

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <div className="relative group">
        {/* Left Arrow */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        {/* Content Container */}
        <div
          id={`row-${title}`}
          className="flex space-x-2 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="relative flex-shrink-0 w-48 group/item cursor-pointer"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative overflow-hidden rounded-md transition-transform duration-300 group-hover/item:scale-105">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={300}
                  height={400}
                  className="object-cover w-full h-auto"
                />

                {/* Hover Overlay */}
                {hoveredItem === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold mb-2 text-sm">{item.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-white text-black hover:bg-gray-200 p-2">
                          <Play className="w-4 h-4 fill-current" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
                          <ThumbsUp className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2 ml-auto">
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="mt-2">
                        <span className="text-xs text-gray-300 capitalize">{item.type}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
