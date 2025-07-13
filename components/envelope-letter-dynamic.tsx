"use client"

import { useState, useEffect, useRef } from "react"
import { X, RotateCw, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { EnvelopeTooltipWrapper } from "./envelope-tooltip"
import type { Letter } from "@/lib/letters"

interface EnvelopeLetterProps {
  letter: Letter
}

export default function EnvelopeLetter({ letter }: EnvelopeLetterProps) {
  const [envelopeSide, setEnvelopeSide] = useState<"original" | "front">("front")
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  // Format the date for display
  const formattedDate = "March 22, 2025"

  // Check if content is scrollable
  useEffect(() => {
    if (isOpen && contentRef.current) {
      const checkScrollable = () => {
        const element = contentRef.current
        if (element) {
          // If scrollHeight is greater than clientHeight, content is scrollable
          setShowScrollIndicator(element.scrollHeight > element.clientHeight)
        }
      }

      checkScrollable()

      // Add scroll event listener to hide indicator when user scrolls to bottom
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

  const toggleEnvelope = () => {
    // Only allow opening when on the original (wax seal) side
    if (envelopeSide === "original" || isOpen) {
      setIsOpen(!isOpen)
    }
  }

  const getRotation = () => {
    return envelopeSide === "original" ? "rotateY(0deg)" : "rotateY(180deg)"
  }

  // Function to get stamp image based on slug
  const getStampImage = (slug: string) => {
    switch (slug) {
      case "puru":
        return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/katpadi-2-gcktsM67GDg0OkDxAHxhRi4GlDeGgM.png"
      case "anand":
        return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anand-2.png-OceeGOLhrhPSDj1A6JK28Tjl4HcLWe.jpeg"
      case "arvind":
        return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/arvind-2-hggbjqlc34MGnhxBGJoFVmTZq9IuER.png"
      case "rafi":
        return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rafi-2.png-4VFqgGqBdit2E6fbL7s6SK6cOUjdBE.jpeg"
      case "vishal":
        return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vishal-2.png-AKUtvhaMfim9wCB1CiT7GFSBRLntKw.jpeg"
      default:
        return ""
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Envelope Container */}
      <EnvelopeTooltipWrapper envelopeSide={envelopeSide} isOpen={isOpen} toggleEnvelope={toggleEnvelope}>
        {/* Envelope */}
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
            {/* Envelope Base - With diagonal folds */}
            <div className="absolute inset-0 bg-white rounded-lg border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
              {/* Left diagonal fold */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top right, transparent 49.5%, rgba(0,0,0,0.03) 50%, transparent 50.5%)",
                }}
              ></div>

              {/* Right diagonal fold */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top left, transparent 49.5%, rgba(0,0,0,0.03) 50%, transparent 50.5%)",
                }}
              ></div>

              {/* Wax Seal in the middle */}
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
            {/* Envelope Base - With addresses and stamp */}
            <div className="absolute inset-0 bg-[#f8f8f8] rounded-lg border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
              {/* Sender Address */}
              <div className="absolute top-6 left-6 font-mono text-[#2d2b6e] text-sm">
                <p className="font-bold">FROM SANSKRITI</p>
                <p>FAREWELL LETTER</p>
                <p>MARCH 2025</p>
              </div>

              {/* Recipient Address - Simplified */}
              <div className="absolute bottom-6 right-6 font-mono text-[#9c2b7a] text-sm text-right">
                <p className="font-bold">TO: {letter.recipient_name}</p>
              </div>

              {/* Stamp */}
              <div className="absolute top-6 right-6 w-16 h-16">
                <div className="relative w-full h-full">
                  {getStampImage(letter.slug) ? (
                    <Image
                      src={getStampImage(letter.slug) || "/placeholder.svg"}
                      alt={`${letter.recipient_name} Stamp`}
                      fill
                      style={{ objectFit: "contain" }}
                      className="drop-shadow-sm"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[#ffd54f] rounded-sm"></div>
                      <div className="absolute inset-[15%] flex items-center justify-center">
                        <div className="w-8 h-8 bg-[#ff4081] rounded-full"></div>
                      </div>
                      {/* Postmark lines */}
                      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#555] opacity-40">
                        <div className="absolute top-[-4px] w-full h-[2px] bg-[#555] opacity-40"></div>
                        <div className="absolute top-[4px] w-full h-[2px] bg-[#555] opacity-40"></div>
                      </div>
                    </>
                  )}
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
          className="relative z-0 font-comfortaa"
          onClick={(e) => {
            e.stopPropagation()
            setEnvelopeSide(envelopeSide === "original" ? "front" : "original")
          }}
        >
          <RotateCw className="h-4 w-4 mr-2" />
          Flip Envelope
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="relative z-0 font-comfortaa"
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
          "absolute top-1/2 left-1/2 w-[95%] h-[600px] bg-[#fffdf8] rounded-md shadow-lg transition-all duration-700 ease-in-out transform -translate-x-1/2 -translate-y-1/2",
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

        {/* Letter Content - Fixed overflow issues */}
        <div className="flex flex-col p-6 pt-8 font-handwriting text-[#2c3e50] h-full overflow-hidden">
          <div className="text-right mb-4">
            <p>{formattedDate}</p>
          </div>

          <div className="mb-3">
            <p className="text-lg">{letter.greeting}</p>
          </div>

          {/* Added overflow-y-auto to enable scrolling if needed */}
          <div ref={contentRef} className="space-y-4 leading-6 text-base flex-1 overflow-y-auto pr-2 relative">
            {letter.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <div className="mt-4 mb-4">
              <p className="mb-1">{letter.closing}</p>
              <p className="italic text-lg">{letter.signature}</p>
              {letter.slug === "puru" && <p className="text-sm mt-1">8076417100</p>}
            </div>
          </div>
        </div>

        {/* Very obvious scroll indicator */}
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
