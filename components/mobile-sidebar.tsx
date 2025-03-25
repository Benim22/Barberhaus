"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslation } from "@/lib/i18n.tsx"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Home, Scissors, Calendar, Phone, Clock, MapPin, Mail, Facebook, Instagram, Twitter, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const { t, dir } = useTranslation()
  const pathname = usePathname()
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([])

  // Simulera hämtning av bokningar
  useEffect(() => {
    // I en riktig app skulle detta vara en API-anrop
    const mockBookings = [
      {
        id: 1,
        service: "Hårklippning",
        barber: "Alexander Svensson",
        date: "2023-06-15",
        time: "14:30",
      },
      {
        id: 2,
        service: "Skäggtrimning",
        barber: "Marcus Lindholm",
        date: "2023-06-22",
        time: "10:00",
      },
    ]

    setUpcomingBookings(mockBookings)
  }, [])

  return (
    <Sheet open={open} onOpenChange={onOpenChange} dir={dir}>
      <SheetContent side="left" className="w-[85vw] max-w-md p-0 flex flex-col">
        <SheetHeader className="p-6 text-left border-b">
          <SheetTitle className="flex items-center justify-between">
            <span className="text-2xl font-playfair font-bold gold-gradient">Barberhaus</span>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto">
          {/* Navigation Links */}
          <div className="p-6">
            <nav className="space-y-4">
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  pathname === "/" ? "bg-secondary/20 text-secondary font-medium" : "hover:bg-muted",
                )}
                onClick={() => onOpenChange(false)}
              >
                <Home className="h-5 w-5" />
                <span>{t("nav.home")}</span>
              </Link>

              <Link
                href="/tjanster"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  pathname === "/tjanster" ? "bg-secondary/20 text-secondary font-medium" : "hover:bg-muted",
                )}
                onClick={() => onOpenChange(false)}
              >
                <Scissors className="h-5 w-5" />
                <span>{t("nav.services")}</span>
              </Link>

              <Link
                href="/boka"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  pathname === "/boka" ? "bg-secondary/20 text-secondary font-medium" : "hover:bg-muted",
                )}
                onClick={() => onOpenChange(false)}
              >
                <Calendar className="h-5 w-5" />
                <span>{t("nav.booking")}</span>
              </Link>

              <Link
                href="/kontakt"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  pathname === "/kontakt" ? "bg-secondary/20 text-secondary font-medium" : "hover:bg-muted",
                )}
                onClick={() => onOpenChange(false)}
              >
                <Phone className="h-5 w-5" />
                <span>{t("nav.contact")}</span>
              </Link>
            </nav>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="p-6">
            <h3 className="font-medium text-lg mb-4">{t("contact.info.title")}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{t("contact.info.addressTitle")}</p>
                  <p className="text-muted-foreground">{t("footer.address")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{t("contact.info.phoneTitle")}</p>
                  <p className="text-muted-foreground">{t("footer.phone")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{t("contact.info.emailTitle")}</p>
                  <p className="text-muted-foreground">{t("footer.email")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{t("contact.info.hoursTitle")}</p>
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
          </div>

          <Separator />

          {/* Upcoming Bookings */}
          <div className="p-6">
            <h3 className="font-medium text-lg mb-4">Bokade tider</h3>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="bg-muted p-3 rounded-md">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{booking.service}</span>
                      <span className="text-secondary">{booking.time}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{booking.barber}</span>
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Inga bokade tider</p>
            )}

            <Button asChild className="w-full mt-4">
              <Link href="/boka" onClick={() => onOpenChange(false)}>
                {t("common.bookNow")}
              </Link>
            </Button>
          </div>
        </div>

        <SheetFooter className="p-6 border-t flex-col items-stretch gap-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <a href="https://facebook.com" className="text-foreground hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" className="text-foreground hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://twitter.com" className="text-foreground hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <ThemeToggle isScrolled={true} />
              <LanguageSwitcher isScrolled={true} />
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

