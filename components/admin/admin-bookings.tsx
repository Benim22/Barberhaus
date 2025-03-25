"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/i18n.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"

export function AdminBookings() {
  const { t } = useTranslation()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedBarber, setSelectedBarber] = useState<string>("all")
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const barbers = [
    { id: "all", name: "All Barbers" },
    { id: "1", name: "Alexander Svensson" },
    { id: "2", name: "Marcus Lindholm" },
    { id: "3", name: "Emil Bergman" },
  ]

  useEffect(() => {
    fetchBookings()
  }, [selectedDate, selectedBarber])

  const fetchBookings = async () => {
    if (!selectedDate) return

    setLoading(true)
    try {
      let query = supabase.from("bookings").select("*").eq("date", format(selectedDate, "yyyy-MM-dd"))

      if (selectedBarber !== "all") {
        query = query.eq("barber_id", selectedBarber)
      }

      const { data, error } = await query

      if (error) throw error
      setBookings(data || [])
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const getServiceName = (serviceId: string) => {
    const services: Record<string, string> = {
      haircut: t("services.haircut.title"),
      beard: t("services.beard.title"),
      luxury: t("services.luxury.title"),
      kids: t("services.kids.title"),
    }
    return services[serviceId] || serviceId
  }

  const getBarberName = (barberId: string) => {
    const barber = barbers.find((b) => b.id === barberId)
    return barber ? barber.name : barberId
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>{t("common.date")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">{t("common.barber")}</label>
            <Select value={selectedBarber} onValueChange={setSelectedBarber}>
              <SelectTrigger>
                <SelectValue placeholder="Select barber" />
              </SelectTrigger>
              <SelectContent>
                {barbers.map((barber) => (
                  <SelectItem key={barber.id} value={barber.id}>
                    {barber.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""} {t("admin.dashboard.bookings")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p>{t("common.loading")}</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-8">
              <p>No bookings for this date</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("common.time")}</TableHead>
                  <TableHead>{t("common.service")}</TableHead>
                  <TableHead>{t("common.barber")}</TableHead>
                  <TableHead>{t("common.name")}</TableHead>
                  <TableHead>{t("common.phone")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.time_slot}</TableCell>
                    <TableCell>{getServiceName(booking.service_id)}</TableCell>
                    <TableCell>{getBarberName(booking.barber_id)}</TableCell>
                    <TableCell>{booking.customer_name}</TableCell>
                    <TableCell>{booking.customer_phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

