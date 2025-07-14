import { NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const id = body.id || Math.random().toString(36).slice(2, 10)
  await kv.set(`letter:${id}`, body.letterData)
  return NextResponse.json({ id })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
  const letterData = await kv.get(`letter:${id}`)
  if (!letterData) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ letterData })
} 