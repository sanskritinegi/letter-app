"use client"

import { useState, useEffect, useRef } from "react"
import { X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { EnvelopeTooltipWrapper } from "./envelope-tooltip"
import Typewriter from "./Typewriter"

interface SharedEnvelopeLetterProps {
  letterId: string
}

interface LetterData {
  date: string
  greeting: string
  content: string
  closing: string
  signature: string
}

export default function SharedEnvelopeLetter({ letterId }: SharedEnvelopeLetterProps) {
  const [envelopeSide, setEnvelopeSide] = useState<"original" | "front">("front")
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  // Get the actual letter data from localStorage
  const [letterData, setLetterData] = useState<LetterData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [hasPlayedTypewriter, setHasPlayedTypewriter] = useState(false)
  const prevIsOpen = useRef(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Only run on client side
    if (!isClient) return

    try {
      const storedData = localStorage.getItem(`letter_${letterId}`)
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        setLetterData(parsedData.letterData)
      } else {
        setError("Letter not found. It may have expired or the link is invalid.")
      }
    } catch (err) {
      setError("Error loading letter data.")
    } finally {
      setIsLoading(false)
    }
  }, [letterId, isClient])

  // Check if content is scrollable
  useEffect(() => {
    if (isOpen && contentRef.current) {
      const checkScrollable = () => {
        const element = contentRef.current
        if (element) {
          setShowScrollIndicator(element.scrollHeight > element.clientHeight)
        }
      }

      checkScrollable()

      const handleScroll = () => {
        const element = contentRef.current
        if (element) {
          const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 20
          setShowScrollIndicator(!isAtBottom)
        }
      }

      const currentRef = contentRef.current
      currentRef?.addEventListener("scroll", handleScroll)

      return () => {
        currentRef?.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && !prevIsOpen.current) {
      setHasPlayedTypewriter(false)
    }
    prevIsOpen.current = isOpen
  }, [isOpen])

  const toggleEnvelope = () => {
    if (envelopeSide === "original" || isOpen) {
      setIsOpen(!isOpen)
    }
  }

  const getRotation = () => {
    return envelopeSide === "original" ? "rotateY(0deg)" : "rotateY(180deg)"
  }

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading letter...</div>
      </div>
    )
  }

  // Render error state
  if (error || !letterData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600 text-center">
          <p className="font-semibold mb-2">Letter Not Found</p>
          <p className="text-sm">{error || "The letter you're looking for doesn't exist."}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Envelope Container */}
      <EnvelopeTooltipWrapper envelopeSide={envelopeSide} isOpen={isOpen} toggleEnvelope={toggleEnvelope}>
        <div
          className={cn(
            "relative w-full aspect-[1.6/1] max-w-md mx-auto transition-all duration-500",
            "transform-style-preserve-3d shadow-md group-hover:shadow-xl",
            "group-hover:-translate-y-1",
          )}
          style={{
            transform: getRotation(),
            transformStyle: "preserve-3d",
            transition: "transform 0.5s ease, box-shadow 0.3s ease, translate 0.3s ease",
          }}
        >
          {/* Original Side - With folds */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-0 bg-white rounded-lg border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
              {/* Diagonal folds */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top right, transparent 49.5%, rgba(0,0,0,0.03) 50%, transparent 50.5%)",
                }}
              ></div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top left, transparent 49.5%, rgba(0,0,0,0.03) 50%, transparent 50.5%)",
                }}
              ></div>

              {/* Wax Seal */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wax-seal-5TpZ9v4oHzqNY9lC41WHRCwNph8Uub.png"
                    alt="Wax Seal"
                    fill
                    style={{ objectFit: "contain" }}
                    className="drop-shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Front Side - With addresses and stamp */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg) translateZ(1px)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-0 bg-[#f8f8f8] rounded-lg border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-4">
              {/* Top Left - To */}
              <div className="absolute top-4 left-4 w-32">
                <div className="text-xs font-mono text-[#2d2b6e]">
                  To: {letterData.greeting.replace(/^Dear\s+/i, "") || "Recipient"}
                </div>
              </div>

              {/* Bottom Right - From */}
              <div className="absolute bottom-4 right-4 w-32">
                <div className="font-mono text-xs text-[#9c2b7a] text-right">
                  From: {letterData.signature || "Your Name"}
                </div>
              </div>

              {/* Stamp */}
              <div className="absolute top-4 right-4 w-12 h-12">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-[#4CAF50] rounded-sm"></div>
                  <div className="absolute inset-[15%] flex items-center justify-center">
                    <div className="w-6 h-6 bg-[#2196F3] rounded-full"></div>
                  </div>
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#555] opacity-40">
                    <div className="absolute top-[-2px] w-full h-[1px] bg-[#555] opacity-40"></div>
                    <div className="absolute top-[2px] w-full h-[1px] bg-[#555] opacity-40"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EnvelopeTooltipWrapper>

      {/* Envelope Control Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="sm"
          className="relative z-0 font-comfortaa bg-transparent"
          onClick={(e) => {
            e.stopPropagation()
            setEnvelopeSide(envelopeSide === "original" ? "front" : "original")
          }}
        >
          Flip Envelope
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="relative z-0 font-comfortaa bg-transparent"
          onClick={(e) => {
            e.stopPropagation()
            if (envelopeSide === "original") {
              toggleEnvelope()
            }
          }}
          disabled={envelopeSide !== "original"}
        >
          <X className="h-4 w-4 mr-2 rotate-45" />
          Open Letter
        </Button>
      </div>

      {/* Letter */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 w-[95%] h-[550px] bg-[#fffdf8] rounded-md shadow-lg transition-all duration-700 ease-in-out transform -translate-x-1/2 -translate-y-1/2",
          isOpen ? "opacity-100 scale-100 z-10" : "opacity-0 scale-50 -z-10 pointer-events-none",
        )}
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24), 0 0 0 1px rgba(0,0,0,0.05) inset",
        }}
      >
        {/* Close Button */}
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-10" onClick={toggleEnvelope}>
          <X className="h-4 w-4" />
        </Button>

        {/* Paper texture overlay */}
        <div className="absolute inset-0 bg-[url('https://v0.blob.com/paper-texture.png')] opacity-10 mix-blend-multiply pointer-events-none rounded-md"></div>

        {/* Letter Content */}
        <div className="flex flex-col p-6 pt-8 font-handwriting text-[#2c3e50] h-full overflow-hidden">
          {/* Date */}
          <div className="text-right mb-4">
            <p>{letterData.date}</p>
          </div>

          {/* Greeting */}
          <div className="mb-3">
            <p className="text-lg">{letterData.greeting}</p>
          </div>

          {/* Letter Content */}
          <div ref={contentRef} className="flex-1 overflow-y-auto pr-2 relative">
            <div className="space-y-4 leading-6 text-base">
              {!hasPlayedTypewriter ? (
                <Typewriter
                  paragraphs={letterData.content.split("\n")}
                  speed={36}
                  onDone={() => setHasPlayedTypewriter(true)}
                />
              ) : (
                letterData.content.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              )}
            </div>
          </div>

          {/* Closing and Signature */}
          <div className="mt-4 mb-4">
            {letterData.closing && <p className="mb-1">{letterData.closing}</p>}
            {letterData.signature && <p className="italic text-lg">{letterData.signature}</p>}
          </div>
        </div>

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full shadow-sm flex items-center gap-2 animate-bounce">
              <span className="font-medium">Scroll for more</span>
              <ChevronDown className="h-5 w-5" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 