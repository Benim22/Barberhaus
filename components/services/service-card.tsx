"use client"

import { useTranslation } from "@/lib/i18n.tsx"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Scissors, RadarIcon as Razor, Sparkles, Baby, Gift, Palette, ShieldPlus, Wand2 } from "lucide-react"

interface ServiceCardProps {
  id: string
  icon: string
  duration: number
  price: number
}

export function ServiceCard({ id, icon, duration, price }: ServiceCardProps) {
  const { t } = useTranslation()

  const getIcon = () => {
    switch (icon) {
      case "scissors":
        return <Scissors className="h-6 w-6 text-secondary" />
      case "razor":
        return <Razor className="h-6 w-6 text-secondary" />
      case "sparkles":
        return <Sparkles className="h-6 w-6 text-secondary" />
      case "child":
        return <Baby className="h-6 w-6 text-secondary" />
      case "razor-sharp":
        return <Razor className="h-6 w-6 text-secondary rotate-45" />
      case "face":
        return <ShieldPlus className="h-6 w-6 text-secondary" />
      case "palette":
        return <Palette className="h-6 w-6 text-secondary" />
      case "scissors-styling":
        return <Wand2 className="h-6 w-6 text-secondary" />
      case "gift":
        return <Gift className="h-6 w-6 text-secondary" />
      default:
        return <Scissors className="h-6 w-6 text-secondary" />
    }
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">{getIcon()}</div>
        <CardTitle>{t(`services.${id}.title`)}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="min-h-[4.5rem]">{t(`services.${id}.description`)}</p>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {duration} {t("common.minutes")}
          </span>
          <span className="font-medium">
            {price} {t("common.sek")}
          </span>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild className="w-full">
          <Link href={`/boka?service=${id}`}>{t("common.bookNow")}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

