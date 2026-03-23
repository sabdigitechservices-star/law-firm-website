"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { 
  Stethoscope, Heart, Phone, Mail, MapPin, Clock, 
  Facebook, Twitter, Linkedin, Instagram, ArrowUp, 
  Award, Users, Calendar, Scale, Shield, HeartHandshake,
  ExternalLink, Sparkles
} from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import siteData from "@/data/siteData.json"
import { cn } from "@/lib/utils"

export function Footer() {
  const { theme } = useTheme()
  const currentYear = new Date().getFullYear()
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-50px" })

  // Theme-based colors matching Navigation
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
          gradient: "from-amber-500 to-amber-600",
          gradientLight: "from-amber-500/20 via-transparent to-transparent",
          badge: "bg-amber-500 text-white",
          heading: "text-amber-900 dark:text-amber-100",
          text: "text-amber-700 dark:text-amber-300",
          muted: "text-amber-600/80 dark:text-amber-400/80",
          logoBg: "bg-amber-500"
        }
      case "blue":
        return {
          primary: "text-blue-500",
          primaryBg: "bg-blue-500",
          primaryBgLight: "bg-blue-500/10",
          primaryBgLighter: "bg-blue-500/20",
          border: "border-blue-500/20",
          hoverBorder: "hover:border-blue-500/50",
          gradient: "from-blue-500 to-blue-600",
          gradientLight: "from-blue-500/20 via-transparent to-transparent",
          badge: "bg-blue-500 text-white",
          heading: "text-blue-900 dark:text-blue-100",
          text: "text-blue-700 dark:text-blue-300",
          muted: "text-blue-600/80 dark:text-blue-400/80",
          logoBg: "bg-blue-500"
        }
      case "yellow":
        return {
          primary: "text-yellow-500",
          primaryBg: "bg-yellow-500",
          primaryBgLight: "bg-yellow-500/10",
          primaryBgLighter: "bg-yellow-500/20",
          border: "border-yellow-500/20",
          hoverBorder: "hover:border-yellow-500/50",
          gradient: "from-yellow-500 to-yellow-600",
          gradientLight: "from-yellow-500/20 via-transparent to-transparent",
          badge: "bg-yellow-500 text-black",
          heading: "text-yellow-900 dark:text-yellow-100",
          text: "text-yellow-700 dark:text-yellow-300",
          muted: "text-yellow-600/80 dark:text-yellow-400/80",
          logoBg: "bg-yellow-500"
        }
      default:
        return {
          primary: "text-primary",
          primaryBg: "bg-primary",
          primaryBgLight: "bg-primary/10",
          primaryBgLighter: "bg-primary/20",
          border: "border-primary/20",
          hoverBorder: "hover:border-primary/50",
          gradient: "from-primary to-primary/80",
          gradientLight: "from-primary/20 via-transparent to-transparent",
          badge: "bg-primary text-primary-foreground",
          heading: "text-foreground",
          text: "text-muted-foreground",
          muted: "text-muted-foreground",
          logoBg: "bg-primary"
        }
    }
  }

  const colors = getThemeColors()

  // Logo background style (same as header)
  const getLogoBg = () => {
    return colors.logoBg
  }

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Attorneys", href: "/attorneys" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ]
    }
  ]

  const contactInfo = [
    { icon: Phone, label: "Phone", value: siteData.contact.phone, href: `tel:${siteData.contact.phone}` },
    { icon: Mail, label: "Email", value: siteData.contact.email, href: `mailto:${siteData.contact.email}` },
    { icon: MapPin, label: "Address", value: siteData.contact.address, href: "#" },
    { icon: Clock, label: "Hours", value: siteData.contact.hours, href: "#" },
  ]

  const socialLinks = [
    { icon: Facebook, href: siteData.social?.facebook || "#", label: "Facebook" },
    { icon: Twitter, href: siteData.social?.twitter || "#", label: "Twitter" },
    { icon: Linkedin, href: siteData.social?.linkedin || "#", label: "LinkedIn" },
    { icon: Instagram, href: siteData.social?.instagram || "#", label: "Instagram" },
  ]

  return (
    <footer 
      ref={footerRef}
      className={cn(
        "relative overflow-hidden",
        theme === "gold" && "bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-950/10",
        theme === "blue" && "bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/10",
        theme === "yellow" && "bg-gradient-to-b from-yellow-50/50 to-transparent dark:from-yellow-950/10"
      )}
    >
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

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section with Same Logo as Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Logo - Same as Header */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <motion.div
                  className={cn(
                    "absolute inset-0 rounded-xl blur-xl transition-all duration-300",
                    "opacity-50",
                    theme === "gold" && "bg-amber-500/30",
                    theme === "blue" && "bg-blue-500/30",
                    theme === "yellow" && "bg-yellow-500/30"
                  )}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <div className={cn(
                  "relative flex h-14 w-14 items-center justify-center rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-110",
                  getLogoBg()
                )}>
                  <Scale className={cn(
                    "h-7 w-7",
                    "text-white"
                  )} />
                </div>
              </div>

              {/* Logo Text */}
              <div>
                <motion.p 
                  className={cn(
                    "text-xl font-bold leading-tight transition-colors",
                    colors.heading
                  )}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 }}
                >
                  {siteData.firmName.split(" ")[0]}
                </motion.p>
                <motion.p 
                  className={cn(
                    "text-xs leading-tight transition-colors",
                    colors.muted
                  )}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 }}
                >
                  Legal Excellence
                </motion.p>
              </div>
            </Link>

            <p className={cn("text-sm leading-relaxed", colors.text)}>
              {siteData.description}
            </p>
            
            {/* Stats Mini */}
            <div className="flex gap-4 pt-2">
              <div>
                <p className={cn("text-lg font-bold", colors.primary)}>
                  {siteData.stats?.find(s => s.label === "Cases Won")?.value || "1500+"}
                </p>
                <p className="text-xs text-muted-foreground">Cases Won</p>
              </div>
              <div>
                <p className={cn("text-lg font-bold", colors.primary)}>
                  {siteData.stats?.find(s => s.label === "Happy Clients")?.value || "1200+"}
                </p>
                <p className="text-xs text-muted-foreground">Happy Clients</p>
              </div>
              <div>
                <p className={cn("text-lg font-bold", colors.primary)}>
                  {siteData.stats?.find(s => s.label === "Years Experience")?.value || "25+"}
                </p>
                <p className="text-xs text-muted-foreground">Years</p>
              </div>
            </div>

            {/* Decorative dot */}
            <div className="flex gap-1 pt-2">
              {[1, 2, 3].map((_, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    theme === "gold" && "bg-amber-400",
                    theme === "blue" && "bg-blue-400",
                    theme === "yellow" && "bg-yellow-400"
                  )}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-4"
            >
              <h4 className={cn("font-semibold", colors.heading)}>{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm transition-colors duration-300 inline-flex items-center gap-1 group",
                        colors.text,
                        "hover:text-primary"
                      )}
                    >
                      {link.label}
                      <ArrowUp className="h-3 w-3 rotate-90 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className={cn("font-semibold", colors.heading)}>Contact Info</h4>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-start gap-3 text-sm transition-colors group"
                  >
                    <item.icon className={cn("h-4 w-4 mt-0.5", colors.primary)} />
                    <span className={cn("flex-1", colors.text)}>{item.value}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider with gradient */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8 }}
          className={cn(
            "h-px bg-gradient-to-r from-transparent via-border to-transparent"
          )}
        />

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex gap-4"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center",
                  "bg-muted transition-all duration-300",
                  "hover:bg-gradient-to-br hover:text-white hover:shadow-lg",
                  colors.gradient
                )}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>

          {/* Copyright - SAB Digitech Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className={cn("text-sm", colors.muted)}>
              © {currentYear} <span className={cn("font-semibold", colors.primary)}>
                <a
                href="https://www.sabdigitech.in/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-1 font-medium transition-colors",
                  colors.primary,
                  "hover:opacity-80"
                )}
              >
                SAB Digitech Service
                <ExternalLink className="h-3 w-3" />
              </a>
                </span>. All Rights Reserved.
            </p>
            <p className="text-xs mt-1 flex items-center justify-center gap-1">
              <span className={colors.muted}>Best Legal Excellence</span>
              
            </p>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2"
          >
            <Shield className={cn("h-4 w-4", colors.primary)} />
            <span className={cn("text-xs", colors.muted)}>Trusted Legal Partner</span>
          </motion.div>
        </div>

        {/* Additional Info with animated heart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-6 pt-6 border-t border-border text-center"
        >
          <p className={cn("text-xs", colors.muted)}>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <Heart className={cn("h-3 w-3 inline mr-1", colors.primary)} />
            </motion.span>
            Committed to providing exceptional legal services with integrity and dedication
          </p>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r",
        theme === "gold" && "from-amber-500 via-amber-400 to-amber-500",
        theme === "blue" && "from-blue-500 via-blue-400 to-blue-500",
        theme === "yellow" && "from-yellow-500 via-yellow-400 to-yellow-500"
      )} />

      {/* Sparkle effect at bottom corners */}
      <motion.div
        className="absolute bottom-4 left-4 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className={cn("h-6 w-6", colors.primary)} />
      </motion.div>
      <motion.div
        className="absolute bottom-4 right-4 opacity-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className={cn("h-6 w-6", colors.primary)} />
      </motion.div>
    </footer>
  )
}