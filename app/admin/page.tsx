import { getAllLetters } from "@/lib/letters"
import Link from "next/link"

export default function AdminPage() {
  const letters = getAllLetters()

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Letter Admin</h1>

      <div className="grid gap-4">
        {letters.map((letter) => (
          <div key={letter.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">To: {letter.recipient_name}</h2>
              <div className="flex gap-2">
                <Link href={`/${letter.slug}`} className="text-blue-500 hover:text-blue-700">
                  View Letter
                </Link>
                <Link href={`/secure/${letter.secure_slug}`} className="text-blue-500 hover:text-blue-700">
                  View Secure Link
                </Link>
              </div>
            </div>
            <p className="text-gray-600">From: {letter.sender_name}</p>
            <p className="text-gray-600">Date: {new Date(letter.letter_date).toLocaleDateString()}</p>
            <p className="text-gray-500 text-sm mt-2">URL: /{letter.slug}</p>
            <p className="text-gray-500 text-sm">Secure URL: /secure/{letter.secure_slug}</p>
            <p className="mt-2 line-clamp-2">{letter.content[0]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
