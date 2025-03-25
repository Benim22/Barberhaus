"use client"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n.tsx"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface LanguageSwitcherProps {
  isScrolled?: boolean
}

export function LanguageSwitcher({ isScrolled = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useTranslation()
  const [open, setOpen] = useState(false)

  const languages = [
    { code: "sv", name: "Svenska" },
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
  ]

  const handleLanguageChange = (lang: "sv" | "en" | "ar") => {
    setLanguage(lang)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(!isScrolled && "text-white hover:text-gray-300 hover:bg-white/10")}
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code as "sv" | "en" | "ar")}
            className={language === lang.code ? "bg-muted font-medium" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

