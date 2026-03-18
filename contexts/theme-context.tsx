"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type ThemeType = "gold" | "blue" | "yellow"

interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const themes: Record<ThemeType, string> = {
  gold: "theme-gold",
  blue: "theme-blue",
  yellow: "theme-yellow",
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("gold")
  const [mounted, setMounted] = useState(false)

  // মাউন্ট হওয়ার পর localStorage থেকে theme পড়ুন
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("law-firm-theme") as ThemeType
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      applyTheme("gold")
    }
  }, [])

  // Theme apply করার function
  const applyTheme = (newTheme: ThemeType) => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement
      
      // সব existing theme classes সরান
      root.classList.remove("theme-gold", "theme-blue", "theme-yellow")
      
      // নতুন theme class যোগ করুন
      root.classList.add(themes[newTheme])
    }
  }

  // Theme change handler
  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme)
    applyTheme(newTheme)
    if (typeof window !== 'undefined') {
      localStorage.setItem("law-firm-theme", newTheme)
    }
  }

  // মাউন্ট না হওয়া পর্যন্ত null return করুন (hydration mismatch এড়াতে)
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}