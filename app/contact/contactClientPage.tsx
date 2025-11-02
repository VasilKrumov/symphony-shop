"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { EmailIcon } from "@/components/icons/email-icon"
import { PhoneIcon } from "@/components/icons/phone-icon"
import { LocationIcon } from "@/components/icons/location-icon"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactClientPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form submission:", data)

    toast.success("Message sent successfully!", {
      description: "We'll get back to you as soon as possible.",
    })

    reset()
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-16 space-y-4 text-center">
          <h1 className="font-serif text-5xl font-bold text-balance md:text-6xl">Get in Touch</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl text-pretty">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </header>

        <div className="grid gap-12 md:grid-cols-2">
          <section aria-labelledby="contact-form-heading">
            <div className="mb-6 space-y-2">
              <h2 id="contact-form-heading" className="font-serif text-2xl font-semibold">
                Send us a message
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form className="space-y-4" aria-label="Contact form" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" placeholder="Your name" {...register("name")} />
                {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" {...register("email")} />
                {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" placeholder="How can we help?" {...register("subject")} />
                {errors.subject && <p className="text-destructive text-sm">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  {...register("message")}
                />
                {errors.message && <p className="text-destructive text-sm">{errors.message.message}</p>}
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </section>

          <section aria-labelledby="contact-info-heading">
            <div className="mb-8 space-y-2">
              <h2 id="contact-info-heading" className="font-serif text-2xl font-semibold">
                Contact Information
              </h2>
              <p className="text-muted-foreground">
                Prefer to reach out directly? Here are other ways to connect with us.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                  <EmailIcon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">support@symphony.bg</p>
                  <p className="text-muted-foreground text-sm">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                  <PhoneIcon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+359 2 123 4567</p>
                  <p className="text-muted-foreground text-sm">Mon-Fri, 9am-6pm EET</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                  <LocationIcon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Office</h3>
                  <p className="text-muted-foreground">
                    123 Vitosha Boulevard
                    <br />
                    Sofia 1000
                    <br />
                    Bulgaria
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="mb-2 font-semibold">Frequently Asked Questions</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Find answers to common questions about orders, shipping, and returns.
              </p>
              <Link href="/faq">
                <Button variant="outline">View FAQ</Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
