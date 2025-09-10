import { NextResponse } from "next/server"
// import your DB client here

export async function POST(req: Request) {
  try {
    const data = await req.json()
    // Validate required fields
    if (!data.title || !data.type || !data.release_year || !data.rating) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // TODO: Insert into your database (replace with your DB logic)
    // Example with Supabase:
    // const { data: inserted, error } = await supabase
    //   .from("content")
    //   .insert([{ ...data }])
    //   .single()
    // if (error) throw error

    // For now, just return success for testing
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}