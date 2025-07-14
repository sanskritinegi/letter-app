import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const id = body.id || Math.random().toString(36).slice(2, 10)
  const { error } = await supabase.from("letters").insert([{ id, data: body.letterData }])
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ id })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
  const { data, error } = await supabase.from("letters").select("data").eq("id", id).single()
  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ letterData: data.data })
} 