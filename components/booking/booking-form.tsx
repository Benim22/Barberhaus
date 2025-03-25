"use client"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n.tsx"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import { createBooking } from "@/lib/supabase"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function BookingForm() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    service: searchParams.get("service") || "",
    barber: "",
    date: undefined as Date | undefined,
    time: "",
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const services = [
    { id: "haircut", name: t("services.haircut.title"), price: 450 },
    { id: "beard", name: t("services.beard.title"), price: 350 },
    { id: "luxury", name: t("services.luxury.title"), price: 950 },
    { id: "kids", name: t("services.kids.title"), price: 350 },
  ]

  const barbers = [
    { id: "1", name: "Alexander Svensson" },
    { id: "2", name: "Marcus Lindholm" },
    { id: "3", name: "Emil Bergman" },
  ]

  const timeSlots = [
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
  ]

  // Define step labels directly
  const stepLabels = [
    t("booking.steps.service"),
    t("booking.steps.barber"),
    t("booking.steps.date"),
    t("booking.steps.time"),
    t("booking.steps.info"),
    t("booking.steps.confirm"),
  ]

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (
      !formData.service ||
      !formData.barber ||
      !formData.date ||
      !formData.time ||
      !formData.name ||
      !formData.email ||
      !formData.phone
    ) {
      setError(t("booking.form.errorMessage"))
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      await createBooking({
        service_id: formData.service,
        barber_id: formData.barber,
        date: format(formData.date, "yyyy-MM-dd"),
        time_slot: formData.time,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
      })

      setIsSuccess(true)
    } catch (err) {
      console.error(err)
      setError(t("booking.form.errorMessage"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSelectedService = () => {
    return services.find((s) => s.id === formData.service)
  }

  const getSelectedBarber = () => {
    return barbers.find((b) => b.id === formData.barber)
  }

  if (isSuccess) {
    return (
      <Card className="p-8 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-4">{t("booking.form.successMessage")}</h2>
        <p className="mb-6">
          {t("common.service")}: {getSelectedService()?.name}
          <br />
          {t("common.barber")}: {getSelectedBarber()?.name}
          <br />
          {t("common.date")}: {formData.date ? format(formData.date, "yyyy-MM-dd") : ""}
          <br />
          {t("common.time")}: {formData.time}
        </p>
        <Button onClick={() => (window.location.href = "/")}>{t("common.home")}</Button>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`flex flex-col items-center ${i < step ? "text-secondary" : i === step ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  i < step
                    ? "bg-secondary text-white"
                    : i === step
                      ? "border-2 border-secondary"
                      : "border-2 border-muted"
                }`}
              >
                {i}
              </div>
              <span className="text-xs hidden md:block">{stepLabels[i - 1]}</span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-4">{t("booking.steps.service")}</h2>
              <RadioGroup
                value={formData.service}
                onValueChange={(value) => handleChange("service", value)}
                className="space-y-4"
              >
                {services.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={service.id} id={service.id} />
                    <Label htmlFor={service.id} className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>{service.name}</span>
                        <span>
                          {service.price} {t("common.sek")}
                        </span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-4">{t("booking.steps.barber")}</h2>
              <RadioGroup
                value={formData.barber}
                onValueChange={(value) => handleChange("barber", value)}
                className="space-y-4"
              >
                {barbers.map((barber) => (
                  <div key={barber.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={barber.id} id={`barber-${barber.id}`} />
                    <Label htmlFor={`barber-${barber.id}`} className="cursor-pointer">
                      {barber.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-4">{t("booking.steps.date")}</h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : <span>{t("booking.form.dateLabel")}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => handleChange("date", date)}
                    initialFocus
                    disabled={(date) => {
                      // Disable past dates and Sundays
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      return date < today || date.getDay() === 0
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold mb-4">{t("booking.steps.time")}</h2>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.length > 0 ? (
                  timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={formData.time === time ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handleChange("time", time)}
                    >
                      {time}
                    </Button>
                  ))
                ) : (
                  <p className="col-span-4 text-center py-4">{t("booking.form.noTimesAvailable")}</p>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-xl font-bold mb-4">{t("booking.steps.info")}</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">{t("booking.form.nameLabel")}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder={t("booking.form.namePlaceholder")}
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t("booking.form.emailLabel")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder={t("booking.form.emailPlaceholder")}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t("booking.form.phoneLabel")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder={t("booking.form.phonePlaceholder")}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="text-xl font-bold mb-4">{t("booking.steps.confirm")}</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">{t("common.service")}:</span>
                  <span>{getSelectedService()?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">{t("common.barber")}:</span>
                  <span>{getSelectedBarber()?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">{t("common.date")}:</span>
                  <span>{formData.date ? format(formData.date, "yyyy-MM-dd") : ""}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">{t("common.time")}:</span>
                  <span>{formData.time}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">{t("common.name")}:</span>
                  <span>{formData.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">{t("common.email")}:</span>
                  <span>{formData.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">{t("common.phone")}:</span>
                  <span>{formData.phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">{t("common.price")}:</span>
                  <span className="font-bold">
                    {getSelectedService()?.price} {t("common.sek")}
                  </span>
                </div>
              </div>

              {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">{error}</div>}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        {step > 1 && (
          <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
            {t("common.previous")}
          </Button>
        )}
        {step < 6 ? (
          <Button
            onClick={nextStep}
            disabled={
              (step === 1 && !formData.service) ||
              (step === 2 && !formData.barber) ||
              (step === 3 && !formData.date) ||
              (step === 4 && !formData.time) ||
              (step === 5 && (!formData.name || !formData.email || !formData.phone))
            }
            className="ml-auto"
          >
            {t("common.next")}
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting} className="ml-auto">
            {isSubmitting ? t("common.loading") : t("booking.form.confirmButton")}
          </Button>
        )}
      </div>
    </Card>
  )
}

