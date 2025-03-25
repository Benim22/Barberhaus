import { BookingForm } from "@/components/booking/booking-form"
import { PageHeader } from "@/components/page-header"

export default function BookingPage() {
  // Add padding-top to the container to prevent navbar overlap
  return (
    <div className="container mx-auto py-12 pt-32">
      <PageHeader title="booking.title" description="booking.description" />

      <div className="max-w-3xl mx-auto mt-12">
        <BookingForm />
      </div>
    </div>
  )
}

