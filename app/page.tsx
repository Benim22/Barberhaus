import { HeroSection } from "@/components/home/hero-section"
import { ServicesPreview } from "@/components/home/services-preview"
import { Testimonials } from "@/components/home/testimonials"
import { FeaturedBarbers } from "@/components/home/featured-barbers"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroSection />
      <ServicesPreview />
      <Testimonials />
      <FeaturedBarbers />
    </div>
  )
}

