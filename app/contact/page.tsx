import type { Metadata } from "next"
import ContactClientPage from "./contactClientPage"

export const metadata: Metadata = {
  title: "Contact Us - Symphony's Shop",
  description: "Get in touch with our team",
}

export default function ContactPage() {
  return <ContactClientPage />
}
