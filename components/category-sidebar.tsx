"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"

interface CategorySidebarProps {
  categories: string[]
}

export function CategorySidebar({ categories }: CategorySidebarProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeCategory = searchParams.get("category")
  const [isOpen, setIsOpen] = useState(true)
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])

  const priceRanges = [
    { label: "Under $50", max: 50, value: "0-50" },
    { label: "$50 - $100", min: 50, max: 100, value: "50-100" },
    { label: "$100 - $500", min: 100, max: 500, value: "100-500" },
    { label: "$500+", min: 500, value: "500-999999" },
  ]

  const handlePriceChange = (value: string) => {
    const newRanges = selectedPriceRanges.includes(value)
      ? selectedPriceRanges.filter((r) => r !== value)
      : [...selectedPriceRanges, value]

    setSelectedPriceRanges(newRanges)

    const params = new URLSearchParams(searchParams.toString())
    if (newRanges.length > 0) {
      params.set("price", newRanges.join(","))
    } else {
      params.delete("price")
    }

    router.push(`/products?${params.toString()}`)
  }

  return (
    <aside className="w-full flex-shrink-0 md:w-64">
      <div className="sticky top-20 space-y-6">
        <div className="border-border bg-card rounded-lg border p-6 transition-all duration-300 hover:shadow-md">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between text-left transition-all duration-300"
            aria-expanded={isOpen}
          >
            <h3 className="font-serif text-lg font-medium">Categories</h3>
            <ChevronDown
              className="h-5 w-5 transition-transform duration-500"
              style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="mt-4 space-y-2">
              <Link
                href="/products"
                className={`block rounded-md px-3 py-2 text-sm transition-all duration-300 ${
                  !activeCategory
                    ? "bg-accent text-accent-foreground scale-100 font-medium"
                    : "text-foreground hover:bg-muted hover:translate-x-1"
                }`}
              >
                All Categories
              </Link>

              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className={`block rounded-md px-3 py-2 text-sm capitalize transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-accent text-accent-foreground scale-100 font-medium shadow-sm"
                      : "text-foreground hover:bg-muted hover:translate-x-1"
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-border bg-card rounded-lg border p-6 transition-all duration-300 hover:shadow-md">
          <h3 className="mb-4 font-serif text-lg font-medium">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label
                key={range.value}
                className="flex cursor-pointer items-center gap-2 transition-all duration-300 hover:translate-x-1"
              >
                <input
                  type="checkbox"
                  className="border-border cursor-pointer rounded transition-all duration-300"
                  checked={selectedPriceRanges.includes(range.value)}
                  onChange={() => handlePriceChange(range.value)}
                  aria-label={`Filter by ${range.label}`}
                />
                <span className="text-foreground text-sm">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
