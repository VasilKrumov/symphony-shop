"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <div className="space-y-4 overflow-hidden rounded-lg">
      <Skeleton className="aspect-square rounded-lg" />
      <div className="space-y-2 px-1">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  )
}

export function CategoryGroupSkeleton() {
  return (
    <section className="animate-fade-in space-y-6">
      <Skeleton className="h-8 w-32 rounded" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}

export function CartItemSkeleton() {
  return (
    <div className="flex gap-4 border-b py-4">
      <Skeleton className="h-24 w-24 rounded" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-20 rounded" />
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="h-96 w-full space-y-4 p-8">
      <Skeleton className="h-12 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-4 pt-4">
        <Skeleton className="h-10 w-32 rounded" />
        <Skeleton className="h-10 w-32 rounded" />
      </div>
    </div>
  )
}

export function SidebarSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-24 rounded" />
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-full rounded" />
      ))}
    </div>
  )
}
