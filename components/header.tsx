"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Menu, X, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCartStore } from "@/lib/store/cart-store"
import { Button } from "@/components/ui/button"
import { CartDrawer } from "./cart-drawer"
import { SearchDialog } from "./search-dialog"
import { AnimatedText } from "./animated-text"

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const totalItems = useCartStore((state) => state.getTotalItems())

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 border-b backdrop-blur">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2" aria-label="Symphony's Shop home">
              <motion.div
                className="relative"
                initial={{ rotate: 18, x: 4, y: -8 }}
                animate={{ rotate: 18, x: 4, y: -8 }}
                whileHover={{ rotate: 25, scale: 1.1 }}
                whileTap={{ rotate: 25, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{ display: "inline-block", width: "50px", height: "60px" }}
                aria-hidden="true"
              >
                <Image src="/logo.svg" alt="" width={50} height={60} className="text-primary" priority />
              </motion.div>
              <span
                className="text-primary text-4xl font-normal tracking-tight"
                style={{ fontFamily: "var(--font-cursive)" }}
              >
                Symphony's Shop
              </span>
            </Link>

            <div className="mx-8 hidden flex-1 items-center justify-center md:flex">
              <div className="flex items-center gap-8 py-4">
                <Link
                  href="/products"
                  className="text-foreground/80 hover:text-foreground focus:ring-ring rounded-sm px-2 py-1 text-base font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  <AnimatedText text="Shop" />
                </Link>
                <Link
                  href="/about"
                  className="text-foreground/80 hover:text-foreground focus:ring-ring rounded-sm px-2 py-1 text-base font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  <AnimatedText text="About" />
                </Link>
                <Link
                  href="/contact"
                  className="text-foreground/80 hover:text-foreground focus:ring-ring rounded-sm px-2 py-1 text-base font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  <AnimatedText text="Contact" />
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  aria-label="Search products"
                >
                  <Search className="h-6 w-6" aria-hidden="true" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsDrawerOpen(true)}
                  className="focus:ring-ring relative focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  aria-label={`Shopping cart with ${mounted ? totalItems : 0} items`}
                >
                  <ShoppingCart className="h-6 w-6" aria-hidden="true" />
                  {mounted && (
                    <AnimatePresence>
                      {totalItems > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="bg-foreground text-background absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium"
                          aria-live="polite"
                        >
                          {totalItems}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  )}
                </Button>
              </motion.div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none md:hidden"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-border/40 space-y-2 overflow-hidden border-t py-4 md:hidden"
                role="navigation"
                aria-label="Mobile navigation"
              >
                <Link
                  href="/products"
                  className="text-foreground/80 hover:text-foreground focus:ring-ring block rounded-sm px-4 py-2 text-base font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  href="/about"
                  className="text-foreground/80 hover:text-foreground focus:ring-ring block rounded-sm px-4 py-2 text-base font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-foreground/80 hover:text-foreground focus:ring-ring block rounded-sm px-4 py-2 text-base font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  )
}
