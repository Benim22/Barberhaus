"use client"

import { useTranslation } from "@/lib/i18n.tsx"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  const { t, dir } = useTranslation()

  return (
    <footer id="contact" className="bg-charcoal text-white pt-16 pb-8" dir={dir}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-playfair mb-4 text-gold-DEFAULT">{t("footer.about")}</h3>
            <p className="text-gray-300 mb-4">{t("footer.aboutText")}</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-gold-DEFAULT transition-colors">
                <Facebook />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" className="text-white hover:text-gold-DEFAULT transition-colors">
                <Instagram />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://twitter.com" className="text-white hover:text-gold-DEFAULT transition-colors">
                <Twitter />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-playfair mb-4 text-gold-DEFAULT">{t("footer.contact")}</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">{t("footer.address")}</p>
              <p className="mb-2">{t("footer.phone")}</p>
              <p className="mb-2">{t("footer.email")}</p>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-playfair mb-4 text-gold-DEFAULT">{t("footer.hours")}</h3>
            <ul className="text-gray-300 space-y-1">
              <li>{t("footer.monday")}</li>
              <li>{t("footer.tuesday")}</li>
              <li>{t("footer.wednesday")}</li>
              <li>{t("footer.thursday")}</li>
              <li>{t("footer.friday")}</li>
              <li>{t("footer.saturday")}</li>
              <li>{t("footer.sunday")}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  )
}

