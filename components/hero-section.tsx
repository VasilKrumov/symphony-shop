"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  const scrollToCategories = () => {
    const categoriesSection = document.getElementById("categories")
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section
      className="from-background via-muted to-background relative w-full overflow-hidden bg-gradient-to-br"
      aria-label="Hero section"
    >
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="bg-primary/5 absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="bg-accent/5 absolute right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full blur-3xl"
        />
      </div>

      <div className="relative container mx-auto px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-foreground mb-6 font-serif text-5xl leading-tight font-bold sm:text-6xl lg:text-7xl"
          >
            Discover Premium{" "}
            <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">Collections</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg sm:text-xl"
          >
            Explore our hand-picked selection of premium products across diverse categories. Find exactly what you're
            looking for with our intuitive browsing experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.button
              onClick={scrollToCategories}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 py-3 font-semibold shadow-lg transition-colors duration-300"
              aria-label="Scroll to product categories"
            >
              Explore Now
            </motion.button>
            <motion.a
              href="/about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-border bg-background text-foreground hover:bg-muted rounded-lg border px-8 py-3 font-semibold transition-colors duration-300"
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-4 sm:gap-8"
        >
          {[
            { label: "Products", value: "5000+" },
            { label: "Categories", value: "12+" },
            { label: "Happy Customers", value: "50k+" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center"
            >
              <p className="text-foreground text-2xl font-bold sm:text-3xl">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
