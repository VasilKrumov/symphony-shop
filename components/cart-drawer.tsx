"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ShoppingCart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [mounted, setMounted] = useState(false)
  const [showClearDialog, setShowClearDialog] = useState(false)
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
            role="presentation"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="bg-background fixed top-0 right-0 z-50 h-full w-full max-w-md shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className="flex h-full flex-col">
              <div className="border-border flex items-center justify-between border-b p-6">
                <h2 id="cart-title" className="font-serif text-lg font-medium">
                  Shopping Cart
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="hover:bg-muted rounded-lg p-2"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex h-full flex-col items-center justify-center gap-4 text-center"
                  >
                    <ShoppingCart className="text-muted-foreground h-12 w-12" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-2 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowClearDialog(true)}
                        className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                      >
                        Clear all items
                      </motion.button>
                    </div>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="border-border/50">
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <Link
                                href={`/products/${item.id}`}
                                onClick={onClose}
                                className="bg-muted relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md hover:opacity-80 transition-opacity"
                              >
                                <Image
                                  src={item.thumbnail}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                  sizes="96px"
                                />
                              </Link>
                              <div className="flex-1 space-y-1.5">
                                <Link
                                  href={`/products/${item.id}`}
                                  onClick={onClose}
                                  className="hover:text-primary transition-colors"
                                >
                                  <h3 className="line-clamp-2 text-sm font-medium">{item.title}</h3>
                                </Link>
                                <p className="text-muted-foreground text-sm">${item.price.toFixed(2)}</p>
                                <div className="flex items-center gap-2 pt-1">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="border-border hover:bg-muted rounded border px-2 py-1 text-sm"
                                    aria-label={`Decrease quantity of ${item.title}`}
                                  >
                                    −
                                  </motion.button>
                                  <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="border-border hover:bg-muted rounded border px-2 py-1 text-sm"
                                    aria-label={`Increase quantity of ${item.title}`}
                                  >
                                    +
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => removeItem(item.id)}
                                    className="text-destructive hover:text-destructive/80 ml-auto text-xs"
                                    aria-label={`Remove ${item.title} from cart`}
                                  >
                                    Remove
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>

              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-border space-y-4 border-t p-6"
                >
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Link href="/cart" onClick={onClose} className="block w-full">
                    <Button size="lg" className="w-full">
                      View Cart
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                onClose()
              }}
            >
              Clear cart
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
