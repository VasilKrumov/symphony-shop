"use client"

import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: number
}

export function StarRating({ rating, maxRating = 5, size = 16 }: StarRatingProps) {
  const getOpacity = (rating: number) => {
    if (rating <= 2) return 0.3 + (rating / 2) * 0.2
    if (rating <= 4) return 0.5 + ((rating - 2) / 2) * 0.3
    return 0.8 + ((rating - 4) / 1) * 0.2
  }

  const opacity = getOpacity(rating)

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }, (_, index) => {
        const fillPercentage = Math.min(Math.max((rating - index) * 100, 0), 100)

        return (
          <div key={index} className="relative" style={{ width: size, height: size }}>
            <Star size={size} className="text-muted-foreground/20 absolute inset-0" fill="currentColor" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercentage}%` }}>
              <Star size={size} className="text-yellow-500" fill="currentColor" style={{ opacity }} />
            </div>
          </div>
        )
      })}
      <span className="text-muted-foreground ml-1 text-sm">{rating.toFixed(1)}</span>
    </div>
  )
}
