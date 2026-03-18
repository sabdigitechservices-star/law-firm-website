"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, MessageCircle } from "lucide-react"
import Link from "next/link"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import siteData from "@/data/siteData.json"
import Image from "next/image"
import { useTheme } from "@/contexts/theme-context"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function ContactPage() {
  const { theme } = useTheme()
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [hoveredField, setHoveredField] = useState<string | null>(null)

  // Theme-based colors
  const getThemeColor = () => {
    switch(theme) {
      case "gold": return "amber-500"
      case "blue": return "blue-500"
      case "yellow": return "yellow-500"
      default: return "primary"
    }
  }

  const themeColor = getThemeColor()

  // Theme-based background images
  const backgroundImages = {
    gold: "https://plus.unsplash.com/premium_photo-1661342406509-064b58299ca5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    blue: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&auto=format&fit=crop",
    yellow: "https://images.unsplash.com/photo-1589578527966-5561cad1b0ad?w=1920&auto=format&fit=crop"
  }

  // Contact info items
  const contactItems = [
    { 
      icon: Phone, 
      label: "Phone", 
      value: siteData.contact.phone,
      href: `tel:${siteData.contact.phone}`,
      color: "from-blue-500 to-blue-600"
    },
    { 
      icon: Mail, 
      label: "Email", 
      value: siteData.contact.email,
      href: `mailto:${siteData.contact.email}`,
      color: "from-purple-500 to-purple-600"
    },
    { 
      icon: MapPin, 
      label: "Office", 
      value: siteData.contact.address,
      href: "#",
      color: "from-green-500 to-green-600"
    },
    { 
      icon: Clock, 
      label: "Working Hours", 
      value: siteData.contact.hours,
      href: "#",
      color: "from-orange-500 to-orange-600"
    }
  ]

  // FAQ data from siteData (you can add this to your JSON)
  const faqs = [
    {
      q: "How do I schedule a consultation?",
      a: "You can call our office directly or fill out the contact form above. We'll get back to you within 24 hours to schedule your consultation."
    },
    {
      q: "What are your consultation fees?",
      a: "We offer a free initial consultation to discuss your case and explore your legal options."
    },
    {
      q: "Do you handle cases outside your area?",
      a: "Yes, we have partnerships with law firms across the country and can help with cases in multiple jurisdictions."
    },
    {
      q: "How long will my case take?",
      a: "The timeline varies depending on the complexity of your case. We'll provide a realistic estimate during your consultation."
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <main className="">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={backgroundImages[theme as keyof typeof backgroundImages] || backgroundImages.gold}
            alt="Contact Hero Background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
          
          {/* Theme-based overlay */}
          <div className={cn(
            "absolute inset-0 mix-blend-overlay opacity-30",
            theme === "gold" && "bg-amber-500",
            theme === "blue" && "bg-blue-500",
            theme === "yellow" && "bg-yellow-500"
          )} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Decorative badge */}
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={cn(
                "inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6",
                theme === "gold" && "bg-amber-500/20 text-amber-100 border border-amber-500/30",
                theme === "blue" && "bg-blue-500/20 text-blue-100 border border-blue-500/30",
                theme === "yellow" && "bg-yellow-500/20 text-yellow-900 border border-yellow-500/30"
              )}
            >
              <MessageCircle className="h-4 w-4 inline-block mr-2" />
              Get In Touch
            </motion.span>

            <h1 className={cn(
              "text-5xl md:text-6xl font-bold mb-6 text-white"
            )}>
              Contact Us
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Schedule a free consultation with our legal team
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <SectionWrapper className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                variants={itemVariants}
                className={cn(
                  "text-3xl font-bold mb-6",
                  theme === "gold" && "text-amber-900 dark:text-amber-100",
                  theme === "blue" && "text-blue-900 dark:text-blue-100",
                  theme === "yellow" && "text-yellow-900 dark:text-yellow-100"
                )}
              >
                Get In Touch
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className={cn(
                  "text-lg mb-8",
                  theme === "gold" && "text-amber-700 dark:text-amber-300",
                  theme === "blue" && "text-blue-700 dark:text-blue-300",
                  theme === "yellow" && "text-yellow-700 dark:text-yellow-300"
                )}
              >
                We're here to help with any legal questions or concerns you may have.
              </motion.p>

              <div className="space-y-4">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    variants={itemVariants}
                    onHoverStart={() => setHoveredField(item.label)}
                    onHoverEnd={() => setHoveredField(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-start gap-4 p-4 rounded-xl transition-all duration-300",
                        "bg-card border",
                        theme === "gold" && "border-amber-200 dark:border-amber-800 hover:border-amber-400",
                        theme === "blue" && "border-blue-200 dark:border-blue-800 hover:border-blue-400",
                        theme === "yellow" && "border-yellow-200 dark:border-yellow-800 hover:border-yellow-400",
                        hoveredField === item.label && "shadow-lg",
                        hoveredField === item.label && theme === "gold" && "shadow-amber-500/20",
                        hoveredField === item.label && theme === "blue" && "shadow-blue-500/20",
                        hoveredField === item.label && theme === "yellow" && "shadow-yellow-500/20"
                      )}
                    >
                      <motion.div
                        className={cn(
                          "p-3 rounded-xl bg-gradient-to-br",
                          item.color
                        )}
                        animate={{
                          scale: hoveredField === item.label ? 1.1 : 1,
                          rotate: hoveredField === item.label ? [0, -5, 5, 0] : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <item.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                      </motion.div>

                      <div className="flex-1">
                        <p className="text-xs md:text-sm text-muted-foreground mb-1">
                          {item.label}
                        </p>
                        <p className={cn(
                          "text-sm md:text-base font-semibold",
                          theme === "gold" && "text-amber-900 dark:text-amber-100",
                          theme === "blue" && "text-blue-900 dark:text-blue-100",
                          theme === "yellow" && "text-yellow-900 dark:text-yellow-100"
                        )}>
                          {item.value}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <motion.div
                variants={itemVariants}
                className="mt-8 aspect-video rounded-xl overflow-hidden"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3169897b6f%3A0xb6f6b7b7b7b7b7b7!2sFulton%20St%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className={cn(
                    "transition-all duration-500",
                    theme === "gold" && "grayscale hover:grayscale-0",
                    theme === "blue" && "grayscale hover:grayscale-0",
                    theme === "yellow" && "grayscale hover:grayscale-0"
                  )}
                />
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className={cn(
                "bg-card rounded-2xl p-8 border",
                theme === "gold" && "border-amber-200 dark:border-amber-800",
                theme === "blue" && "border-blue-200 dark:border-blue-800",
                theme === "yellow" && "border-yellow-200 dark:border-yellow-800"
              )}>
                <motion.h3 
                  variants={itemVariants}
                  className={cn(
                    "text-2xl font-bold mb-6",
                    theme === "gold" && "text-amber-900 dark:text-amber-100",
                    theme === "blue" && "text-blue-900 dark:text-blue-100",
                    theme === "yellow" && "text-yellow-900 dark:text-yellow-100"
                  )}
                >
                  Send us a Message
                </motion.h3>

                <form className="space-y-4">
                  <motion.div 
                    variants={itemVariants}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <label className={cn(
                        "block text-sm font-medium mb-2",
                        theme === "gold" && "text-amber-700 dark:text-amber-300",
                        theme === "blue" && "text-blue-700 dark:text-blue-300",
                        theme === "yellow" && "text-yellow-700 dark:text-yellow-300"
                      )}>
                        First Name
                      </label>
                      <input
                        type="text"
                        className={cn(
                          "w-full px-4 py-3 rounded-lg bg-background border transition-all duration-300",
                          "focus:outline-none focus:ring-2",
                          theme === "gold" && "border-amber-200 dark:border-amber-800 focus:ring-amber-500/20 focus:border-amber-500",
                          theme === "blue" && "border-blue-200 dark:border-blue-800 focus:ring-blue-500/20 focus:border-blue-500",
                          theme === "yellow" && "border-yellow-200 dark:border-yellow-800 focus:ring-yellow-500/20 focus:border-yellow-500"
                        )}
                      />
                    </div>
                    <div>
                      <label className={cn(
                        "block text-sm font-medium mb-2",
                        theme === "gold" && "text-amber-700 dark:text-amber-300",
                        theme === "blue" && "text-blue-700 dark:text-blue-300",
                        theme === "yellow" && "text-yellow-700 dark:text-yellow-300"
                      )}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        className={cn(
                          "w-full px-4 py-3 rounded-lg bg-background border transition-all duration-300",
                          "focus:outline-none focus:ring-2",
                          theme === "gold" && "border-amber-200 dark:border-amber-800 focus:ring-amber-500/20 focus:border-amber-500",
                          theme === "blue" && "border-blue-200 dark:border-blue-800 focus:ring-blue-500/20 focus:border-blue-500",
                          theme === "yellow" && "border-yellow-200 dark:border-yellow-800 focus:ring-yellow-500/20 focus:border-yellow-500"
                        )}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className={cn(
                      "block text-sm font-medium mb-2",
                      theme === "gold" && "text-amber-700 dark:text-amber-300",
                      theme === "blue" && "text-blue-700 dark:text-blue-300",
                      theme === "yellow" && "text-yellow-700 dark:text-yellow-300"
                    )}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      className={cn(
                        "w-full px-4 py-3 rounded-lg bg-background border transition-all duration-300",
                        "focus:outline-none focus:ring-2",
                        theme === "gold" && "border-amber-200 dark:border-amber-800 focus:ring-amber-500/20 focus:border-amber-500",
                        theme === "blue" && "border-blue-200 dark:border-blue-800 focus:ring-blue-500/20 focus:border-blue-500",
                        theme === "yellow" && "border-yellow-200 dark:border-yellow-800 focus:ring-yellow-500/20 focus:border-yellow-500"
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className={cn(
                      "block text-sm font-medium mb-2",
                      theme === "gold" && "text-amber-700 dark:text-amber-300",
                      theme === "blue" && "text-blue-700 dark:text-blue-300",
                      theme === "yellow" && "text-yellow-700 dark:text-yellow-300"
                    )}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className={cn(
                        "w-full px-4 py-3 rounded-lg bg-background border transition-all duration-300",
                        "focus:outline-none focus:ring-2",
                        theme === "gold" && "border-amber-200 dark:border-amber-800 focus:ring-amber-500/20 focus:border-amber-500",
                        theme === "blue" && "border-blue-200 dark:border-blue-800 focus:ring-blue-500/20 focus:border-blue-500",
                        theme === "yellow" && "border-yellow-200 dark:border-yellow-800 focus:ring-yellow-500/20 focus:border-yellow-500"
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className={cn(
                      "block text-sm font-medium mb-2",
                      theme === "gold" && "text-amber-700 dark:text-amber-300",
                      theme === "blue" && "text-blue-700 dark:text-blue-300",
                      theme === "yellow" && "text-yellow-700 dark:text-yellow-300"
                    )}>
                      Practice Area
                    </label>
                    <select
                      className={cn(
                        "w-full px-4 py-3 rounded-lg bg-background border transition-all duration-300",
                        "focus:outline-none focus:ring-2",
                        theme === "gold" && "border-amber-200 dark:border-amber-800 focus:ring-amber-500/20 focus:border-amber-500",
                        theme === "blue" && "border-blue-200 dark:border-blue-800 focus:ring-blue-500/20 focus:border-blue-500",
                        theme === "yellow" && "border-yellow-200 dark:border-yellow-800 focus:ring-yellow-500/20 focus:border-yellow-500"
                      )}
                    >
                      <option value="">Select a practice area</option>
                      {siteData.practiceAreas?.map((area: any) => (
                        <option key={area.id} value={area.title}>
                          {area.title}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className={cn(
                      "block text-sm font-medium mb-2",
                      theme === "gold" && "text-amber-700 dark:text-amber-300",
                      theme === "blue" && "text-blue-700 dark:text-blue-300",
                      theme === "yellow" && "text-yellow-700 dark:text-yellow-300"
                    )}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg bg-background border transition-all duration-300 resize-none",
                        "focus:outline-none focus:ring-2",
                        theme === "gold" && "border-amber-200 dark:border-amber-800 focus:ring-amber-500/20 focus:border-amber-500",
                        theme === "blue" && "border-blue-200 dark:border-blue-800 focus:ring-blue-500/20 focus:border-blue-500",
                        theme === "yellow" && "border-yellow-200 dark:border-yellow-800 focus:ring-yellow-500/20 focus:border-yellow-500"
                      )}
                      placeholder="How can we help you?"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "w-full group relative overflow-hidden rounded-lg px-6 py-4 font-semibold transition-all duration-300",
                        "bg-gradient-to-r text-white",
                        theme === "gold" && "from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
                        theme === "blue" && "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                        theme === "yellow" && "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                      )}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Send Message
                        <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </motion.button>
                  </motion.div>

                  {/* Form Status Message */}
                  {formStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "p-3 rounded-lg text-sm flex items-center gap-2",
                        formStatus === 'success' && "bg-green-500/10 text-green-600",
                        formStatus === 'error' && "bg-red-500/10 text-red-600"
                      )}
                    >
                      {formStatus === 'success' ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Message sent successfully! We'll contact you soon.
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4" />
                          Something went wrong. Please try again.
                        </>
                      )}
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className={cn(
              "text-3xl md:text-4xl font-bold mb-4",
              theme === "gold" && "text-amber-900 dark:text-amber-100",
              theme === "blue" && "text-blue-900 dark:text-blue-100",
              theme === "yellow" && "text-yellow-900 dark:text-yellow-100"
            )}>
              Frequently Asked Questions
            </h2>
            <p className={cn(
              "text-lg",
              theme === "gold" && "text-amber-700 dark:text-amber-300",
              theme === "blue" && "text-blue-700 dark:text-blue-300",
              theme === "yellow" && "text-yellow-700 dark:text-yellow-300"
            )}>
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className={cn(
                  "mb-4 p-6 rounded-xl bg-card border transition-all duration-300",
                  theme === "gold" && "border-amber-200 dark:border-amber-800 hover:border-amber-400",
                  theme === "blue" && "border-blue-200 dark:border-blue-800 hover:border-blue-400",
                  theme === "yellow" && "border-yellow-200 dark:border-yellow-800 hover:border-yellow-400"
                )}
              >
                <h3 className={cn(
                  "text-lg font-bold mb-2",
                  theme === "gold" && "text-amber-900 dark:text-amber-100",
                  theme === "blue" && "text-blue-900 dark:text-blue-100",
                  theme === "yellow" && "text-yellow-900 dark:text-yellow-100"
                )}>
                  {faq.q}
                </h3>
                <p className={cn(
                  "text-muted-foreground",
                  theme === "gold" && "text-amber-700 dark:text-amber-300",
                  theme === "blue" && "text-blue-700 dark:text-blue-300",
                  theme === "yellow" && "text-yellow-700 dark:text-yellow-300"
                )}>
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}