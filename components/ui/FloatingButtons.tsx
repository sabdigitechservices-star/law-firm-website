"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Phone, X, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/theme-context"

export function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { theme } = useTheme()

  // Phone numbers
  const whatsappNumber = "918420204635"  // WhatsApp number with country code
  const callNumber = "8420204635"        // Call number

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCall = () => {
    window.location.href = `tel:${callNumber}`
  }

  const handleWhatsApp = () => {
    const message = "Hello! I need legal assistance. Please help me."
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const getThemeGradient = () => {
    switch(theme) {
      case "gold":
        return "from-amber-500 to-amber-600"
      case "blue":
        return "from-blue-500 to-blue-600"
      case "yellow":
        return "from-yellow-500 to-yellow-600"
      default:
        return "from-amber-500 to-amber-600"
    }
  }

  const getThemeColor = () => {
    switch(theme) {
      case "gold":
        return "bg-amber-500"
      case "blue":
        return "bg-blue-500"
      case "yellow":
        return "bg-yellow-500"
      default:
        return "bg-amber-500"
    }
  }

  return (
    <>
      {/* WhatsApp Button - Always Visible */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleWhatsApp}
        className="fixed bottom-4 right-4 z-[9999] group bg-green-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-12 h-12 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="absolute right-full mr-3 whitespace-nowrap bg-gray-800 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp
        </span>
        <MessageCircle className="h-6 w-6 text-white" />
      </motion.button>

      {/* Call Button - Always Visible */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCall}
        className="fixed bottom-20 right-4 z-[9999] group bg-gradient-to-r rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-12 h-12 flex items-center justify-center"
        style={{
          background: theme === 'gold' ? 'linear-gradient(135deg, #F59E0B, #D97706)' :
                     theme === 'blue' ? 'linear-gradient(135deg, #3B82F6, #2563EB)' :
                     theme === 'yellow' ? 'linear-gradient(135deg, #EAB308, #CA8A04)' :
                     'linear-gradient(135deg, #F59E0B, #D97706)'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="absolute right-full mr-3 whitespace-nowrap bg-gray-800 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Call Now
        </span>
        <Phone className="h-6 w-6 text-white" />
      </motion.button>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-36 right-4 z-[9999] bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-10 h-10 flex items-center justify-center"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}