"use client"

import { useState } from "react"
import { useCartStore } from "@/lib/store/cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const [showClearDialog, setShowClearDialog] = useState(false)
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore()
  const totalPrice = getTotalPrice()

  const handleClearCart = () => {
    setShowClearDialog(true)
  }

  if (items.length === 0) {
    return (
      <main className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <ShoppingBag className="text-muted-foreground mx-auto h-16 w-16" />
            <h1 className="font-serif text-4xl font-medium">Your cart is empty</h1>
            <p className="text-muted-foreground">Discover our curated collection and find something special</p>
            <Link href="/">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="font-serif text-4xl font-medium">Shopping Cart</h1>
            <Button
              variant="ghost"
              onClick={handleClearCart}
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all items
            </Button>
          </div>

          <div className="mb-8 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="bg-muted relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex justify-between">
                          <div>
                            <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                              {item.title}
                            </Link>
                            <p className="text-muted-foreground text-sm">{item.category}</p>
                          </div>
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive h-8 w-8"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="text-muted-foreground flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-border/40 border-t pt-4">
                  <div className="flex justify-between text-xl font-semibold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
                <Link href="/">
                  <Button variant="ghost" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear your cart?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove all items from your shopping cart. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                clearCart()
                setShowClearDialog(false)
              }}
            >
              Clear cart
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}
