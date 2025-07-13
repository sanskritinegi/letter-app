import React, { useEffect, useState } from "react"

interface TypewriterProps {
  paragraphs: string[]
  speed?: number // ms per character
  onDone?: () => void
}

export default function Typewriter({ paragraphs, speed = 36, onDone }: TypewriterProps) {
  const [displayed, setDisplayed] = useState<string[]>(Array(paragraphs.length).fill(""))
  const [currentPara, setCurrentPara] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    let cancelled = false
    if (currentPara < paragraphs.length) {
      if (currentChar <= paragraphs[currentPara].length) {
        setDisplayed((prev) => {
          const updated = [...prev]
          updated[currentPara] = paragraphs[currentPara].slice(0, currentChar)
          return updated
        })
        const timeout = setTimeout(() => {
          setCurrentChar((c) => c + 1)
        }, speed)
        return () => {
          cancelled = true
          clearTimeout(timeout)
        }
      } else {
        setCurrentPara((p) => p + 1)
        setCurrentChar(0)
      }
    } else if (onDone) {
      onDone()
    }
    return () => { cancelled = true }
  }, [currentPara, currentChar, paragraphs, speed, onDone])

  return (
    <>
      {displayed.map((text, idx) => (
        <p key={idx}>{text}</p>
      ))}
    </>
  )
} 