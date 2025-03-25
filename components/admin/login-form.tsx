"use client"

import type React from "react"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n.tsx"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const { t } = useTranslation()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      // Lägg till en kort fördröjning för att säkerställa att sessionen har uppdaterats
      setTimeout(() => {
        // Använd window.location.href istället för router.push för mer kraftfull omdirigering
        window.location.href = "/admin/dashboard"
      }, 500)
    } catch (err: any) {
      console.error(err)
      setError(t("admin.login.errorMessage"))
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("admin.login.title")}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-md">{error}</div>}
          <div className="space-y-2">
            <Label htmlFor="email">{t("admin.login.emailLabel")}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("admin.login.emailPlaceholder")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("admin.login.passwordLabel")}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("admin.login.passwordPlaceholder")}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t("common.loading") : t("admin.login.loginButton")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

