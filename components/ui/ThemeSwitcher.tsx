"use client"

import { Palette, ChevronDown, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useTheme, type ThemeType } from "@/contexts/theme-context"
import { cn } from "@/lib/utils"

const themes: { value: ThemeType; label: string; color: string; bgClass: string }[] = [
  { 
    value: "gold", 
    label: "Gold & Black", 
    color: "bg-amber-500",
    bgClass: "bg-amber-500" 
  },
  { 
    value: "blue", 
    label: "Blue & White", 
    color: "bg-blue-500",
    bgClass: "bg-blue-500" 
  },
  { 
    value: "yellow", 
    label: "Yellow & Black", 
    color: "bg-yellow-400",
    bgClass: "bg-yellow-400" 
  },
]

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const currentTheme = themes.find(t => t.value === theme)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
      >
        <Palette className="h-4 w-4" />
        <span className="hidden sm:inline text-sm">{currentTheme?.label}</span>
        <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-lg bg-popover border border-border shadow-lg overflow-hidden z-50"
          >
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => {
                  setTheme(t.value)
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors",
                  theme === t.value && "bg-primary/10 text-primary"
                )}
              >
                <span className={cn("h-4 w-4 rounded-full", t.color)} />
                <span className="flex-1 text-left">{t.label}</span>
                {theme === t.value && <Check className="h-4 w-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}