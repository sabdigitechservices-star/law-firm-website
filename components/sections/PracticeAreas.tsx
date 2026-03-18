"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { 
  Building2, Scale, Heart, Home, Activity, Globe,
  ArrowRight 
} from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import siteData from "@/data/siteData.json"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { cn } from "@/lib/utils"

const iconMap: Record<string, any> = {
  Building2,
  Scale,
  Heart,
  Home,
  Activity,
  Globe
}

export function PracticeAreas() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { theme } = useTheme()

  // Theme based colors
  const getThemeColors = () => {
    switch(theme) {
      case "gold":
        return {
          primary: "text-amber-500",
          primaryBg: "bg-amber-500",
          primaryBgLight: "bg-amber-500/10",
          primaryBgLighter: "bg-amber-500/20",
          border: "border-amber-500/30",
          shadow: "shadow-amber-500/10",
          hoverBorder: "hover:border-amber-500/50",
          hoverShadow: "hover:shadow-amber-500/20",
          gradient: "from-amber-500/20 via-transparent to-transparent"
        }
      case "blue":
        return {
          primary: "text-blue-500",
          primaryBg: "bg-blue-500",
          primaryBgLight: "bg-blue-500/10",
          primaryBgLighter: "bg-blue-500/20",
          border: "border-blue-500/30",
          shadow: "shadow-blue-500/10",
          hoverBorder: "hover:border-blue-500/50",
          hoverShadow: "hover:shadow-blue-500/20",
          gradient: "from-blue-500/20 via-transparent to-transparent"
        }
      case "yellow":
        return {
          primary: "text-yellow-500",
          primaryBg: "bg-yellow-500",
          primaryBgLight: "bg-yellow-500/10",
          primaryBgLighter: "bg-yellow-500/20",
          border: "border-yellow-500/30",
          shadow: "shadow-yellow-500/10",
          hoverBorder: "hover:border-yellow-500/50",
          hoverShadow: "hover:shadow-yellow-500/20",
          gradient: "from-yellow-500/20 via-transparent to-transparent"
        }
      default:
        return {
          primary: "text-primary",
          primaryBg: "bg-primary",
          primaryBgLight: "bg-primary/10",
          primaryBgLighter: "bg-primary/20",
          border: "border-primary/30",
          shadow: "shadow-primary/10",
          hoverBorder: "hover:border-primary/50",
          hoverShadow: "hover:shadow-primary/20",
          gradient: "from-primary/20 via-transparent to-transparent"
        }
    }
  }

  const colors = getThemeColors()

  // Theme based icon background
  const getIconBgClass = () => {
    switch(theme) {
      case "gold": return "bg-amber-500/10 group-hover:bg-amber-500/20"
      case "blue": return "bg-blue-500/10 group-hover:bg-blue-500/20"
      case "yellow": return "bg-yellow-500/10 group-hover:bg-yellow-500/20"
      default: return "bg-primary/10 group-hover:bg-primary/20"
    }
  }

  // Theme based blur background
  const getBlurBgClass = () => {
    switch(theme) {
      case "gold": return "bg-amber-500/20"
      case "blue": return "bg-blue-500/20"
      case "yellow": return "bg-yellow-500/20"
      default: return "bg-primary/20"
    }
  }

  // Theme based stat badge
  const getStatBadgeClass = () => {
    switch(theme) {
      case "gold": return "bg-amber-500/10 text-amber-500"
      case "blue": return "bg-blue-500/10 text-blue-500"
      case "yellow": return "bg-yellow-500/10 text-yellow-600"
      default: return "bg-primary/10 text-primary"
    }
  }

  return (
    <SectionWrapper className={cn(
      "py-24",
      theme === "gold" && "bg-amber-50/30 dark:bg-amber-950/10",
      theme === "blue" && "bg-blue-50/30 dark:bg-blue-950/10",
      theme === "yellow" && "bg-yellow-50/30 dark:bg-yellow-950/10"
    )}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={cn(
            "text-4xl md:text-5xl font-bold mb-4",
            theme === "gold" && "text-amber-900 dark:text-amber-100",
            theme === "blue" && "text-blue-900 dark:text-blue-100",
            theme === "yellow" && "text-yellow-900 dark:text-yellow-100"
          )}>
            Practice Areas
          </h2>
          <p className={cn(
            "text-xl max-w-2xl mx-auto",
            theme === "gold" && "text-amber-700 dark:text-amber-300",
            theme === "blue" && "text-blue-700 dark:text-blue-300",
            theme === "yellow" && "text-yellow-700 dark:text-yellow-300"
          )}>
            Comprehensive legal expertise across multiple domains
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteData.practiceAreas.map((area, index) => {
            const Icon = iconMap[area.icon] || Scale

            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className={cn(
                  "relative p-8 rounded-2xl bg-card border transition-all duration-300",
                  theme === "gold" && "border-amber-200 dark:border-amber-800 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10",
                  theme === "blue" && "border-blue-200 dark:border-blue-800 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10",
                  theme === "yellow" && "border-yellow-200 dark:border-yellow-800 hover:border-yellow-500/50 hover:shadow-xl hover:shadow-yellow-500/10"
                )}>
                  {/* Icon with theme-based effects */}
                  <div className="relative mb-6">
                    <div className={cn(
                      "absolute inset-0 rounded-2xl blur-xl transition-all group-hover:blur-2xl",
                      theme === "gold" && "bg-amber-500/20",
                      theme === "blue" && "bg-blue-500/20",
                      theme === "yellow" && "bg-yellow-500/20"
                    )} />
                    <div className={cn(
                      "relative w-16 h-16 rounded-2xl flex items-center justify-center transition-colors",
                      getIconBgClass()
                    )}>
                      <Icon className={cn(
                        "h-8 w-8",
                        theme === "gold" && "text-amber-500",
                        theme === "blue" && "text-blue-500",
                        theme === "yellow" && "text-yellow-500"
                      )} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className={cn(
                    "text-2xl font-bold mb-3 transition-colors group-hover",
                    theme === "gold" && "text-amber-900 dark:text-amber-100 group-hover:text-amber-600 dark:group-hover:text-amber-400",
                    theme === "blue" && "text-blue-900 dark:text-blue-100 group-hover:text-blue-600 dark:group-hover:text-blue-400",
                    theme === "yellow" && "text-yellow-900 dark:text-yellow-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400"
                  )}>
                    {area.title}
                  </h3>
                  
                  <p className={cn(
                    "mb-4",
                    theme === "gold" && "text-amber-700 dark:text-amber-300",
                    theme === "blue" && "text-blue-700 dark:text-blue-300",
                    theme === "yellow" && "text-yellow-700 dark:text-yellow-300"
                  )}>
                    {area.description}
                  </p>

                  {/* Stats Badge - Theme based */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className={cn(
                      "px-3 py-1 rounded-full font-semibold",
                      getStatBadgeClass()
                    )}>
                      {area.cases}+ Cases
                    </span>
                  </div>

                  {/* Hover Effect Lines - Theme based */}
                  <div className={cn(
                    "absolute bottom-0 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-1/2",
                    theme === "gold" && "bg-amber-500",
                    theme === "blue" && "bg-blue-500",
                    theme === "yellow" && "bg-yellow-500"
                  )} />
                  <div className={cn(
                    "absolute top-0 right-0 w-0 h-0.5 transition-all duration-300 group-hover:w-1/2",
                    theme === "gold" && "bg-amber-500",
                    theme === "blue" && "bg-blue-500",
                    theme === "yellow" && "bg-yellow-500"
                  )} />

                  {/* Corner Accent - Theme based */}
                  <div className={cn(
                    "absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    "bg-gradient-to-bl from-transparent",
                    theme === "gold" && "to-amber-500/10",
                    theme === "blue" && "to-blue-500/10",
                    theme === "yellow" && "to-yellow-500/10"
                  )} />
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/practice-areas"
            className={cn(
              "inline-flex items-center gap-2 transition-all group",
              theme === "gold" && "text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300",
              theme === "blue" && "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
              theme === "yellow" && "text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300"
            )}
          >
            <span className="text-lg font-semibold">View All Practice Areas</span>
            <ArrowRight className={cn(
              "h-5 w-5 group-hover:translate-x-1 transition-transform",
              theme === "gold" && "text-amber-600 dark:text-amber-400",
              theme === "blue" && "text-blue-600 dark:text-blue-400",
              theme === "yellow" && "text-yellow-600 dark:text-yellow-400"
            )} />
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}