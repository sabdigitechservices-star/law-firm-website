"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Award, Users, Scale, Calendar, Target, Heart, Shield, Zap, ArrowRight } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { cn } from "@/lib/utils"
import siteData from "@/data/siteData.json"
import Link from "next/link"

// Icon mapping for stats
const statIcons: Record<string, any> = {
  Trophy: Award,
  Users: Users,
  Scale: Scale,
  Calendar: Calendar
}

// Icon mapping for values
const valueIcons: Record<string, any> = {
  Shield: Shield,
  Target: Target,
  Heart: Heart,
  Zap: Zap
}

export default function AboutPage() {
  const { theme } = useTheme()
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  
  // Scroll animations
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 1])
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })

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
          gradient: "from-amber-500/20 via-transparent to-transparent",
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
          gradient: "from-blue-500/20 via-transparent to-transparent",
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
          gradient: "from-yellow-500/20 via-transparent to-transparent",
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
          gradient: "from-primary/20 via-transparent to-transparent",
          heading: "text-foreground",
          text: "text-muted-foreground"
        }
    }
  }

  const colors = getThemeColors()

  // Get founding year from milestones or stats
  const foundingYear = 1999

  // Prepare stats data from siteData.json
  const statsFromData = siteData.stats.map(stat => {
    const Icon = statIcons[stat.icon] || Award
    let description = ""
    switch(stat.label) {
      case "Cases Won": description = "Successful outcomes"; break;
      case "Happy Clients": description = "Satisfied customers"; break;
      case "Years Experience": description = "Legal expertise"; break;
      case "Expert Attorneys": description = "Dedicated team"; break;
      default: description = `${stat.label} achieved`
    }
    return {
      icon: Icon,
      label: stat.label,
      value: stat.value + "+",
      description: description
    }
  })

  // Values data
  const values = [
    { icon: Shield, title: "Integrity", description: "Unwavering ethical standards in every action" },
    { icon: Target, title: "Excellence", description: "Commitment to the highest quality legal service" },
    { icon: Heart, title: "Client-Centered", description: "Your interests are our priority" },
    { icon: Zap, title: "Innovation", description: "Modern approaches to legal challenges" },
  ]

  // Milestones data
  const milestones = [
    { year: "1999", title: "Founded", description: "Started with a vision for excellence" },
    { year: "2005", title: "Expanded", description: "Opened second office location" },
    { year: "2010", title: "Milestone", description: "Celebrated 500th successful case" },
    { year: "2015", title: "Recognition", description: "Received 'Best Law Firm' award" },
    { year: "2020", title: "Growth", description: `Team expanded to ${siteData.stats.find(s => s.label === "Expert Attorneys")?.value}+ attorneys` },
    { year: "2024", title: "Today", description: "Serving clients nationwide" },
  ]

  // Theme-based background images for hero section
  const backgroundImages = {
    gold: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&auto=format&fit=crop",
    blue: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1920&auto=format&fit=crop",
    yellow: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&auto=format&fit=crop"
  }

  return (
    <main ref={containerRef} className=" overflow-x-hidden">
      {/* Hero Section with Parallax and Background Image */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={backgroundImages[theme as keyof typeof backgroundImages] || backgroundImages.gold}
            alt="About Hero Background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: smoothScale, opacity }}
        >
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br mix-blend-overlay",
            theme === "gold" && "from-amber-500/30 via-transparent to-amber-500/20",
            theme === "blue" && "from-blue-500/30 via-transparent to-blue-500/20",
            theme === "yellow" && "from-yellow-500/30 via-transparent to-yellow-500/20"
          )} />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Animated badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm",
                theme === "gold" && "bg-amber-500/20 text-amber-100 border border-amber-500/30",
                theme === "blue" && "bg-blue-500/20 text-blue-100 border border-blue-500/30",
                theme === "yellow" && "bg-yellow-500/20 text-yellow-900 border border-yellow-500/30"
              )}>
                Since {foundingYear}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={cn(
                "text-5xl md:text-7xl font-bold mb-6 text-white"
              )}
            >
              About {siteData.firmName}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl max-w-2xl mx-auto text-white/90"
            >
              {siteData.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section with Parallax Image */}
      <SectionWrapper className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className={cn(
                  "text-3xl md:text-4xl font-bold mb-6",
                  colors.heading
                )}
              >
                Our Story
              </motion.h2>
              
              <div className="space-y-4">
                {[
                  `Founded in ${foundingYear}, ${siteData.firmName} has grown from a small practice to one of the most respected law firms in the region. Our journey began with a simple mission: to provide exceptional legal services with integrity and dedication.`,
                  `Over the past ${siteData.stats.find(s => s.label === "Years Experience")?.value} years, we have successfully represented thousands of clients across various practice areas. Our commitment to excellence and client satisfaction has earned us numerous accolades and, more importantly, the trust of our community.`,
                  `Today, our team of ${siteData.stats.find(s => s.label === "Expert Attorneys")?.value}+ experienced attorneys continues to uphold the values that have defined us from the beginning: integrity, excellence, and unwavering dedication to our clients' interests.`
                ].map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className={cn(
                      "text-lg leading-relaxed",
                      colors.text
                    )}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative perspective-1000"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1590099543482-3b3d3083a474?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGxhd3llcnN8ZW58MHx8MHx8fDA%3D"
                    alt="Our Story"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>
                
                {/* Overlay with gradient */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  theme === "gold" && "from-amber-500/30 to-transparent",
                  theme === "blue" && "from-blue-500/30 to-transparent",
                  theme === "yellow" && "from-yellow-500/30 to-transparent"
                )} />
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* Milestones Timeline */}
      <SectionWrapper className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={cn(
              "text-3xl md:text-4xl font-bold text-center mb-12",
              colors.heading
            )}
          >
            Our Journey
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className={cn(
                  "p-4 rounded-xl border text-center transition-all duration-300",
                  theme === "gold" && "border-amber-200 dark:border-amber-800 group-hover:border-amber-500",
                  theme === "blue" && "border-blue-200 dark:border-blue-800 group-hover:border-blue-500",
                  theme === "yellow" && "border-yellow-200 dark:border-yellow-800 group-hover:border-yellow-500"
                )}>
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className={cn(
                      "text-2xl font-bold block mb-2",
                      theme === "gold" && "text-amber-600",
                      theme === "blue" && "text-blue-600",
                      theme === "yellow" && "text-yellow-600"
                    )}
                  >
                    {milestone.year}
                  </motion.span>
                  <h3 className="font-semibold text-foreground mb-1">{milestone.title}</h3>
                  <p className="text-xs text-muted-foreground">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Stats Section with Counter Animation */}
      <SectionWrapper className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsFromData.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                  className="relative group cursor-pointer"
                  onHoverStart={() => setHoveredStat(index)}
                  onHoverEnd={() => setHoveredStat(null)}
                >
                  <div className={cn(
                    "text-center p-6 rounded-2xl border transition-all duration-300",
                    theme === "gold" && "border-amber-200 dark:border-amber-800 group-hover:border-amber-500 group-hover:shadow-lg group-hover:shadow-amber-500/10",
                    theme === "blue" && "border-blue-200 dark:border-blue-800 group-hover:border-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/10",
                    theme === "yellow" && "border-yellow-200 dark:border-yellow-800 group-hover:border-yellow-500 group-hover:shadow-lg group-hover:shadow-yellow-500/10"
                  )}>
                    <motion.div 
                      className={cn(
                        "inline-flex p-4 rounded-2xl mb-4 transition-all duration-300",
                        theme === "gold" && "bg-amber-500/10 group-hover:bg-amber-500/20",
                        theme === "blue" && "bg-blue-500/10 group-hover:bg-blue-500/20",
                        theme === "yellow" && "bg-yellow-500/10 group-hover:bg-yellow-500/20"
                      )}
                      animate={{
                        scale: hoveredStat === index ? 1.1 : 1,
                        rotate: hoveredStat === index ? [0, -5, 5, 0] : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className={cn(
                        "h-8 w-8",
                        theme === "gold" && "text-amber-500",
                        theme === "blue" && "text-blue-500",
                        theme === "yellow" && "text-yellow-500"
                      )} />
                    </motion.div>
                    
                    <motion.h3 
                      className={cn(
                        "text-4xl font-bold mb-2",
                        theme === "gold" && "text-amber-900 dark:text-amber-100",
                        theme === "blue" && "text-blue-900 dark:text-blue-100",
                        theme === "yellow" && "text-yellow-900 dark:text-yellow-100"
                      )}
                      animate={{
                        scale: hoveredStat === index ? 1.1 : 1
                      }}
                    >
                      {stat.value}
                    </motion.h3>
                    
                    <p className={cn(
                      "font-medium mb-1",
                      colors.text
                    )}>
                      {stat.label}
                    </p>
                    
                    <motion.p 
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: hoveredStat === index ? 1 : 0,
                        height: hoveredStat === index ? "auto" : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {stat.description}
                    </motion.p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* Mission & Values with Card Flip */}
      <SectionWrapper className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative group perspective-1000"
            >
              <div className={cn(
                "p-8 rounded-2xl border transition-all duration-500 min-h-[300px]",
                theme === "gold" && "border-amber-200 dark:border-amber-800 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10",
                theme === "blue" && "border-blue-200 dark:border-blue-800 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10",
                theme === "yellow" && "border-yellow-200 dark:border-yellow-800 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10",
                "bg-card"
              )}>
                <motion.div
                  className="mb-6"
                  animate={{
                    rotateY: [0, 180, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Target className={cn(
                    "h-12 w-12",
                    theme === "gold" && "text-amber-500",
                    theme === "blue" && "text-blue-500",
                    theme === "yellow" && "text-yellow-500"
                  )} />
                </motion.div>

                <h3 className={cn(
                  "text-2xl font-bold mb-4",
                  colors.heading
                )}>
                  Our Mission
                </h3>
                
                <p className={cn(
                  "text-lg leading-relaxed",
                  colors.text
                )}>
                  To provide accessible, high-quality legal representation that protects our clients' rights and interests while maintaining the highest ethical standards.
                </p>

                {/* Animated underline */}
                <motion.div
                  className={cn(
                    "absolute bottom-0 left-0 h-1",
                    theme === "gold" && "bg-amber-500",
                    theme === "blue" && "bg-blue-500",
                    theme === "yellow" && "bg-yellow-500"
                  )}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -5,
                      rotateX: 5,
                      rotateY: 5,
                      transition: { duration: 0.2 }
                    }}
                    className={cn(
                      "p-6 rounded-xl border bg-card transition-all duration-300",
                      theme === "gold" && "border-amber-200 dark:border-amber-800 hover:border-amber-500",
                      theme === "blue" && "border-blue-200 dark:border-blue-800 hover:border-blue-500",
                      theme === "yellow" && "border-yellow-200 dark:border-yellow-800 hover:border-yellow-500"
                    )}
                    onHoverStart={() => setHoveredValue(index)}
                    onHoverEnd={() => setHoveredValue(null)}
                  >
                    <motion.div
                      animate={{
                        rotate: hoveredValue === index ? 360 : 0,
                        scale: hoveredValue === index ? 1.2 : 1
                      }}
                      transition={{ duration: 0.6 }}
                      className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                        theme === "gold" && "bg-amber-500/10",
                        theme === "blue" && "bg-blue-500/10",
                        theme === "yellow" && "bg-yellow-500/10"
                      )}
                    >
                      <Icon className={cn(
                        "h-6 w-6",
                        theme === "gold" && "text-amber-500",
                        theme === "blue" && "text-blue-500",
                        theme === "yellow" && "text-yellow-500"
                      )} />
                    </motion.div>
                    
                    <h4 className={cn(
                      "text-lg font-bold mb-2",
                      colors.heading
                    )}>
                      {value.title}
                    </h4>
                    
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Team CTA */}
      <SectionWrapper className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={cn(
              "relative rounded-3xl p-12 text-center overflow-hidden",
              theme === "gold" && "bg-gradient-to-br from-amber-500 to-amber-700",
              theme === "blue" && "bg-gradient-to-br from-blue-500 to-blue-700",
              theme === "yellow" && "bg-gradient-to-br from-yellow-400 to-yellow-600"
            )}
          >
            {/* Animated background particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                }}
                animate={{
                  x: [null, Math.random() * 100 + "%"],
                  y: [null, Math.random() * 100 + "%"],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Meet Our Expert Team
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              Our experienced attorneys are ready to help you with your legal needs
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href="/attorneys"
                className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-colors group"
              >
                View All Attorneys
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>
    </main>
  )
}