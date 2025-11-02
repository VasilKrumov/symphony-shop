"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchBarProps {
  autoSearch?: boolean
}

export function SearchBar({ autoSearch = false }: SearchBarProps) {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const debouncedQuery = useDebounce(query, 500)

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (query.trim()) {
        setIsLoading(true)
        router.push(`/products?q=${encodeURIComponent(query)}`)
      }
    },
    [query, router],
  )

  useEffect(() => {
    if (!autoSearch) return

    if (debouncedQuery.trim()) {
      const currentQuery = searchParams.get("q")
      if (currentQuery !== debouncedQuery) {
        router.push(`/products?q=${encodeURIComponent(debouncedQuery)}`)
      }
    } else if (searchParams.get("q")) {
      router.push("/products")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, autoSearch, router])

  return (
    <form onSubmit={handleSearch} className="mx-auto w-full max-w-2xl">
      <div className="relative">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-accent w-full rounded-lg border py-3 pr-10 pl-10 transition-all focus:ring-2 focus:outline-none"
          aria-label="Search products"
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
      {!autoSearch && <p className="text-muted-foreground mt-2 text-center text-sm">Press Enter to search</p>}
    </form>
  )
}
