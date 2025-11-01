import { CartItemSkeleton } from "@/components/loading-skeleton"

export default function CartLoading() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="bg-muted h-10 w-32 animate-pulse rounded" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <CartItemSkeleton key={i} />
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-muted space-y-4 rounded-lg p-6">
            <div className="bg-muted-foreground/20 h-6 w-24 animate-pulse rounded" />
            <div className="bg-muted-foreground/20 h-8 w-20 animate-pulse rounded" />
            <div className="bg-primary/20 h-8 w-full animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
