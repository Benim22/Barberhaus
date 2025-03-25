"use client"

import { useTranslation } from "@/lib/i18n.tsx"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export function FeaturedBarbers() {
  const { t, dir } = useTranslation()

  const barbers = [
    {
      id: 1,
      name: "Alexander Svensson",
      title: "Master Barber",
      image: "/placeholder.svg?height=400&width=300",
      bio: "Med över 15 års erfarenhet är Alexander en mästare på klassiska herrfrisyrer.",
      bioEn: "With over 15 years of experience, Alexander is a master of classic men's hairstyles.",
      bioAr: "مع أكثر من 15 عامًا من الخبرة، ألكسندر هو سيد تصفيفات الشعر الكلاسيكية للرجال.",
    },
    {
      id: 2,
      name: "Marcus Lindholm",
      title: "Senior Barber",
      image: "/placeholder.svg?height=400&width=300",
      bio: "Marcus specialiserar sig på skäggvård och moderna frisyrer med en touch av vintage.",
      bioEn: "Marcus specializes in beard care and modern hairstyles with a touch of vintage.",
      bioAr: "ماركوس متخصص في العناية باللحية وتصفيفات الشعر الحديثة بلمسة من الطراز القديم.",
    },
    {
      id: 3,
      name: "Emil Bergman",
      title: "Style Expert",
      image: "/placeholder.svg?height=400&width=300",
      bio: "Emil har ett öga för detaljer och är expert på att skapa personliga stilar.",
      bioEn: "Emil has an eye for details and is an expert at creating personalized styles.",
      bioAr: "إميل لديه عين للتفاصيل وهو خبير في إنشاء الأساليب الشخصية.",
    },
  ]

  const getBio = (barber: (typeof barbers)[0]) => {
    if (dir === "rtl") return barber.bioAr
    return t("language") === "en" ? barber.bioEn : barber.bio
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="container mx-auto px-4 py-16" dir={dir}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">{t("home.barbers.title")}</h2>
        <p className="text-lg text-muted-foreground">{t("home.barbers.subtitle")}</p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {barbers.map((barber) => (
          <motion.div key={barber.id} variants={item}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={barber.image || "/placeholder.svg"}
                  alt={barber.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle>{barber.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary font-medium mb-2">{barber.title}</p>
                <p>{getBio(barber)}</p>
              </CardContent>
              <CardFooter className="border-t pt-4"></CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

