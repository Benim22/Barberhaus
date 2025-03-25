"use client"

import type React from "react"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n.tsx"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export function ContactForm() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>{t("contact.form.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">{t("contact.form.successTitle")}</h3>
            <p className="text-muted-foreground">{t("contact.form.successMessage")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">{t("contact.form.nameLabel")}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder={t("contact.form.namePlaceholder")}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">{t("contact.form.emailLabel")}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder={t("contact.form.emailPlaceholder")}
                required
              />
            </div>
            <div>
              <Label htmlFor="message">{t("contact.form.messageLabel")}</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder={t("contact.form.messagePlaceholder")}
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t("common.loading") : t("contact.form.submitButton")}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

