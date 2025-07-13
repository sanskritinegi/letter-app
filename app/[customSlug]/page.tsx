import type React from "react"
import { notFound } from "next/navigation"
import LandscapeBackground from "@/components/landscape-background"
import { NoBackNavigation } from "@/components/no-back-navigation"
import LetterDescription from "@/components/letter-description"

// Import all letter components
import EnvelopeLetterRebecca from "@/components/envelope-letter-rebecca"
import EnvelopeLetterMichael from "@/components/envelope-letter-michael"
import EnvelopeLetterSarah from "@/components/envelope-letter-sarah"
import EnvelopeLetterJane from "@/components/envelope-letter-jane"

// Define the mapping of custom slugs to letter components
const letterComponents: Record<string, React.ComponentType> = {
  jane123456: EnvelopeLetterJane,
  // Include original slugs for backward compatibility
  rebecca: EnvelopeLetterRebecca,
  michael: EnvelopeLetterMichael,
  sarah: EnvelopeLetterSarah,
  jane: EnvelopeLetterJane,
}

export function generateStaticParams() {
  return [
    { customSlug: "jane123456" },
    { customSlug: "rebecca" },
    { customSlug: "michael" },
    { customSlug: "sarah" },
    { customSlug: "jane" },
  ]
}

export default async function CustomLetterPage({ params }: { params: { customSlug: string } }) {
  // Await params if it's a promise (per Next.js 15 dynamic route requirements)
  const resolvedParams = await params;
  const LetterComponent = letterComponents[resolvedParams.customSlug];

  // If no matching letter component is found, render the default 404 page
  if (!LetterComponent) {
    return notFound();
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
  );
}
