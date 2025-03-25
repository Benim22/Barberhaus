"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/i18n.tsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { LogOut, CalendarIcon, Users, BarChart, Clock } from "lucide-react"
import { AdminBookings } from "@/components/admin/admin-bookings"
import { AdminCustomers } from "@/components/admin/admin-customers"
import { AdminAnalytics } from "@/components/admin/admin-analytics"
import { AdminAvailability } from "@/components/admin/admin-availability"

export function AdminDashboard() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("bookings")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user)
      }
    }

    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">{t("admin.dashboard.welcome")}</h2>
          {user && <p className="text-muted-foreground">{user.email}</p>}
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          {t("common.logout")}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="bookings">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {t("admin.dashboard.bookings")}
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="mr-2 h-4 w-4" />
            {t("admin.dashboard.customers")}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="mr-2 h-4 w-4" />
            {t("admin.dashboard.analytics")}
          </TabsTrigger>
          <TabsTrigger value="availability">
            <Clock className="mr-2 h-4 w-4" />
            {t("admin.dashboard.availability")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <AdminBookings />
        </TabsContent>

        <TabsContent value="customers">
          <AdminCustomers />
        </TabsContent>

        <TabsContent value="analytics">
          <AdminAnalytics />
        </TabsContent>

        <TabsContent value="availability">
          <AdminAvailability />
        </TabsContent>
      </Tabs>
    </div>
  )
}

