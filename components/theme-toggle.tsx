"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  isScrolled?: boolean
  isHomePage?: boolean
}

export function ThemeToggle({ isScrolled = true, isHomePage = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Undvik hydration mismatch genom att vänta tills komponenten är monterad
  useEffect(() => {
    setMounted(true)
  }, [])

  // Enkel toggle-funktion
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Visa en placeholder under server-rendering
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className={cn("w-9 h-9", !isScrolled && isHomePage && "text-white hover:text-gray-300 hover:bg-white/10")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "w-9 h-9 relative",
        !isScrolled && isHomePage && "text-white hover:text-gray-300 hover:bg-white/10",
      )}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

