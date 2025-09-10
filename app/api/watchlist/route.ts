import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: watchlist, error: watchlistError } = await supabase
    .from("watchlist")
    .select(`
      *,
      content (
        id,
        title,
        thumbnail_url,
        type,
        release_year
      )
    `)
    .eq("user_id", user.id)
    .order("added_at", { ascending: false })

  if (watchlistError) {
    return NextResponse.json({ error: watchlistError.message }, { status: 500 })
  }

  return NextResponse.json({ watchlist })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { content_id } = await request.json()

    const { data: watchlistItem, error: watchlistError } = await supabase
      .from("watchlist")
      .insert([{ user_id: user.id, content_id }])
      .select()
      .single()

    if (watchlistError) {
      return NextResponse.json({ error: watchlistError.message }, { status: 500 })
    }

    return NextResponse.json({ watchlistItem })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { content_id } = await request.json()

    const { error: deleteError } = await supabase
      .from("watchlist")
      .delete()
      .eq("user_id", user.id)
      .eq("content_id", content_id)

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
