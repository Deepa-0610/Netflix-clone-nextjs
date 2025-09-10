import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { BrowseHeader } from "@/components/browse/browse-header"

export default async function MyListPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: watchlist } = await supabase
    .from("watchlist")
    .select(`
      content (
        *
      )
    `)
    .eq("user_id", user.id)

  const watchlistContent = watchlist?.map((item) => item.content).filter(Boolean) || []

  return (
    <div className="min-h-screen bg-black text-white">
      <BrowseHeader />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">My List</h1>
          {watchlistContent.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {watchlistContent.map((item: any) => (
                <div key={item.id} className="relative group cursor-pointer">
                  <div className="relative overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={item.thumbnail_url || "/placeholder.svg"}
                      alt={item.title}
                      className="object-cover w-full h-auto"
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">Your list is empty</p>
              <p className="text-gray-500 mt-2">Add movies and shows to your list to watch them later</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
