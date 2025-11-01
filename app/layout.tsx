import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/sonner"
import { EasterEggs } from "@/components/easter-eggs"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cursive",
})

export const metadata: Metadata = {
  title: "Symphony - Premium Curated Collection",
  description: "Explore a harmonious collection of carefully selected products for every rhythm of life",
  openGraph: {
    title: "Symphony - Premium Curated Collection",
    description: "Explore a harmonious collection of carefully selected products for every rhythm of life",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Symphony - Premium Curated Collection",
    description: "Explore a harmonious collection of carefully selected products for every rhythm of life",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${greatVibes.variable}`}>
      <body className="font-sans antialiased">
        <EasterEggs />
        <a
          href="#main-content"
          className="focus:bg-primary focus:text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Skip to main content
        </a>
        <Header />
        <div id="main-content" className="animate-page-enter">
          {children}
        </div>
        <Toaster position="top-right" duration={1000} />
        <Analytics />
      </body>
    </html>
  )
}
