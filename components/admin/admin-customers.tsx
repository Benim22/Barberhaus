"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/i18n.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase } from "@/lib/supabase"
import { Search } from "lucide-react"

export function AdminCustomers() {
  const { t } = useTranslation()
  const [customers, setCustomers] = useState<any[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCustomers()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCustomers(customers)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          customer.phone.toLowerCase().includes(query),
      )
      setFilteredCustomers(filtered)
    }
  }, [searchQuery, customers])

  const fetchCustomers = async () => {
    setLoading(true)
    try {
      // In a real app, this would be a proper query to get unique customers
      // For this demo, we'll simulate it with bookings data
      const { data, error } = await supabase
        .from("bookings")
        .select("customer_name, customer_email, customer_phone, created_at")
        .order("created_at", { ascending: false })

      if (error) throw error

      // Create a unique list of customers
      const uniqueCustomers = Array.from(
        new Map(
          data?.map((item) => [
            item.customer_email,
            {
              name: item.customer_name,
              email: item.customer_email,
              phone: item.customer_phone,
              lastVisit: item.created_at,
            },
          ]),
        ).values(),
      )

      setCustomers(uniqueCustomers)
      setFilteredCustomers(uniqueCustomers)
    } catch (error) {
      console.error("Error fetching customers:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("admin.dashboard.customers")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p>{t("common.loading")}</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="text-center py-8">
            <p>No customers found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("common.name")}</TableHead>
                <TableHead>{t("common.email")}</TableHead>
                <TableHead>{t("common.phone")}</TableHead>
                <TableHead>Last Visit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{new Date(customer.lastVisit).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

