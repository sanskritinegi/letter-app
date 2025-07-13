import type React from "react"
import { notFound } from "next/navigation"
import LandscapeBackground from "@/components/landscape-background"
import { NoBackNavigation } from "@/components/no-back-navigation"
import LetterDescription from "@/components/letter-description"

// Define the mapping of secure slugs to letter components
const secureLetterComponents: Record<string, React.ComponentType> = {
  // All pre-made letters have been removed
}

export function generateStaticParams() {
  return [
    // All pre-made secure IDs have been removed
  ]
}

export default function SecureLetterPage({ params }: { params: { secureId: string } }) {
  // Get the letter component based on the secure slug
  const LetterComponent = secureLetterComponents[params.secureId]

  // If no matching letter component is found, render the default 404 page
  if (!LetterComponent) {
    return notFound()
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden">
      {/* Layered Landscape Background */}
      <LandscapeBackground />

      {/* Letter Description */}
      <LetterDescription />

      {/* Centered Envelope */}
      <div className="relative w-full max-w-md mx-auto z-20">
        <LetterComponent />
      </div>

      {/* No back navigation */}
      <NoBackNavigation />
    </main>
  )
}
