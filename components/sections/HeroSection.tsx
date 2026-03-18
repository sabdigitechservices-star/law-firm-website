"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ArrowRight } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import siteData from "@/data/siteData.json"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [imageScale, setImageScale] = useState(1.1) // Start with slight zoom
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)

  // Zoom effect - controlled range between 1.1 and 1.3 (never goes below 1.1)
  useEffect(() => {
    let animationFrame: number
    let startTime: number
    const duration = 10000 // 10 seconds for full zoom cycle

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = (elapsed % duration) / duration
      
      // Scale between 1.1 and 1.3 (never below 1.1)
      // Using sine wave for smooth zoom in/out
      const minScale = 1.15 // Minimum zoom (always zoomed in)
      const maxScale = 1.35 // Maximum zoom
      const range = maxScale - minScale
      
      // Map sin from [-1, 1] to [minScale, maxScale]
      const sinValue = Math.sin(progress * Math.PI * 2)
      const normalizedValue = (sinValue + 1) / 2 // Convert to [0, 1]
      const scale = minScale + (normalizedValue * range)
      
      setImageScale(scale)
      
      animationFrame = requestAnimationFrame(animate)
    }

    if (!isHovered) {
      animationFrame = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isHovered])

  // Auto slide change
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % siteData.hero.slides.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isHovered])

  // Reset scale when slide changes (but keep minimum zoom)
  useEffect(() => {
    setImageScale(1.2) // Reset to medium zoom when slide changes
  }, [currentSlide])

  // Dynamic text color based on theme for better contrast
  const getTextColor = () => {
    switch(theme) {
      case "yellow":
        return "text-white"
      default:
        return "text-white"
    }
  }

  return (
    <section className="relative h-[120vh] w-full overflow-hidden bg-black">
      {/* Background Images with Controlled Zoom Effect */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {/* Image Container with Zoom Transform */}
            <div 
              className="relative w-full h-full overflow-hidden"
              style={{
                transform: `scale(${imageScale})`,
                transformOrigin: 'center center',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
              }}
            >
              <Image
                src={siteData.hero.slides[currentSlide].image}
                alt="Hero Background"
                fill
                className="object-cover"
                priority
                sizes="100vw"
                quality={100}
                style={{
                  objectPosition: 'center center',
                }}
              />
            </div>
            
            {/* Dark Overlay to prevent any white showing */}
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Dynamic Color Overlay - Theme based */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-r mix-blend-multiply",
              theme === "gold" && "from-amber-900/80 via-amber-800/60 to-transparent",
              theme === "blue" && "from-blue-900/80 via-blue-800/60 to-transparent",
              theme === "yellow" && "from-yellow-900/80 via-yellow-800/60 to-transparent"
            )} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-4 flex items-center">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className={cn(
              "inline-block px-4 py-2 backdrop-blur-sm rounded-full text-sm font-semibold border",
              theme === "gold" && "bg-amber-500/20 text-amber-100 border-amber-500/30",
              theme === "blue" && "bg-blue-500/20 text-blue-100 border-blue-500/30",
              theme === "yellow" && "bg-yellow-500/20 text-yellow-900 border-yellow-500/30"
            )}>
              Welcome to {siteData.firmName}
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h1
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={cn(
                "text-5xl md:text-7xl font-bold mb-6 leading-tight",
                getTextColor()
              )}
            >
              {siteData.hero.slides[currentSlide].title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={cn(
                "text-xl mb-8 max-w-2xl",
                theme === "yellow" ? "text-white" : "text-white/90"
              )}
            >
              {siteData.hero.slides[currentSlide].subtitle}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/contact"
              className={cn(
                "group relative overflow-hidden rounded-lg px-8 py-4 font-semibold text-lg transition-all duration-300",
                "hover:shadow-lg",
                theme === "gold" && "bg-amber-500 text-white hover:shadow-amber-500/25",
                theme === "blue" && "bg-blue-500 text-white hover:shadow-blue-500/25",
                theme === "yellow" && "bg-yellow-400 text-black hover:shadow-yellow-500/25"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                Free Consultation
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
            
            <Link
              href="/about"
              className={cn(
                "group flex items-center gap-2 px-8 py-4 font-semibold text-lg rounded-lg transition-all duration-300 backdrop-blur-sm",
                theme === "gold" && "border-2 border-amber-500/30 text-amber-100 hover:bg-amber-500/10",
                theme === "blue" && "border-2 border-blue-500/30 text-blue-100 hover:bg-blue-500/10",
                theme === "yellow" && "border-2 border-yellow-500/30 text-yellow-900 hover:bg-yellow-500/10"
              )}
            >
              Learn More
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators - Theme based */}
      <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {siteData.hero.slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentSlide
                ? cn("w-8", 
                    theme === "gold" && "bg-amber-500", 
                    theme === "blue" && "bg-blue-500", 
                    theme === "yellow" && "bg-yellow-400")
                : cn("bg-white/50 hover:bg-white/80", 
                    theme === "yellow" && "bg-yellow-900/50 hover:bg-yellow-900/80")
            )}
          />
        ))}
      </div>

      {/* Wavy Bottom - Theme based */}
      <div className="absolute z-20 bottom-0 left-0 w-full pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className={cn(
              theme === "gold" && "text-amber-50",
              theme === "blue" && "text-blue-50",
              theme === "yellow" && "text-yellow-50"
            )}
          />
        </svg>
      </div>
    </section>
  )
}