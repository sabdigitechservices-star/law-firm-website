"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Award, Users, Scale, Calendar, ArrowRight, Target, Shield, Sparkles } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import siteData from "@/data/siteData.json"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { cn } from "@/lib/utils"

// Icon mapping
const statIcons: Record<string, any> = {
  Trophy: Award,
  Users: Users,
  Scale: Scale,
  Calendar: Calendar
}

export function AboutSection() {
  const ref = useRef(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const { theme } = useTheme()
  
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  // Parallax scroll effect for image
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  })
  
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1])

  // Get years of experience from stats
  const yearsExp = siteData.stats.find(stat => stat.label === "Years Experience")?.value || 25

  // Theme-based colors
  const getThemeColors = () => {
    switch(theme) {
      case "gold":
        return {
          primary: "text-amber-500",
          primaryBg: "bg-amber-500",
          primaryBgLight: "bg-amber-500/10",
          primaryBgLighter: "bg-amber-500/20",
          border: "border-amber-500/20",
          hoverBorder: "hover:border-amber-500/50",
          shadow: "shadow-amber-500/10",
          gradient: "from-amber-500/20 via-transparent to-transparent",
          badge: "bg-amber-500 text-white",
          heading: "text-amber-900 dark:text-amber-100",
          text: "text-amber-700 dark:text-amber-300"
        }
      case "blue":
        return {
          primary: "text-blue-500",
          primaryBg: "bg-blue-500",
          primaryBgLight: "bg-blue-500/10",
          primaryBgLighter: "bg-blue-500/20",
          border: "border-blue-500/20",
          hoverBorder: "hover:border-blue-500/50",
          shadow: "shadow-blue-500/10",
          gradient: "from-blue-500/20 via-transparent to-transparent",
          badge: "bg-blue-500 text-white",
          heading: "text-blue-900 dark:text-blue-100",
          text: "text-blue-700 dark:text-blue-300"
        }
      case "yellow":
        return {
          primary: "text-yellow-500",
          primaryBg: "bg-yellow-500",
          primaryBgLight: "bg-yellow-500/10",
          primaryBgLighter: "bg-yellow-500/20",
          border: "border-yellow-500/20",
          hoverBorder: "hover:border-yellow-500/50",
          shadow: "shadow-yellow-500/10",
          gradient: "from-yellow-500/20 via-transparent to-transparent",
          badge: "bg-yellow-500 text-black",
          heading: "text-yellow-900 dark:text-yellow-100",
          text: "text-yellow-700 dark:text-yellow-300"
        }
      default:
        return {
          primary: "text-primary",
          primaryBg: "bg-primary",
          primaryBgLight: "bg-primary/10",
          primaryBgLighter: "bg-primary/20",
          border: "border-primary/20",
          hoverBorder: "hover:border-primary/50",
          shadow: "shadow-primary/10",
          gradient: "from-primary/20 via-transparent to-transparent",
          badge: "bg-primary text-primary-foreground",
          heading: "text-foreground",
          text: "text-muted-foreground"
        }
    }
  }

  const colors = getThemeColors()

  return (
    <SectionWrapper className={cn(
      "py-24 relative overflow-hidden",
      theme === "gold" && "bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-950/10",
      theme === "blue" && "bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/10",
      theme === "yellow" && "bg-gradient-to-b from-yellow-50/50 to-transparent dark:from-yellow-950/10"
    )}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute rounded-full blur-3xl",
              theme === "gold" && "bg-amber-500/5",
              theme === "blue" && "bg-blue-500/5",
              theme === "yellow" && "bg-yellow-500/5"
            )}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
            }}
            animate={{
              x: [null, Math.random() * 100 + "%"],
              y: [null, Math.random() * 100 + "%"],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image with Parallax */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative perspective-1000"
            style={{ y: imageY }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              {/* Image with scale on scroll */}
              <motion.div
                style={{ scale: imageScale }}
                className="relative w-full h-full"
              >
                <Image
                  src="https://images.unsplash.com/photo-1590099543482-3b3d3083a474?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGxhd3llcnN8ZW58MHx8MHx8fDA%3D"
                  alt={siteData.firmName}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
              </motion.div>
              
              {/* Gradient Overlay */}
              <motion.div 
                className={cn(
                  "absolute inset-0 bg-gradient-to-t opacity-60 group-hover:opacity-40 transition-opacity",
                  theme === "gold" && "from-amber-900/80 via-amber-800/40 to-transparent",
                  theme === "blue" && "from-blue-900/80 via-blue-800/40 to-transparent",
                  theme === "yellow" && "from-yellow-900/80 via-yellow-800/40 to-transparent"
                )}
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              {/* Experience Badge - Animated */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                className={cn(
                  "absolute bottom-8 left-8 p-6 rounded-2xl shadow-xl",
                  colors.badge
                )}
              >
                <motion.p 
                  className="text-4xl font-bold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {yearsExp}+
                </motion.p>
                <p className="text-sm opacity-90">Years of Excellence</p>
                
                {/* Sparkle effect */}
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                </motion.div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Target className={cn(
                  "h-8 w-8",
                  theme === "gold" && "text-amber-300",
                  theme === "blue" && "text-blue-300",
                  theme === "yellow" && "text-yellow-300"
                )} />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <div ref={ref} className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              whileHover={{ x: 5 }}
            >
              <span className={cn(
                "inline-block px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm",
                theme === "gold" && "bg-amber-500/10 text-amber-600 border border-amber-500/20",
                theme === "blue" && "bg-blue-500/10 text-blue-600 border border-blue-500/20",
                theme === "yellow" && "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20"
              )}>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mr-2"
                >
                  ✦
                </motion.span>
                About {siteData.firmName}
              </span>
            </motion.div>

            {/* Title with gradient animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className={cn(
                "text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent",
                theme === "gold" && "from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600",
                theme === "blue" && "from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600",
                theme === "yellow" && "from-yellow-600 to-yellow-800 dark:from-yellow-400 dark:to-yellow-600"
              )}>
                {siteData.tagline}
              </h2>
            </motion.div>

            {/* Description with fade effect */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={cn(
                "text-lg leading-relaxed",
                colors.text
              )}
            >
              {siteData.description}
            </motion.p>

            {/* Stats Grid with hover effects - Using siteData.stats */}
            <div className="grid grid-cols-2 gap-6">
              {siteData.stats.map((stat, index) => {
                const Icon = statIcons[stat.icon] || Award

                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    onHoverStart={() => setHoveredStat(index)}
                    onHoverEnd={() => setHoveredStat(null)}
                    whileHover={{ 
                      y: -5,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="relative group cursor-pointer"
                  >
                    <div className={cn(
                      "p-6 rounded-2xl bg-card border transition-all duration-300",
                      theme === "gold" && "border-amber-200 dark:border-amber-800 hover:border-amber-500",
                      theme === "blue" && "border-blue-200 dark:border-blue-800 hover:border-blue-500",
                      theme === "yellow" && "border-yellow-200 dark:border-yellow-800 hover:border-yellow-500",
                      "hover:shadow-xl",
                      colors.shadow
                    )}>
                      <div className="flex items-center gap-4">
                        {/* Icon with animation */}
                        <motion.div 
                          className={cn(
                            "p-3 rounded-xl transition-all duration-300",
                            theme === "gold" && "bg-amber-500/10 group-hover:bg-amber-500/20",
                            theme === "blue" && "bg-blue-500/10 group-hover:bg-blue-500/20",
                            theme === "yellow" && "bg-yellow-500/10 group-hover:bg-yellow-500/20"
                          )}
                          animate={{
                            rotate: hoveredStat === index ? [0, -10, 10, 0] : 0,
                            scale: hoveredStat === index ? [1, 1.2, 1] : 1
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className={cn(
                            "h-6 w-6",
                            colors.primary
                          )} />
                        </motion.div>
                        
                        <div>
                          <motion.p 
                            className={cn(
                              "text-3xl font-bold",
                              colors.heading
                            )}
                            animate={{
                              scale: hoveredStat === index ? 1.1 : 1
                            }}
                          >
                            {stat.value}+
                          </motion.p>
                          <p className={cn(
                            "text-sm",
                            colors.text
                          )}>
                            {stat.label}
                          </p>
                        </div>
                      </div>

                      {/* Progress bar animation */}
                      <motion.div
                        className={cn(
                          "absolute bottom-0 left-0 h-1 rounded-b-2xl",
                          theme === "gold" && "bg-amber-500",
                          theme === "blue" && "bg-blue-500",
                          theme === "yellow" && "bg-yellow-500"
                        )}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: hoveredStat === index ? "100%" : "0%"
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA Link with enhanced animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              whileHover={{ x: 10 }}
            >
              <Link
                href="/about"
                className={cn(
                  "inline-flex items-center gap-2 transition-all group relative",
                  colors.primary
                )}
              >
                <span className="text-lg font-semibold relative">
                  Learn More About Us
                  <motion.span
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5",
                      theme === "gold" && "bg-amber-500",
                      theme === "blue" && "bg-blue-500",
                      theme === "yellow" && "bg-yellow-500"
                    )}
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Additional decorative element */}
            <motion.div
              className="flex gap-2 pt-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              {[1, 2, 3].map((_, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full",
                    theme === "gold" && "bg-amber-400",
                    theme === "blue" && "bg-blue-400",
                    theme === "yellow" && "bg-yellow-400"
                  )}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}