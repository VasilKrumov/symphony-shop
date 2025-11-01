"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useCartStore } from "@/lib/store/cart-store"
import type { Product } from "@/lib/schemas/product"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 400))
    addItem(product)
    setLoading(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button onClick={handleAddToCart} size="lg" className="w-full sm:w-auto" disabled={added || loading}>
      {loading ? (
        <>
          <Spinner size="sm" className="mr-2" />
          Adding...
        </>
      ) : added ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
