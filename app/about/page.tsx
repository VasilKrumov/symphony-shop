import type { Metadata } from "next"
import { CheckIcon } from "@/components/icons/check-icon"
import { ClockIcon } from "@/components/icons/clock-icon"
import { ThumbsUpIcon } from "@/components/icons/thumbs-up-icon"

export const metadata: Metadata = {
  title: "About Us - Symphony's Shop",
  description: "Learn more about our story and mission",
}

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <article className="space-y-12">
        <header className="space-y-4 text-center">
          <h1 className="font-serif text-5xl font-bold text-balance md:text-6xl">About Our Store</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl text-pretty">
            Curating exceptional products for discerning customers since 2025
          </p>
        </header>

        <section className="prose prose-lg max-w-none space-y-6" aria-labelledby="story-heading">
          <div className="space-y-4">
            <h2 id="story-heading" className="font-serif text-3xl font-semibold">
              Our Story
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe that shopping should be an experience, not just a transaction. Our carefully curated collection
              brings together the finest products from around the world, each selected for its quality, design, and
              craftsmanship.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What started as a passion project has grown into a destination for those who appreciate the finer things
              in life. We work directly with artisans and manufacturers to ensure every product meets our exacting
              standards.
            </p>
          </div>
          <div className="space-y-4 pt-8">
            <h2 id="mission-heading" className="font-serif text-3xl font-semibold">
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To provide an exceptional shopping experience by offering premium products, outstanding customer service,
              and a seamless online platform that makes discovering and purchasing your favorite items effortless.
            </p>
          </div>
        </section>
        <section className="grid gap-8 pt-8 md:grid-cols-3" aria-label="Our values">
          <div className="space-y-3">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <CheckIcon className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-semibold">Quality First</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every product is carefully vetted to ensure it meets our high standards for quality and durability.
            </p>
          </div>
          <div className="space-y-3">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <ClockIcon className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-semibold">Fast Delivery</h3>
            <p className="text-muted-foreground leading-relaxed">
              We partner with reliable shipping providers to ensure your orders arrive quickly and safely.
            </p>
          </div>
          <div className="space-y-3">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <ThumbsUpIcon className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-semibold">Customer Care</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our dedicated support team is always ready to help with any questions or concerns you may have.
            </p>
          </div>
        </section>
      </article>
    </main>
  )
}
