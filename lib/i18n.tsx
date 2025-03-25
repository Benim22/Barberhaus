"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations } from "@/content/content"

type Language = "sv" | "en" | "ar"
type TranslationFunction = (key: string, params?: Record<string, string>) => string

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationFunction
  dir: "ltr" | "rtl"
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("sv")
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  useEffect(() => {
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["sv", "en", "ar"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Update direction based on language
    setDir(language === "ar" ? "rtl" : "ltr")

    // Save language preference
    localStorage.setItem("language", language)

    // Update HTML lang and dir attributes
    document.documentElement.lang = language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
  }, [language])

  const t: TranslationFunction = (key, params = {}) => {
    const keys = key.split(".")
    let value = translations[language]

    for (const k of keys) {
      if (!value[k]) {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
      value = value[k]
    }

    if (typeof value !== "string") {
      console.warn(`Translation value is not a string: ${key}`)
      return key
    }

    // Replace parameters
    let result = value
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      result = result.replace(`{{${paramKey}}}`, paramValue)
    })

    return result
  }

  return <I18nContext.Provider value={{ language, setLanguage, t, dir }}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within an I18nProvider")
  }
  return context
} 