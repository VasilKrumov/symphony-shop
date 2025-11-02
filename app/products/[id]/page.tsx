import { notFound } from "next/navigation"
import Image from "next/image"
import { getProduct } from "@/lib/api/products"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Badge } from "@/components/ui/badge"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  let product
  try {
    product = await getProduct(id)
  } catch (error) {
    notFound()
  }

  return (
    <main className="bg-background min-h-screen">
      <article className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <section className="space-y-4" aria-label="Product images">
            <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={product.images[0] || product.thumbnail}
                alt={product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="bg-muted relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} ${index + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12.5vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="flex flex-col space-y-6" aria-labelledby="product-title">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1
                id="product-title"
                className="mb-4 font-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl"
              >
                {product.title}
              </h1>
              {product.brand && (
                <p className="text-muted-foreground text-sm tracking-wider uppercase">by {product.brand}</p>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-semibold">${product.price.toFixed(2)}</p>
              {product.discountPercentage && product.discountPercentage >= 1 && (
                <Badge variant="destructive">{product.discountPercentage}% off</Badge>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="font-medium">{product.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">rating</span>
              </div>
              <div className="bg-border h-4 w-px" />
              <div>
                <span className="font-medium">{product.stock}</span>
                <span className="text-muted-foreground"> in stock</span>
              </div>
            </div>

            <div className="border-border/40 border-t pt-6">
              <h2 className="mb-3 text-sm font-medium tracking-wider uppercase">Description</h2>
              <p className="text-muted-foreground leading-relaxed text-pretty">{product.description}</p>
            </div>

            <div className="pt-6">
              <AddToCartButton product={product} />
            </div>
          </section>
        </div>
      </article>
    </main>
  )
}
