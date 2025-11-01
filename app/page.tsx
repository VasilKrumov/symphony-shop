import { Suspense } from "react"
import type { Metadata } from "next"
import { getProducts } from "@/lib/api/products"
import { CategoryGroup } from "@/components/category-group"
import { CategoryGroupSkeleton } from "@/components/loading-skeleton"
import { HeroSection } from "@/components/hero-section"

export const metadata: Metadata = {
  title: "Symphony's Shop - Harmonious Collection",
  description: "Discover products that create the perfect rhythm for your life",
  openGraph: {
    title: "Symphony's Shop - Harmonious Collection",
    description: "Discover products that create the perfect rhythm for your life",
    type: "website",
    url: "https://symphony.example.com",
  },
}

async function HomeContent() {
  try {
    const data = await getProducts(50)

    return (
      <div className="space-y-16">
        {data.categories.slice(0, 4).map((category) => (
          <Suspense key={category} fallback={<CategoryGroupSkeleton />}>
            <CategoryGroup category={category} products={data.groupedByCategory[category]} />
          </Suspense>
        ))}
      </div>
    )
  } catch (error) {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-2 font-serif text-2xl font-medium">Unable to load products</h2>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    )
  }
}

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section
        id="categories"
        className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-label="Product categories"
      >
        <Suspense fallback={<CategoryGroupSkeleton />}>
          <HomeContent />
        </Suspense>
      </section>
    </>
  )
}
