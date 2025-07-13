import { notFound } from "next/navigation"
import LandscapeBackground from "@/components/landscape-background"
import { NoBackNavigation } from "@/components/no-back-navigation"
import LetterDescription from "@/components/letter-description"
import SharedEnvelopeLetter from "@/components/shared-envelope-letter"

interface SharePageProps {
  params: {
    letterId: string
  }
}

export default function SharePage({ params }: SharePageProps) {
  // For now, we'll use a simple approach
  // In a real app, you'd fetch the letter data from a database using params.letterId
  
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden">
      {/* Layered Landscape Background */}
      <LandscapeBackground />

      {/* Letter Description */}
      <LetterDescription />

      {/* Centered Shared Envelope */}
      <div className="relative w-full max-w-md mx-auto z-20">
        <SharedEnvelopeLetter letterId={params.letterId} />
      </div>

      {/* No back navigation */}
      <NoBackNavigation />
    </main>
  )
} 