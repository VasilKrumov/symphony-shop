"use client"

import Link from "next/link"
import { ProductCard } from "./product-card"
import type { Product } from "@/lib/schemas/product"
import { motion } from "framer-motion"

interface CategoryGroupProps {
  category: string
  products: Product[]
  showAll?: boolean
}

export function CategoryGroup({ category, products, showAll = false }: CategoryGroupProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const displayProducts = showAll ? products : products.slice(0, 8)

  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="font-serif text-3xl font-medium capitalize">{category}</h2>
          <p className="text-muted-foreground mt-1 text-sm">{products.length} products</p>
        </div>
        {!showAll && (
          <Link
            href={`/products?category=${encodeURIComponent(category)}`}
            className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
          >
            View All →
          </Link>
        )}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {displayProducts.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
