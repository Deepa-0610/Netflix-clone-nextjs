import { Button } from "@/components/ui/button"
import { Play, Info, Plus, ThumbsUp } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import Image from "next/image"

export async function FeaturedContent() {
  const supabase = await createClient()

  const { data: featuredContent } = await supabase.from("content").select("*").eq("is_featured", true).limit(1).single()

  // Fallback if no featured content
  const defaultFeatured = {
    id: 1,
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    backdrop_url: "/placeholder-jaf0f.png",
    thumbnail_url: "/dark-knight-movie-logo.jpg",
    rating: "PG-13",
    release_year: 2008,
    duration_minutes: 152,
    genre: ["Action", "Crime", "Drama"],
  }

  const movie = featuredContent || defaultFeatured

  return (
    <section className="relative h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={movie.backdrop_url || "/placeholder.svg"}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20">
        <div className="max-w-2xl">
          {/* Movie Logo */}
          <div className="mb-6">
            <Image
              src={movie.thumbnail_url || "/placeholder.svg"}
              alt={`${movie.title} logo`}
              width={400}
              height={150}
              className="object-contain"
            />
          </div>

          {/* Movie Info */}
          <div className="flex items-center space-x-4 mb-4 text-sm">
            <span className="bg-red-600 px-2 py-1 rounded text-white font-semibold">{movie.rating}</span>
            <span className="text-gray-300">{movie.release_year}</span>
            <span className="text-gray-300">
              {Math.floor((movie.duration_minutes || 0) / 60)}h {(movie.duration_minutes || 0) % 60}m
            </span>
            <div className="flex space-x-2">
              {(movie.genre || []).slice(0, 3).map((genre) => (
                <span key={genre} className="text-gray-300">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-200 mb-8 leading-relaxed line-clamp-3">{movie.description}</p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 flex items-center space-x-2 px-8">
              <Play className="w-5 h-5 fill-current" />
              <span>Play</span>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-gray-600/70 text-white hover:bg-gray-600 flex items-center space-x-2 px-6"
            >
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/20 p-3">
              <Plus className="w-6 h-6" />
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/20 p-3">
              <ThumbsUp className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
