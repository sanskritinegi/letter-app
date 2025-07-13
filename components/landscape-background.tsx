"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export default function LandscapeBackground({ className }: { className?: string }) {
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position as a percentage of the window size
      const mouseX = e.clientX / window.innerWidth
      const mouseY = e.clientY / window.innerHeight

      // Convert to a small offset for parallax effect
      setOffsetX((mouseX - 0.5) * -20) // Adjust multiplier for intensity
      setOffsetY((mouseY - 0.5) * -10) // Adjust multiplier for intensity
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0", className)}>
      {/* Full landscape background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Summer5-CwndABM2Qad3RI2YYLQtYZlUCZ1p4s.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          transform: `translate(${offsetX}px, ${offsetY}px)`,
        }}
      />
    </div>
  )
}
