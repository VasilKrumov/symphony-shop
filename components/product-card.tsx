"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import type { Product } from "@/lib/schemas/product"
import { Card, CardContent } from "@/components/ui/card"
import { useCartStore } from "@/lib/store/cart-store"
import { ShoppingCart } from "lucide-react"
import { StarRating } from "@/components/star-rating"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
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
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="group border-border/40 hover:border-border/80 overflow-hidden hover:shadow-lg">
          <div className="bg-muted relative h-80 w-full overflow-hidden">
            <motion.div
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full"
            >
              <Image
                src={product.thumbnail || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            </motion.div>
            {product.discountPercentage && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="bg-accent text-accent-foreground absolute top-3 right-3 rounded px-2 py-1 text-xs font-semibold"
              >
                -{product.discountPercentage.toFixed(0)}%
              </motion.div>
            )}

            <motion.button
              initial={{ y: "100%", opacity: 0 }}
              animate={{
                y: isHovered ? 0 : "100%",
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              onClick={handleAddToCart}
              disabled={isAdding}
              className="bg-primary text-primary-foreground hover:bg-primary/90 absolute right-0 bottom-0 left-0 flex cursor-pointer items-center justify-center gap-2 py-2 font-medium"
              aria-label={`Add ${product.title} to cart`}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart size={18} />
              {isAdding ? "Adding..." : "Add to Cart"}
            </motion.button>
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
                  {product.discountPercentage && (
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
