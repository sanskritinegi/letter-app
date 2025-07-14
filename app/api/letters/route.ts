import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const LETTERS_FILE = path.resolve(process.cwd(), "letters-db.json")

async function readLetters() {
  try {
    const data = await fs.readFile(LETTERS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return {}
  }
}

async function writeLetters(letters: Record<string, any>) {
  await fs.writeFile(LETTERS_FILE, JSON.stringify(letters, null, 2), "utf-8")
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const id = body.id || Math.random().toString(36).slice(2, 10)
  const letters = await readLetters()
  letters[id] = body.letterData
  await writeLetters(letters)
  return NextResponse.json({ id })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
  const letters = await readLetters()
  if (!letters[id]) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ letterData: letters[id] })
} 