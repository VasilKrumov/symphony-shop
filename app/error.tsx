"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[v0] Error:", error)
  }, [error])

  return (
    <main className="bg-background flex min-h-screen items-center justify-center">
      <div className="space-y-4 px-4 text-center">
        <h1 className="font-serif text-4xl font-medium">Something went wrong</h1>
        <p className="text-muted-foreground max-w-md">We encountered an unexpected error. Please try again.</p>
        <div className="flex justify-center gap-4 pt-4">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Button onClick={() => (window.location.href = "/")} variant="outline">
            Go home
          </Button>
        </div>
      </div>
    </main>
  )
}
