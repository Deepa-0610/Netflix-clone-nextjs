import { Suspense } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { BrowseHeader } from "@/components/browse/browse-header"
import { FeaturedContent } from "@/components/browse/featured-content"
import { ContentRows } from "@/components/browse/content-rows"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default async function BrowsePage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <BrowseHeader />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <FeaturedContent />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <ContentRows />
        </Suspense>
      </main>
    </div>
  )
}
