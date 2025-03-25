"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n.tsx"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function Navbar() {
  const { t, dir } = useTranslation()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // Check if we're on the homepage
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if scrolled
      setIsScrolled(currentScrollY > 10)

      // Determine scroll direction and visibility
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold
        setIsVisible(false)
      } else {
        // Scrolling up or at top
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 pt-4",
          isVisible ? "transform-none" : "-translate-y-full",
        )}
      >
        <header
          className={cn(
            "transition-all duration-300 w-full",
            isScrolled || !isHomePage
              ? "bg-background/95 backdrop-blur-sm shadow-lg rounded-full py-2 max-w-7xl mx-auto"
              : "bg-transparent py-4",
          )}
          dir={dir}
        >
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-playfair font-bold gold-gradient">Barberhaus</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={cn(
                  "transition-colors",
                  isScrolled || !isHomePage
                    ? "text-foreground hover:text-muted-foreground"
                    : "text-white hover:text-gray-300",
                )}
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/tjanster"
                className={cn(
                  "transition-colors",
                  isScrolled || !isHomePage
                    ? "text-foreground hover:text-muted-foreground"
                    : "text-white hover:text-gray-300",
                )}
              >
                {t("nav.services")}
              </Link>
              <Link
                href="/boka"
                className={cn(
                  "transition-colors",
                  isScrolled || !isHomePage
                    ? "text-foreground hover:text-muted-foreground"
                    : "text-white hover:text-gray-300",
                )}
              >
                {t("nav.booking")}
              </Link>
              <Link
                href="/kontakt"
                className={cn(
                  "transition-colors",
                  isScrolled || !isHomePage
                    ? "text-foreground hover:text-muted-foreground"
                    : "text-white hover:text-gray-300",
                )}
              >
                {t("nav.contact")}
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-2">
              <ThemeToggle isScrolled={isScrolled || !isHomePage} isHomePage={isHomePage} />
              <LanguageSwitcher isScrolled={isScrolled || !isHomePage} />
              <Button asChild className={cn(!isScrolled && isHomePage && "bg-white text-black hover:bg-gray-200")}>
                <Link href="/boka">{t("common.bookNow")}</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggle isScrolled={isScrolled || !isHomePage} isHomePage={isHomePage} />
              <LanguageSwitcher isScrolled={isScrolled || !isHomePage} />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSidebarOpen(true)}
                className={!isScrolled && isHomePage ? "text-white hover:text-gray-300 hover:bg-white/10" : ""}
              >
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen} />
    </>
  )
}

