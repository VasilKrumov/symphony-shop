import { Suspense } from "react"
import { getProducts, getProductsByCategory, searchProducts } from "@/lib/api/products"
import { CategorySidebar } from "@/components/category-sidebar"
import { CategoryGroup } from "@/components/category-group"
import { SearchBar } from "@/components/search-bar"
import { CategoryGroupSkeleton } from "@/components/loading-skeleton"
import type { Metadata } from "next"
import type { Product } from "@/lib/schemas/product"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Products - Atelier",
  description: "Browse our curated collection of products",
}

function filterByPrice(products: Product[], priceRanges: string[]): Product[] {
  if (priceRanges.length === 0) return products

  return products.filter((product) => {
    return priceRanges.some((range) => {
      const [min, max] = range.split("-").map(Number)
      return product.price >= min && product.price <= max
    })
  })
}

async function ProductsContent({
  category,
  searchQuery,
  priceRanges,
}: {
  category?: string
  searchQuery?: string
  priceRanges?: string[]
}) {
  try {
    if (searchQuery) {
      const results = await searchProducts(searchQuery)
      const filteredProducts = priceRanges ? filterByPrice(results.products, priceRanges) : results.products

      return (
        <div className="space-y-8">
          <div>
            <h1 className="mb-2 font-serif text-4xl font-medium">Search Results</h1>
            <p className="text-muted-foreground">
              Found {filteredProducts.length} results for "{searchQuery}"
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <CategoryGroup category="Results" products={filteredProducts} showAll />
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No products found. Try a different search.</p>
            </div>
          )}
        </div>
      )
    }

    if (category) {
      const results = await getProductsByCategory(category)
      const filteredProducts = priceRanges ? filterByPrice(results.products, priceRanges) : results.products

      return (
        <div className="space-y-8">
          <CategoryGroup category={category} products={filteredProducts} showAll />
        </div>
      )
    }

    const data = await getProducts(50)

    const filteredGroupedByCategory = priceRanges
      ? Object.entries(data.groupedByCategory).reduce(
          (acc, [cat, products]) => {
            const filtered = filterByPrice(products, priceRanges)
            if (filtered.length > 0) {
              acc[cat] = filtered
            }
            return acc
          },
          {} as Record<string, Product[]>,
        )
      : data.groupedByCategory

    return (
      <div className="space-y-12">
        {Object.entries(filteredGroupedByCategory).map(([cat, products]) => (
          <Suspense key={cat} fallback={<CategoryGroupSkeleton />}>
            <CategoryGroup category={cat} products={products} showAll />
          </Suspense>
        ))}
      </div>
    )
  } catch (error) {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-2 font-serif text-2xl font-medium">Something went wrong</h2>
        <p className="text-muted-foreground">Failed to load products. Please try again.</p>
      </div>
    )
  }
}

export default async function ProductsPage({
  searchParams: params,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { category, q, price } = await params
  const categoryValue = typeof category === "string" ? category : undefined
  const searchValue = typeof q === "string" ? q : undefined
  const priceValue = typeof price === "string" ? price.split(",") : undefined

  const data = await getProducts(50)

  return (
    <main className="bg-background min-h-screen">
      <header id="categories" className="bg-muted py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6 text-center font-serif text-4xl font-medium sm:text-5xl">Explore Products</h1>
          <SearchBar autoSearch />
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8" aria-label="Product catalog">
        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="flex-shrink-0 md:w-64" aria-label="Product filters">
            <CategorySidebar categories={data.categories} />
          </aside>

          <section className="min-w-0 flex-1" aria-label="Products">
            <Suspense
              key={`${categoryValue}-${searchValue}-${priceValue?.join(",")}`}
              fallback={<CategoryGroupSkeleton />}
            >
              <ProductsContent category={categoryValue} searchQuery={searchValue} priceRanges={priceValue} />
            </Suspense>
          </section>
        </div>
      </section>
    </main>
  )
}
