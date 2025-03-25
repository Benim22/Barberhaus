"use client"

import { useTranslation } from "@/lib/i18n.tsx"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactInfo() {
  const { t } = useTranslation()

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6 font-playfair">{t("contact.info.title")}</h2>

        <div className="space-y-4">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-secondary mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">{t("contact.info.addressTitle")}</h3>
              <p className="text-muted-foreground">{t("footer.address")}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Phone className="h-5 w-5 text-secondary mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">{t("contact.info.phoneTitle")}</h3>
              <p className="text-muted-foreground">{t("footer.phone")}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Mail className="h-5 w-5 text-secondary mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">{t("contact.info.emailTitle")}</h3>
              <p className="text-muted-foreground">{t("footer.email")}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="h-5 w-5 text-secondary mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">{t("contact.info.hoursTitle")}</h3>
              <p className="text-muted-foreground">{t("footer.monday")}</p>
              <p className="text-muted-foreground">{t("footer.tuesday")}</p>
              <p className="text-muted-foreground">{t("footer.wednesday")}</p>
              <p className="text-muted-foreground">{t("footer.thursday")}</p>
              <p className="text-muted-foreground">{t("footer.friday")}</p>
              <p className="text-muted-foreground">{t("footer.saturday")}</p>
              <p className="text-muted-foreground">{t("footer.sunday")}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

