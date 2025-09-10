import { BrowseHeader } from "@/components/browse/browse-header"
import { ContentGrid } from "@/components/browse/content-grid"

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <BrowseHeader />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Movies</h1>
          <ContentGrid type="movie" />
        </div>
      </main>
    </div>
  )
}
