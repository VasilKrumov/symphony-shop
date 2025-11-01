"use client"

import { useEffect } from "react"
import { initEasterEggs } from "@/lib/easter-eggs"

export function EasterEggs() {
  useEffect(() => {
    const cleanup = initEasterEggs()
    return cleanup
  }, [])

  return null
}
