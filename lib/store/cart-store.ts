import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/lib/schemas/product"
import { toast } from "sonner"

export interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)

          if (existingItem) {
            toast.success(`${product.title}`, {
              description: "Quantity increased in your cart",
            })
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          }

          toast.success(`${product.title}`, {
            description: "Added to your cart",
          })
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          }
        })
      },

      removeItem: (productId) => {
        const product = get().items.find((item) => item.id === productId)
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
        if (product) {
          toast.success(`${product.title}`, {
            description: "Removed from your cart",
          })
        }
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => ({
          items: state.items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        }))
      },

      clearCart: () => {
        const itemCount = get().items.length
        set({ items: [] })
        if (itemCount > 0) {
          toast.success("Cart cleared", {
            description: `${itemCount} ${itemCount === 1 ? "item" : "items"} removed`,
          })
        }
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
