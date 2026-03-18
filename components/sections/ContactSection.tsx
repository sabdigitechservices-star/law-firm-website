"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/contexts/theme-context"
import siteData from "@/data/siteData.json"
import { cn } from "@/lib/utils"

export function ContactSection() {
  const { theme } = useTheme()

  // Simplified theme colors
  const getThemeClass = (type: string) => {
    const colors = {
      gold: {
        text: "text-amber-600",
        bg: "bg-amber-500",
        border: "border-amber-200 dark:border-amber-800",
        hover: "hover:border-amber-400",
        ring: "focus:ring-amber-500/20",
        gradient: "from-amber-500 to-amber-600"
      },
      blue: {
        text: "text-blue-600",
        bg: "bg-blue-500",
        border: "border-blue-200 dark:border-blue-800",
        hover: "hover:border-blue-400",
        ring: "focus:ring-blue-500/20",
        gradient: "from-blue-500 to-blue-600"
      },
      yellow: {
        text: "text-yellow-600",
        bg: "bg-yellow-500",
        border: "border-yellow-200 dark:border-yellow-800",
        hover: "hover:border-yellow-400",
        ring: "focus:ring-yellow-500/20",
        gradient: "from-yellow-500 to-yellow-600"
      }
    }
    return colors[theme as keyof typeof colors]?.[type as keyof typeof colors.gold] || colors.gold[type as keyof typeof colors.gold]
  }

  // Contact info items
  const contactItems = [
    { icon: Phone, label: "Phone", value: siteData.contact.phone, href: `tel:${siteData.contact.phone}` },
    { icon: Mail, label: "Email", value: siteData.contact.email, href: `mailto:${siteData.contact.email}` },
    { icon: MapPin, label: "Office", value: siteData.contact.address, href: "#" },
    { icon: Clock, label: "Hours", value: siteData.contact.hours, href: "#" }
  ]

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-muted/30">
      {/* Simple Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className={cn(
            "inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4",
            getThemeClass('bg') + '/10',
            getThemeClass('text')
          )}>
            Get In Touch
          </span>

          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4",
            theme === "gold" && "text-amber-900 dark:text-amber-100",
            theme === "blue" && "text-blue-900 dark:text-blue-100",
            theme === "yellow" && "text-yellow-900 dark:text-yellow-100"
          )}>
            Contact Us
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule a free consultation with our legal team
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl",
                    "bg-card border transition-all",
                    getThemeClass('border'),
                    getThemeClass('hover')
                  )}
                >
                  <div className={cn("p-3 rounded-lg", getThemeClass('bg') + '/10')}>
                    <item.icon className={cn("h-5 w-5", getThemeClass('text'))} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className={cn(
              "bg-card rounded-xl p-6 border",
              getThemeClass('border')
            )}>
              <h3 className={cn(
                "text-xl font-bold mb-6",
                theme === "gold" && "text-amber-900 dark:text-amber-100",
                theme === "blue" && "text-blue-900 dark:text-blue-100",
                theme === "yellow" && "text-yellow-900 dark:text-yellow-100"
              )}>
                Send Message
              </h3>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="First Name"
                    className={cn(
                      "w-full px-3 py-2 rounded-lg text-sm",
                      "bg-background border transition-all",
                      getThemeClass('border'),
                      "focus:outline-none focus:ring-2",
                      getThemeClass('ring'),
                      "focus:border-transparent"
                    )}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={cn(
                      "w-full px-3 py-2 rounded-lg text-sm",
                      "bg-background border transition-all",
                      getThemeClass('border'),
                      "focus:outline-none focus:ring-2",
                      getThemeClass('ring'),
                      "focus:border-transparent"
                    )}
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-sm",
                    "bg-background border transition-all",
                    getThemeClass('border'),
                    "focus:outline-none focus:ring-2",
                    getThemeClass('ring'),
                    "focus:border-transparent"
                  )}
                />

                <input
                  type="tel"
                  placeholder="Phone"
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-sm",
                    "bg-background border transition-all",
                    getThemeClass('border'),
                    "focus:outline-none focus:ring-2",
                    getThemeClass('ring'),
                    "focus:border-transparent"
                  )}
                />

                <select
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-sm",
                    "bg-background border transition-all",
                    getThemeClass('border'),
                    "focus:outline-none focus:ring-2",
                    getThemeClass('ring'),
                    "focus:border-transparent"
                  )}
                >
                  <option>Select Practice Area</option>
                  {siteData.practiceAreas?.map((area: any) => (
                    <option key={area.id}>{area.title}</option>
                  ))}
                </select>

                <textarea
                  rows={3}
                  placeholder="Message"
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-sm resize-none",
                    "bg-background border transition-all",
                    getThemeClass('border'),
                    "focus:outline-none focus:ring-2",
                    getThemeClass('ring'),
                    "focus:border-transparent"
                  )}
                />

                <button
                  type="submit"
                  className={cn(
                    "w-full py-3 rounded-lg text-sm font-semibold",
                    "bg-gradient-to-r text-white transition-all",
                    getThemeClass('gradient'),
                    "hover:opacity-90"
                  )}
                >
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <Send className="h-4 w-4" />
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}