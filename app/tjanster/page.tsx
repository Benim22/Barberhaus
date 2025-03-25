import { ServiceCard } from "@/components/services/service-card"
import { PageHeader } from "@/components/page-header"

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12 pt-32">
      <PageHeader title="services.title" description="services.description" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {/* Huvudtjänster */}
        <ServiceCard id="haircut" icon="scissors" duration={45} price={450} />
        <ServiceCard id="beard" icon="razor" duration={30} price={350} />
        <ServiceCard id="luxury" icon="sparkles" duration={90} price={950} />
        <ServiceCard id="kids" icon="child" duration={30} price={350} />

        {/* Nya tjänster */}
        <ServiceCard id="shave" icon="razor-sharp" duration={30} price={400} />
        <ServiceCard id="facial" icon="face" duration={45} price={550} />
        <ServiceCard id="coloring" icon="palette" duration={60} price={650} />
        <ServiceCard id="styling" icon="scissors-styling" duration={30} price={300} />
        <ServiceCard id="package" icon="gift" duration={120} price={1200} />
      </div>
    </div>
  )
}

