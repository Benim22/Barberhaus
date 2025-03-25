import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactMap } from "@/components/contact/contact-map"
import { PageHeader } from "@/components/page-header"

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 pt-32">
      <PageHeader title="contact.title" description="contact.description" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div>
          <ContactInfo />
          <ContactForm />
        </div>
        <div className="h-full min-h-[400px]">
          <ContactMap />
        </div>
      </div>
    </div>
  )
}

