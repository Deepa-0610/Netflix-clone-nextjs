import { BrowseHeader } from "@/components/browse/browse-header"
import { ContentGrid } from "@/components/browse/content-grid"

export default function TVShowsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <BrowseHeader />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">TV Shows</h1>
          <ContentGrid type="series" />
        </div>
      </main>
    </div>
  )
}
