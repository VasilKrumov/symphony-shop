import type { Metadata } from "next"

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
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-semibold">Quality First</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every product is carefully vetted to ensure it meets our high standards for quality and durability.
            </p>
          </div>
          <div className="space-y-3">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-semibold">Fast Delivery</h3>
            <p className="text-muted-foreground leading-relaxed">
              We partner with reliable shipping providers to ensure your orders arrive quickly and safely.
            </p>
          </div>
          <div className="space-y-3">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
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
