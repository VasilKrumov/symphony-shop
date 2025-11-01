import { HeroSkeleton } from "@/components/loading-skeleton"

export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="bg-muted aspect-square animate-pulse rounded-lg" />
          <div className="mt-6 grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-muted aspect-square animate-pulse rounded-lg" />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <HeroSkeleton />
          <div className="space-y-4">
            <div className="bg-muted h-12 w-3/4 animate-pulse rounded" />
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-5/6 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
