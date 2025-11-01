import { useCartStore } from "@/lib/store/cart-store"
import type { Product } from "@/lib/schemas/product"

const createMockProduct = (id: number, price: number): Product => ({
  id,
  title: `Test Product ${id}`,
  description: `Description for product ${id}`,
  category: "test",
  price,
  discountPercentage: 0,
  rating: 4.5,
  stock: 10,
  brand: "Test Brand",
  images: [`https://example.com/image${id}.jpg`],
  thumbnail: `https://example.com/thumb${id}.jpg`,
})

describe("Cart Store", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  describe("Adding products", () => {
    it("adds item to cart", () => {
      const { addItem } = useCartStore.getState()
      const product = createMockProduct(1, 10)

      addItem(product)

      const { items } = useCartStore.getState()
      expect(items).toHaveLength(1)
      expect(items[0].id).toBe(1)
      expect(items[0].quantity).toBe(1)
    })

    it("increases quantity when adding existing item", () => {
      const { addItem } = useCartStore.getState()
      const product = createMockProduct(1, 10)

      addItem(product)
      addItem(product)

      const { items } = useCartStore.getState()
      expect(items).toHaveLength(1)
      expect(items[0].quantity).toBe(2)
    })

    it("adds multiple different products", () => {
      const { addItem } = useCartStore.getState()
      const product1 = createMockProduct(1, 10)
      const product2 = createMockProduct(2, 20)
      const product3 = createMockProduct(3, 30)

      addItem(product1)
      addItem(product2)
      addItem(product3)

      const { items } = useCartStore.getState()
      expect(items).toHaveLength(3)
      expect(items[0].id).toBe(1)
      expect(items[1].id).toBe(2)
      expect(items[2].id).toBe(3)
    })
  })

  describe("Removing products", () => {
    it("removes item from cart", () => {
      const { addItem, removeItem } = useCartStore.getState()
      const product = createMockProduct(1, 10)

      addItem(product)
      removeItem(1)

      const { items } = useCartStore.getState()
      expect(items).toHaveLength(0)
    })

    it("removes only the specified item", () => {
      const { addItem, removeItem } = useCartStore.getState()
      const product1 = createMockProduct(1, 10)
      const product2 = createMockProduct(2, 20)

      addItem(product1)
      addItem(product2)
      removeItem(1)

      const { items } = useCartStore.getState()
      expect(items).toHaveLength(1)
      expect(items[0].id).toBe(2)
    })

    it("handles removing non-existent item gracefully", () => {
      const { addItem, removeItem } = useCartStore.getState()
      const product = createMockProduct(1, 10)

      addItem(product)
      removeItem(999)

      const { items } = useCartStore.getState()
      expect(items).toHaveLength(1)
    })
  })

  describe("Updating quantity", () => {
    it("updates item quantity", () => {
      const { addItem, updateQuantity } = useCartStore.getState()
      const product = createMockProduct(1, 10)

      addItem(product)
      updateQuantity(1, 5)

      const { items } = useCartStore.getState()
      expect(items[0].quantity).toBe(5)
    })

    it("removes item when quantity is set to 0", () => {
      const { addItem, updateQuantity } = useCartStore.getState()
      const product = createMockProduct(1, 10)

      addItem(product)
      updateQuantity(1, 0)

      const { items } = useCartStore.getState()
      expect(items).toHaveLength(0)
    })

    it("removes item when quantity is negative", () => {
      const { addItem, updateQuantity } = useCartStore.getState()
      const product = createMockProduct(1, 10)

      addItem(product)
      updateQuantity(1, -1)

      const { items } = useCartStore.getState()
      expect(items).toHaveLength(0)
    })
  })

  describe("Clearing cart", () => {
    it("clears all items from cart", () => {
      const { addItem, clearCart } = useCartStore.getState()
      const product1 = createMockProduct(1, 10)
      const product2 = createMockProduct(2, 20)

      addItem(product1)
      addItem(product2)
      clearCart()

      const { items } = useCartStore.getState()
      expect(items).toHaveLength(0)
    })

    it("handles clearing empty cart", () => {
      const { clearCart } = useCartStore.getState()

      clearCart()

      const { items } = useCartStore.getState()
      expect(items).toHaveLength(0)
    })
  })

  describe("Cart calculations", () => {
    it("calculates total price correctly", () => {
      const { addItem, getTotalPrice } = useCartStore.getState()
      const product1 = createMockProduct(1, 10)
      const product2 = createMockProduct(2, 20)

      addItem(product1)
      addItem(product1)
      addItem(product2)

      expect(getTotalPrice()).toBe(40)
    })

    it("calculates total items correctly", () => {
      const { addItem, getTotalItems } = useCartStore.getState()
      const product1 = createMockProduct(1, 10)
      const product2 = createMockProduct(2, 20)

      addItem(product1)
      addItem(product1)
      addItem(product2)

      expect(getTotalItems()).toBe(3)
    })

    it("returns 0 for empty cart total price", () => {
      const { getTotalPrice } = useCartStore.getState()
      expect(getTotalPrice()).toBe(0)
    })

    it("returns 0 for empty cart total items", () => {
      const { getTotalItems } = useCartStore.getState()
      expect(getTotalItems()).toBe(0)
    })
  })
})
