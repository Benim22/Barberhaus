"use client"

import { useTranslation } from "@/lib/i18n.tsx"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function AdminFloatingButton() {
  const { t } = useTranslation()

  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
    >
      <Button 
        size="icon" 
        variant="outline" 
        className="h-12 w-12 rounded-full bg-background border-2 shadow-lg hover:scale-110 transition-transform"
        asChild
      >
        <Link href="/admin/login" aria-label={t("admin.button.aria")}>
          <Shield className="h-5 w-5 text-secondary" />
        </Link>
      </Button>
    </motion.div>
  )
} 