"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Scale, ChevronDown, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher"
import siteData from "@/data/siteData.json"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  // { href: "/practice-areas", label: "Practice Areas" },
  { href: "/attorneys", label: "Attorneys" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const pathname = usePathname()
  const { theme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Theme-based colors for when scrolled
  const getScrolledBg = () => {
    if (!scrolled) return "bg-transparent"
    
    switch(theme) {
      case "gold":
        return "bg-white backdrop-blur-lg"
      case "blue":
        return "bg-white backdrop-blur-lg"
      case "yellow":
        return "bg-white backdrop-blur-lg"
      default:
        return "bg-white backdrop-blur-lg"
    }
  }

  // Theme-based text colors
  const getTextColor = (isActive: boolean) => {
    if (scrolled) {
      return isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"
    }
    // When not scrolled - always white
    return isActive ? "text-white font-semibold" : "text-white/80 hover:text-white"
  }

  // Theme-based underline color
  const getUnderlineColor = () => {
    if (scrolled) {
      switch(theme) {
        case "gold": return "bg-amber-500"
        case "blue": return "bg-blue-500"
        case "yellow": return "bg-yellow-500"
        default: return "bg-primary"
      }
    }
    return "bg-white" // When not scrolled, white underline
  }

  // Theme-based logo background
  const getLogoBg = () => {
    if (scrolled) {
      switch(theme) {
        case "gold": return "bg-amber-500"
        case "blue": return "bg-blue-500"
        case "yellow": return "bg-yellow-500"
        default: return "bg-primary"
      }
    }
    return "bg-white/20 backdrop-blur-sm" // When not scrolled, transparent white
  }

  // Theme-based CTA button
  const getCtaButton = () => {
    if (scrolled) {
      switch(theme) {
        case "gold": return "bg-amber-500 text-white hover:bg-amber-600"
        case "blue": return "bg-blue-500 text-white hover:bg-blue-600"
        case "yellow": return "bg-yellow-500 text-black hover:bg-yellow-600"
        default: return "bg-primary text-primary-foreground hover:bg-primary/90"
      }
    }
    // When not scrolled - transparent with white border
    return "bg-transparent border-2 border-white text-white hover:bg-white/10"
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        getScrolledBg(),
        !scrolled && "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Enhanced Design */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo Icon with Animation */}
            <div className="relative">
              <motion.div
                className={cn(
                  "absolute inset-0 rounded-xl blur-xl transition-all duration-300",
                  scrolled ? "opacity-50" : "opacity-100",
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
                  !scrolled && "text-white",
                  scrolled && theme === "yellow" && "text-black",
                  scrolled && theme !== "yellow" && "text-white"
                )} />
              </div>
            </div>

            {/* Logo Text */}
            <div className="hidden sm:block">
              <motion.p 
                className={cn(
                  "text-xl font-bold leading-tight transition-colors",
                  !scrolled ? "text-white" : "text-foreground"
                )}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {siteData.firmName.split(" ")[0]}
              </motion.p>
              <motion.p 
                className={cn(
                  "text-xs leading-tight transition-colors",
                  !scrolled ? "text-white/70" : "text-muted-foreground"
                )}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Legal Excellence
              </motion.p>
            </div>
          </Link>

          {/* Desktop Navigation - Enhanced Design */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredLink(link.href)}
                onHoverEnd={() => setHoveredLink(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300",
                    "overflow-hidden group",
                    getTextColor(pathname === link.href)
                  )}
                >
                  {/* Hover Background Effect */}
                  <motion.span
                    className={cn(
                      "absolute inset-0 rounded-md",
                      !scrolled ? "bg-white/10" : "bg-primary/10"
                    )}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: hoveredLink === link.href ? 1 : 0,
                      opacity: hoveredLink === link.href ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  {/* Link Text */}
                  <span className="relative z-10">{link.label}</span>
                  
                  {/* Animated Underline */}
                  <motion.span
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5",
                      getUnderlineColor()
                    )}
                    initial={{ width: 0 }}
                    animate={{
                      width: hoveredLink === link.href ? "100%" : pathname === link.href ? "100%" : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side Actions - Enhanced */}
          <div className="flex items-center gap-4">
            {/* Phone Number - visible on larger screens */}
            <motion.a
              href={`tel:${siteData.contact.phone}`}
              className={cn(
                "hidden md:flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300",
                !scrolled ? "text-white/90 hover:text-white" : "text-foreground hover:text-primary"
              )}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">{siteData.contact.phone}</span>
            </motion.a>

            <ThemeSwitcher scrolled={scrolled} />

            {/* CTA Button - Enhanced */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/contact"
                className={cn(
                  "hidden sm:inline-flex relative group overflow-hidden rounded-lg px-6 py-2.5 font-medium transition-all duration-300",
                  getCtaButton()
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Free Consultation
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                  >
                    <ChevronDown className="h-4 w-4 rotate-180" />
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </motion.div>

            {/* Mobile Menu Button - Enhanced */}
            <button
              className={cn(
                "lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300",
                !scrolled 
                  ? "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm" 
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <motion.div 
                className={cn(
                  "border-t mt-4 pt-4 pb-6",
                  !scrolled ? "border-white/20" : "border-border"
                )}
              >
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block px-4 py-4 text-base font-medium rounded-xl transition-all duration-300",
                          !scrolled 
                            ? pathname === link.href
                              ? "bg-white/20 text-white"
                              : "text-white/80 hover:text-white hover:bg-white/10"
                            : pathname === link.href
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Phone */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                    className="px-4 py-3"
                  >
                    <a
                      href={`tel:${siteData.contact.phone}`}
                      className={cn(
                        "flex items-center gap-2 text-sm",
                        !scrolled ? "text-white/70" : "text-muted-foreground"
                      )}
                    >
                      <Phone className="h-4 w-4" />
                      {siteData.contact.phone}
                    </a>
                  </motion.div>

                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.35 }}
                    className="pt-4 px-4"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block w-full text-center rounded-xl px-4 py-4 font-medium transition-all duration-300",
                        !scrolled
                          ? "bg-white text-black hover:bg-white/90"
                          : theme === "gold" ? "bg-amber-500 text-white" :
                            theme === "blue" ? "bg-blue-500 text-white" :
                            theme === "yellow" ? "bg-yellow-500 text-black" :
                            "bg-primary text-primary-foreground"
                      )}
                    >
                      Free Consultation
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}