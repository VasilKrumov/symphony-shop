import { productSchema, productsResponseSchema, type Product } from "@/lib/schemas/product"

const API_BASE = "https://dummyjson.com"

export async function getProducts(limit = 30, skip = 0) {
  const response = await fetch(`${API_BASE}/products?limit=${limit}&skip=${skip}`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  const data = await response.json()
  const parsedData = productsResponseSchema.parse(data)

  const groupedByCategory = parsedData.products.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = []
      }
      acc[product.category].push(product)
      return acc
    },
    {} as Record<string, Product[]>,
  )

  return {
    ...parsedData,
    groupedByCategory,
    categories: Object.keys(groupedByCategory).sort(),
  }
}

export async function getProductsByCategory(category: string) {
  const response = await fetch(`${API_BASE}/products/category/${category}`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch products for category: ${category}`)
  }

  const data = await response.json()
  return productsResponseSchema.parse(data)
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }

  const data = await response.json()
  return productSchema.parse(data)
}

export async function searchProducts(query: string) {
  const response = await fetch(`${API_BASE}/products/search?q=${query}`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error("Failed to search products")
  }

  const data = await response.json()
  return productsResponseSchema.parse(data)
}
