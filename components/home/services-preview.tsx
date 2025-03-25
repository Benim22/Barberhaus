"use client"

import { useTranslation } from "@/lib/i18n.tsx"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Scissors, RadarIcon as Razor, Sparkles, Baby } from "lucide-react"
import { motion } from "framer-motion"

export function ServicesPreview() {
  const { t, dir } = useTranslation()

  const services = [
    {
      id: "haircut",
      icon: Scissors,
      price: 450,
    },
    {
      id: "beard",
      icon: Razor,
      price: 350,
    },
    {
      id: "luxury",
      icon: Sparkles,
      price: 950,
    },
    {
      id: "kids",
      icon: Baby,
      price: 350,
    },
  ]

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
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">{t("home.services.title")}</h2>
        <p className="text-lg text-muted-foreground">{t("home.services.subtitle")}</p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {services.map((service) => (
          <motion.div key={service.id} variants={item}>
            <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>{t(`services.${service.id}.title`)}</CardTitle>
                <CardDescription>
                  {service.price} {t("common.sek")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="line-clamp-3 h-[4.5rem]">{t(`services.${service.id}.description`)}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button variant="outline" asChild className="w-full">
                  <Link href={`/boka?service=${service.id}`}>{t("common.bookNow")}</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-12">
        <Button asChild variant="secondary">
          <Link href="/tjanster">{t("home.services.viewAll")}</Link>
        </Button>
      </div>
    </section>
  )
}

