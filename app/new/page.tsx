import LandscapeBackground from "@/components/landscape-background"
import { NoBackNavigation } from "@/components/no-back-navigation"
import InteractiveEnvelopeLetter from "@/components/interactive-envelope-letter"

export default function NewLetterPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden">
      {/* Layered Landscape Background */}
      <LandscapeBackground />

      {/* Letter Description */}
      <div className="text-center mb-6 max-w-md mx-auto">
        <h1 className="text-2xl font-gloock text-gray-800 mb-2">Create Your Own Letter</h1>
        <p className="text-gray-600 font-comfortaa">Design and write your personalized message</p>
      </div>

      {/* Centered Interactive Envelope */}
      <div className="relative w-full max-w-md mx-auto z-20">
        <InteractiveEnvelopeLetter />
      </div>

      {/* No back navigation */}
      <NoBackNavigation />
    </main>
  )
}
