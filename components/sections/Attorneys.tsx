"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  Linkedin, Mail, ArrowRight, Award, Briefcase, Star, Phone 
} from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import siteData from "@/data/siteData.json"
import { cn } from "@/lib/utils"

export function Attorneys() {
  const ref = useRef(null)
  const [hoveredAttorney, setHoveredAttorney] = useState<number | null>(null)
  const { theme } = useTheme()
  
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  // Simplified theme colors
  const getThemeColor = () => {
    switch(theme) {
      case "gold": return "amber-500"
      case "blue": return "blue-500"
      case "yellow": return "yellow-500"
      default: return "primary"
    }
  }

  const themeColor = getThemeColor()

  // Simple card variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 }
    })
  }

  return (
    <section className={cn(
      "py-16 md:py-20 lg:py-24 relative overflow-hidden",
      theme === "gold" && "bg-amber-50/30 dark:bg-amber-950/10",
      theme === "blue" && "bg-blue-50/30 dark:bg-blue-950/10",
      theme === "yellow" && "bg-yellow-50/30 dark:bg-yellow-950/10"
    )}>
      {/* Simple Background - Removed heavy animations */}
      <div className="absolute inset-0 opacity-30">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br",
          theme === "gold" && "from-amber-500/5 to-amber-500/10",
          theme === "blue" && "from-blue-500/5 to-blue-500/10",
          theme === "yellow" && "from-yellow-500/5 to-yellow-500/10"
        )} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12 lg:mb-16"
        >
          {/* Badge */}
          <span className={cn(
            "inline-block px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4",
            theme === "gold" && "bg-amber-500/10 text-amber-600",
            theme === "blue" && "bg-blue-500/10 text-blue-600",
            theme === "yellow" && "bg-yellow-500/10 text-yellow-600"
          )}>
            <Award className="h-3 w-3 md:h-4 md:w-4 inline-block mr-1" />
            Expert Legal Team
          </span>

          {/* Title */}
          <h2 className={cn(
            "text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 px-4",
            theme === "gold" && "text-amber-900 dark:text-amber-100",
            theme === "blue" && "text-blue-900 dark:text-blue-100",
            theme === "yellow" && "text-yellow-900 dark:text-yellow-100"
          )}>
            Meet Our Attorneys
          </h2>
          
          {/* Description */}
          <p className={cn(
            "text-base md:text-lg max-w-2xl mx-auto px-4",
            theme === "gold" && "text-amber-700 dark:text-amber-300",
            theme === "blue" && "text-blue-700 dark:text-blue-300",
            theme === "yellow" && "text-yellow-700 dark:text-yellow-300"
          )}>
            Experienced legal professionals dedicated to your success
          </p>
        </motion.div>

        {/* Attorneys Grid - Responsive */}
        <div 
          ref={ref} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 px-2 sm:px-0"
        >
          {siteData.attorneys.slice(0, 4).map((attorney, index) => (
            <motion.div
              key={attorney.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              onHoverStart={() => setHoveredAttorney(index)}
              onHoverEnd={() => setHoveredAttorney(null)}
              className="group"
            >
              {/* Simple Card */}
              <div className={cn(
                "relative rounded-xl md:rounded-2xl overflow-hidden",
                "bg-white dark:bg-gray-900",
                "border",
                theme === "gold" && "border-amber-200 dark:border-amber-800",
                theme === "blue" && "border-blue-200 dark:border-blue-800",
                theme === "yellow" && "border-yellow-200 dark:border-yellow-800",
                hoveredAttorney === index && cn(
                  "shadow-lg",
                  theme === "gold" && "shadow-amber-500/20 border-amber-400",
                  theme === "blue" && "shadow-blue-500/20 border-blue-400",
                  theme === "yellow" && "shadow-yellow-500/20 border-yellow-400"
                )
              )}>
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={attorney.image}
                    alt={attorney.name}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-500",
                      hoveredAttorney === index && "scale-110"
                    )}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  
                  {/* Simple Gradient Overlay */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t opacity-0 transition-opacity duration-300",
                    hoveredAttorney === index && "opacity-100",
                    theme === "gold" && "from-amber-900/60 to-transparent",
                    theme === "blue" && "from-blue-900/60 to-transparent",
                    theme === "yellow" && "from-yellow-900/60 to-transparent"
                  )} />

                  {/* Social Icons - Simple */}
                  <div className={cn(
                    "absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2",
                    "transition-all duration-300",
                    hoveredAttorney === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}>
                    <Link
                      href="#"
                      className={cn(
                        "w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center",
                        "bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors",
                        theme === "yellow" ? "text-black" : "text-white"
                      )}
                    >
                      <Linkedin className="h-3 w-3 md:h-4 md:w-4" />
                    </Link>
                    <Link
                      href="#"
                      className={cn(
                        "w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center",
                        "bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors",
                        theme === "yellow" ? "text-black" : "text-white"
                      )}
                    >
                      <Mail className="h-3 w-3 md:h-4 md:w-4" />
                    </Link>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-4 md:p-5">
                  <h3 className={cn(
                    "text-base md:text-lg font-bold mb-1 text-center",
                    theme === "gold" && "text-amber-900 dark:text-amber-100",
                    theme === "blue" && "text-blue-900 dark:text-blue-100",
                    theme === "yellow" && "text-yellow-900 dark:text-yellow-100"
                  )}>
                    {attorney.name}
                  </h3>
                  
                  <p className={cn(
                    "text-xs md:text-sm font-semibold text-center mb-2",
                    theme === "gold" && "text-amber-600",
                    theme === "blue" && "text-blue-600",
                    theme === "yellow" && "text-yellow-600"
                  )}>
                    {attorney.title}
                  </p>

                  {/* Simple Details - Only show on hover for mobile */}
                  <div className={cn(
                    "text-center transition-all duration-300",
                    hoveredAttorney === index ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden md:opacity-100 md:h-auto"
                  )}>
                    <p className={cn(
                      "text-xs text-muted-foreground mb-2",
                      theme === "gold" && "text-amber-700 dark:text-amber-300",
                      theme === "blue" && "text-blue-700 dark:text-blue-300",
                      theme === "yellow" && "text-yellow-700 dark:text-yellow-300"
                    )}>
                      {attorney.specialization} • {attorney.experience}+ years
                    </p>
                    
                    {/* Mobile Contact - Only on hover */}
                    <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground md:hidden">
                      <Phone className="h-3 w-3" />
                      <span>Contact</span>
                    </div>
                  </div>

                  {/* Experience Badge - Simplified */}
                  <div className={cn(
                    "absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold",
                    theme === "gold" && "bg-amber-500 text-white",
                    theme === "blue" && "bg-blue-500 text-white",
                    theme === "yellow" && "bg-yellow-500 text-black"
                  )}>
                    {attorney.experience}+ yrs
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link - Simplified */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-12 lg:mt-16"
        >
          <Link
            href="/attorneys"
            className={cn(
              "inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl text-sm md:text-base font-semibold transition-all",
              theme === "gold" && "bg-amber-500 text-white hover:bg-amber-600",
              theme === "blue" && "bg-blue-500 text-white hover:bg-blue-600",
              theme === "yellow" && "bg-yellow-500 text-black hover:bg-yellow-600"
            )}
          >
            <span>Meet All Attorneys</span>
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}