import { ContentRow } from "./content-row"
import { createClient } from "@/lib/supabase/server"

export async function ContentRows() {
  const supabase = await createClient()

  const { data: trendingContent } = await supabase.from("content").select("*").eq("is_trending", true).limit(10)

  const { data: actionContent } = await supabase.from("content").select("*").contains("genre", ["Action"]).limit(10)

  const { data: seriesContent } = await supabase.from("content").select("*").eq("type", "series").limit(10)

  const { data: moviesContent } = await supabase.from("content").select("*").eq("type", "movie").limit(10)

  // Transform data to match component interface
  const transformContent = (items: any[]) =>
    items?.map((item) => ({
      id: item.id,
      title: item.title,
      image: item.thumbnail_url || "/placeholder.svg",
      type: item.type as "movie" | "series",
    })) || []

  const contentCategories = [
    {
      title: "Trending Now",
      items: transformContent(trendingContent || []),
    },
    {
      title: "Action Movies",
      items: transformContent(actionContent || []),
    },
    {
      title: "TV Series",
      items: transformContent(seriesContent || []),
    },
    {
      title: "Movies",
      items: transformContent(moviesContent || []),
    },
  ].filter((category) => category.items.length > 0)

  return (
    <div className="relative z-10 -mt-32 space-y-12 pb-20">
      {contentCategories.map((category) => (
        <ContentRow key={category.title} title={category.title} items={category.items} />
      ))}
    </div>
  )
}
