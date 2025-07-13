"use client"
import type * as React from "react"

interface EnvelopeWrapperProps {
  children: React.ReactNode
  envelopeSide: "original" | "front"
  isOpen: boolean
  toggleEnvelope: () => void
}

export const EnvelopeTooltipWrapper: React.FC<EnvelopeWrapperProps> = ({
  children,
  envelopeSide,
  isOpen,
  toggleEnvelope,
}) => {
  const canOpen = envelopeSide === "original" && !isOpen

  const handleClick = () => {
    // Only allow opening when on the original (wax seal) side
    if (canOpen || isOpen) {
      toggleEnvelope()
    }
  }

  return (
    <div className={`group ${canOpen || isOpen ? "cursor-pointer" : "cursor-default"}`} onClick={handleClick}>
      {children}
    </div>
  )
}
