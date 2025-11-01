"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 500)
  const router = useRouter()

  useEffect(() => {
    if (debouncedQuery.trim() && open) {
      router.push(`/products?q=${encodeURIComponent(debouncedQuery)}`)
      onOpenChange(false)
      setQuery("")
    }
  }, [debouncedQuery, router, onOpenChange, open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="relative">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-lg border py-3 pr-10 pl-10 transition-all focus:ring-2 focus:outline-none"
              aria-label="Search products"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <p className="text-muted-foreground mt-2 text-sm">Results appear as you type</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
