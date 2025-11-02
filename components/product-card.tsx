"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import type { Product } from "@/lib/schemas/product"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store/cart-store"
import { ShoppingCart } from "lucide-react"
import { StarRating } from "@/components/star-rating"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true)
    addItem(product)
    setTimeout(() => setIsAdding(false), 800)
  }

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
        <Card className="group border-border/40 hover:border-border/80 overflow-hidden hover:shadow-lg">
          <div className="bg-muted relative h-80 w-full overflow-hidden">
            <Image
              src={product.thumbnail || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
            {product.discountPercentage && product.discountPercentage >= 1 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="bg-accent text-accent-foreground absolute top-3 left-3 rounded px-2 py-1 text-xs font-semibold"
              >
                -{product.discountPercentage.toFixed(0)}%
              </motion.div>
            )}

            <Button
              size="icon"
              onClick={handleAddToCart}
              disabled={isAdding}
              className="bg-foreground text-background hover:bg-foreground/90 absolute top-3 right-3 h-9 w-9 rounded-full shadow-md hover:scale-110 transition-transform"
              aria-label={`Add ${product.title} to cart`}
            >
              <ShoppingCart size={18} />
            </Button>
          </div>

          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">{product.category}</p>
              <h3 className="line-clamp-2 font-serif text-lg leading-tight font-medium text-balance">
                {product.title}
              </h3>

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-1">
                  <p className="text-foreground text-lg font-semibold">${product.price.toFixed(2)}</p>
                  {product.discountPercentage && product.discountPercentage >= 1 && (
                    <p className="text-muted-foreground text-xs line-through">
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </p>
                  )}
                </div>
                {product.rating && <StarRating rating={product.rating} size={16} />}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
