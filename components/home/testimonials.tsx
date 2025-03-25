"use client"

import { useTranslation } from "@/lib/i18n.tsx"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function Testimonials() {
  const { t, dir } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Erik Johansson",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "Bästa klippningen jag någonsin fått. Professionell service och avslappnad atmosfär.",
      textEn: "Best haircut I've ever had. Professional service and relaxed atmosphere.",
      textAr: "أفضل قصة شعر حصلت عليها على الإطلاق. خدمة احترافية وأجواء مريحة.",
    },
    {
      id: 2,
      name: "Anders Lindgren",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "Fantastisk skäggtrimning och utmärkt service. Kommer definitivt tillbaka!",
      textEn: "Amazing beard trim and excellent service. Will definitely be back!",
      textAr: "تشذيب لحية مذهل وخدمة ممتازة. سأعود بالتأكيد!",
    },
    {
      id: 3,
      name: "Johan Bergström",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "Lyxbehandlingen var värd varje krona. Känner mig som en ny människa!",
      textEn: "The luxury treatment was worth every penny. I feel like a new person!",
      textAr: "كان العلاج الفاخر يستحق كل قرش. أشعر وكأنني شخص جديد!",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const getTestimonialText = (testimonial: (typeof testimonials)[0]) => {
    if (dir === "rtl") return testimonial.textAr
    return t("language") === "en" ? testimonial.textEn : testimonial.text
  }

  return (
    <section className="bg-muted py-16" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">{t("home.testimonials.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("home.testimonials.subtitle")}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative h-[300px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: index === activeIndex ? 1 : 0,
                  x: index === activeIndex ? 0 : 100,
                }}
                transition={{ duration: 0.5 }}
                style={{ display: index === activeIndex ? "block" : "none" }}
              >
                <Card className="h-full flex flex-col">
                  <CardContent className="flex-1 pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <p className="text-lg italic">{getTestimonialText(testimonial)}</p>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-secondary" : "bg-gray-300"}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

