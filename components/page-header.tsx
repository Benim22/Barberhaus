"use client"

import { useTranslation } from "@/lib/i18n.tsx"

interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  const { t } = useTranslation()

  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{t(title)}</h1>
      <p className="text-lg text-muted-foreground">{t(description)}</p>
    </div>
  )
}

