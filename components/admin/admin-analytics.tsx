"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/i18n.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"

export function AdminAnalytics() {
  const { t } = useTranslation()
  const [bookingsData, setBookingsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("week")

  useEffect(() => {
    fetchAnalyticsData()
  }, [timeframe])

  const fetchAnalyticsData = async () => {
    setLoading(true)
    try {
      // In a real app, this would be a proper analytics query
      // For this demo, we'll simulate it with mock data

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      const mockData = generateMockData(timeframe)
      setBookingsData(mockData)
    } catch (error) {
      console.error("Error fetching analytics data:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockData = (timeframe: string) => {
    // Generate labels based on timeframe
    let labels: string[] = []
    if (timeframe === "week") {
      labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    } else if (timeframe === "month") {
      labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
    } else {
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }

    // Generate random booking counts
    const bookingCounts = labels.map(() => Math.floor(Math.random() * 10) + 1)

    // Generate service distribution
    const serviceData = {
      labels: ["Haircut", "Beard Trim", "Luxury Treatment", "Kids Cut"],
      datasets: [
        {
          label: "Services",
          data: [40, 25, 20, 15],
          backgroundColor: ["#000000", "#C9A94D", "#1B1B1B", "#555555"],
        },
      ],
    }

    // Generate revenue data
    const revenueData = {
      labels,
      datasets: [
        {
          label: "Revenue (SEK)",
          data: labels.map(() => Math.floor(Math.random() * 5000) + 2000),
          borderColor: "#C9A94D",
          backgroundColor: "rgba(201, 169, 77, 0.1)",
          tension: 0.4,
        },
      ],
    }

    return {
      bookings: {
        labels,
        datasets: [
          {
            label: "Bookings",
            data: bookingCounts,
            backgroundColor: "#000000",
          },
        ],
      },
      services: serviceData,
      revenue: revenueData,
      totalBookings: bookingCounts.reduce((a, b) => a + b, 0),
      totalRevenue: Math.floor(Math.random() * 50000) + 20000,
      averageBookingsPerDay: Math.floor(bookingCounts.reduce((a, b) => a + b, 0) / labels.length),
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>{t("common.loading")}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t("admin.dashboard.analytics")}</h2>
        <Tabs value={timeframe} onValueChange={setTimeframe}>
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{bookingsData.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 20) + 1}% from previous {timeframe}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{bookingsData.totalRevenue} SEK</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 15) + 1}% from previous {timeframe}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Bookings Per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{bookingsData.averageBookingsPerDay}</div>
            <p className="text-xs text-muted-foreground">
              {Math.random() > 0.5 ? "+" : "-"}
              {Math.floor(Math.random() * 10) + 1}% from previous {timeframe}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bookings Overview</CardTitle>
            <CardDescription>Number of bookings over time</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={bookingsData.bookings} className="aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
            <CardDescription>Popularity of different services</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart data={bookingsData.services} className="aspect-[4/3]" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Revenue generated over time</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart data={bookingsData.revenue} className="aspect-[3/1]" />
        </CardContent>
      </Card>
    </div>
  )
}

