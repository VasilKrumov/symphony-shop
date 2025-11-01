import { CategoryGroupSkeleton, HeroSkeleton } from "@/components/loading-skeleton"

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <HeroSkeleton />

      <div className="mt-12 grid gap-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <CategoryGroupSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
