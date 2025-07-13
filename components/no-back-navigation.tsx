"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function NoBackNavigation() {
  const router = useRouter()

  useEffect(() => {
    // Replace the current history entry to prevent going back
    window.history.replaceState(null, "", window.location.href)

    // Listen for popstate (back button) events
    const handlePopState = (e: PopStateEvent) => {
      // Prevent default behavior
      e.preventDefault()
      // Push current URL back to history to stay on this page
      window.history.pushState(null, "", window.location.href)
      return false
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [router])

  return null
}
