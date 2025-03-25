"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/i18n.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import { toast } from "@/components/ui/use-toast"

export function AdminAvailability() {
  const { t } = useTranslation()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedBarber, setSelectedBarber] = useState<string>("1")
  const [isAvailable, setIsAvailable] = useState(true)
  const [startTime, setStartTime] = useState("10:00")
  const [endTime, setEndTime] = useState("18:00")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const barbers = [
    { id: "1", name: "Alexander Svensson" },
    { id: "2", name: "Marcus Lindholm" },
    { id: "3", name: "Emil Bergman" },
  ]

  const timeOptions = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ]

  useEffect(() => {
    if (selectedDate && selectedBarber) {
      fetchAvailability()
    }
  }, [selectedDate, selectedBarber])

  const fetchAvailability = async () => {
    if (!selectedDate) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("barber_schedules")
        .select("*")
        .eq("barber_id", selectedBarber)
        .eq("date", format(selectedDate, "yyyy-MM-dd"))
        .single()

      if (error && error.code !== "PGRST116") {
        throw error
      }

      if (data) {
        setIsAvailable(data.available)
        setStartTime(data.start_time || "10:00")
        setEndTime(data.end_time || "18:00")
      } else {
        // Default values if no schedule exists
        setIsAvailable(true)
        setStartTime("10:00")
        setEndTime("18:00")
      }
    } catch (error) {
      console.error("Error fetching availability:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveAvailability = async () => {
    if (!selectedDate) return

    setSaving(true)
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd")

      const { data, error } = await supabase
        .from("barber_schedules")
        .upsert({
          barber_id: selectedBarber,
          date: formattedDate,
          available: isAvailable,
          start_time: startTime,
          end_time: endTime,
        })
        .select()

      if (error) throw error

      toast({
        title: "Schedule updated",
        description: `Availability for ${format(selectedDate, "MMMM d, yyyy")} has been updated.`,
      })
    } catch (error) {
      console.error("Error saving availability:", error)
      toast({
        title: "Error",
        description: "Failed to update schedule. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
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
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""} {t("admin.dashboard.availability")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p>{t("common.loading")}</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="availability-toggle" className="text-base">
                  Available
                </Label>
                <Switch id="availability-toggle" checked={isAvailable} onCheckedChange={setIsAvailable} />
              </div>

              {isAvailable && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-time" className="block mb-2">
                        Start Time
                      </Label>
                      <Select value={startTime} onValueChange={setStartTime} disabled={!isAvailable}>
                        <SelectTrigger id="start-time">
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions
                            .filter((time) => time < endTime)
                            .map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="end-time" className="block mb-2">
                        End Time
                      </Label>
                      <Select value={endTime} onValueChange={setEndTime} disabled={!isAvailable}>
                        <SelectTrigger id="end-time">
                          <SelectValue placeholder="End time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions
                            .filter((time) => time > startTime)
                            .map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              <Button onClick={saveAvailability} className="w-full" disabled={saving}>
                {saving ? "Saving..." : "Save Availability"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

