"use client"

import { useTranslation } from "@/lib/i18n.tsx"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export function HeroSection() {
  const { t, dir } = useTranslation()

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" dir={dir}>
      <div className="absolute inset-0 w-full h-full">
        <video autoPlay muted loop playsInline className="absolute inset-0 object-cover w-full h-full">
          <source src="https://videos.pexels.com/video-files/4177798/4177798-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-playfair">{t("home.hero.title")}</h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">{t("home.hero.subtitle")}</p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/boka">{t("home.hero.cta")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

