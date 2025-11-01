import type React from "react"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-muted animate-shimmer rounded", className)} {...props} />
}

export { Skeleton }
