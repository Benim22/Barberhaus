"use client"

import type React from "react"

import { I18nProvider } from "@/lib/i18n.tsx"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>
}

