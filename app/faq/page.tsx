import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ - Symphony's Shop",
  description: "Frequently asked questions about orders, shipping, and returns",
}

export default function FAQPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <header className="mb-12 space-y-4 text-center">
        <h1 className="font-serif text-5xl font-bold text-balance md:text-6xl">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl text-pretty">
          Find answers to common questions about orders, shipping, and returns
        </p>
      </header>

      <section aria-label="FAQ sections">
        <div className="space-y-8">
          <div>
            <h2 className="mb-4 font-serif text-2xl font-semibold">Orders & Payment</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I place an order?</AccordionTrigger>
                <AccordionContent>
                  Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping
                  information and payment details to complete your order.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All
                  transactions are secure and encrypted.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I modify or cancel my order?</AccordionTrigger>
                <AccordionContent>
                  You can modify or cancel your order within 1 hour of placing it. After that, the order enters
                  processing and cannot be changed. Contact our support team immediately if you need assistance.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl font-semibold">Shipping & Delivery</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-4">
                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                <AccordionContent>
                  Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available for an
                  additional fee. International orders may take 10-15 business days depending on customs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                <AccordionContent>
                  Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.
                  International customers are responsible for any customs duties or import taxes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>How can I track my order?</AccordionTrigger>
                <AccordionContent>
                  Once your order ships, you'll receive a tracking number via email. You can use this number to track
                  your package on our website or the carrier's website.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl font-semibold">Returns & Refunds</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-7">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We offer a 30-day return policy for most items. Products must be unused, in original packaging, and in
                  resalable condition. Some items like personalized products or final sale items cannot be returned.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger>How do I initiate a return?</AccordionTrigger>
                <AccordionContent>
                  Contact our customer service team with your order number and reason for return. We'll provide a return
                  authorization and shipping label. Once we receive and inspect the item, we'll process your refund
                  within 5-7 business days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-9">
                <AccordionTrigger>Who pays for return shipping?</AccordionTrigger>
                <AccordionContent>
                  For defective or incorrect items, we cover return shipping costs. For other returns, customers are
                  responsible for return shipping fees unless otherwise stated in a promotion.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl font-semibold">Product Information</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-10">
                <AccordionTrigger>Are your products authentic?</AccordionTrigger>
                <AccordionContent>
                  Yes, all our products are 100% authentic and sourced directly from authorized distributors and
                  manufacturers. We guarantee the authenticity of every item we sell.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-11">
                <AccordionTrigger>Do you offer product warranties?</AccordionTrigger>
                <AccordionContent>
                  Many of our products come with manufacturer warranties. Warranty terms vary by product and brand.
                  Check the product description for specific warranty information or contact us for details.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-12">
                <AccordionTrigger>How do I know what size to order?</AccordionTrigger>
                <AccordionContent>
                  Each product page includes detailed size charts and measurements. If you're unsure, we recommend
                  checking the size guide or contacting our customer service team for personalized assistance.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  )
}
