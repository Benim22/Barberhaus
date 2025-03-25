import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getAvailableTimeSlots(date: string, barberId: string, serviceId: string) {
  // Get service duration
  const { data: service } = await supabase.from("services").select("duration").eq("id", serviceId).single()

  if (!service) {
    throw new Error("Service not found")
  }

  // Get barber's schedule for the day
  const { data: schedule } = await supabase
    .from("barber_schedules")
    .select("*")
    .eq("barber_id", barberId)
    .eq("date", date)
    .single()

  if (!schedule || !schedule.available) {
    return []
  }

  // Get existing bookings for the barber on that day
  const { data: bookings } = await supabase
    .from("bookings")
    .select("time_slot, service_id")
    .eq("barber_id", barberId)
    .eq("date", date)

  // Calculate available time slots
  const workingHours = {
    start: schedule.start_time || "10:00",
    end: schedule.end_time || "18:00",
  }

  // Generate all possible time slots
  const allTimeSlots = generateTimeSlots(workingHours.start, workingHours.end, 30)

  // Filter out booked slots
  const bookedSlots = new Set(bookings?.map((b) => b.time_slot) || [])

  return allTimeSlots.filter((slot) => !bookedSlots.has(slot))
}

function generateTimeSlots(start: string, end: string, intervalMinutes: number) {
  const slots = []
  const startTime = new Date(`2000-01-01T${start}`)
  const endTime = new Date(`2000-01-01T${end}`)

  let currentTime = startTime
  while (currentTime < endTime) {
    slots.push(currentTime.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" }))
    currentTime = new Date(currentTime.getTime() + intervalMinutes * 60000)
  }

  return slots
}

export async function createBooking(bookingData: {
  service_id: string
  barber_id: string
  date: string
  time_slot: string
  customer_name: string
  customer_email: string
  customer_phone: string
}) {
  const { data, error } = await supabase.from("bookings").insert(bookingData).select()

  if (error) {
    throw error
  }

  return data
}

