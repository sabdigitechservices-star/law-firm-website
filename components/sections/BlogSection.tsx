"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  Calendar, User, ArrowRight, Clock, BookOpen, 
  Tag, Heart, MessageCircle, Share2 
} from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { cn } from "@/lib/utils"

// Sample blog data - In real app, this would come from siteData.json
const blogPosts = [
  {
    id: 1,
    title: "Understanding Corporate Tax Changes in 2024",
    excerpt: "Recent tax reforms and their impact on businesses. Learn how to navigate the new regulations and optimize your tax strategy.",
    date: "2024-01-15",
    author: "John Anderson",
    category: "Corporate Law",
    image: "https://plus.unsplash.com/premium_photo-1698084059560-9a53de7b816b?q=80&w=1111&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    readTime: "5 min read",
    likes: 45,
    comments: 12,
    featured: true
  },
  {
    id: 2,
    title: "Your Rights During a Police Stop",
    excerpt: "Know what to do when stopped by law enforcement. Essential information to protect your rights and stay safe.",
    date: "2024-01-10",
    author: "Sarah Martinez",
    category: "Criminal Defense",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    readTime: "4 min read",
    likes: 38,
    comments: 8,
    featured: false
  },
  {
    id: 3,
    title: "Divorce Mediation vs. Litigation",
    excerpt: "Choosing the right path for your family. A comprehensive guide to understanding your options in family law.",
    date: "2024-01-05",
    author: "Michael Chen",
    category: "Family Law",
    image: "https://images.unsplash.com/photo-1423592707957-3b212afa6733?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxhd3llcnxlbnwwfHwwfHx8MA%3D%3D",
    readTime: "6 min read",
    likes: 52,
    comments: 15,
    featured: true
  },
  {
    id: 4,
    title: "Intellectual Property Protection for Startups",
    excerpt: "Essential IP strategies for new businesses. Protect your innovations and build valuable assets.",
    date: "2024-01-03",
    author: "Emily Roberts",
    category: "IP Law",
    image: "https://plus.unsplash.com/premium_photo-1661329930662-19a43503782f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    readTime: "7 min read",
    likes: 29,
    comments: 6,
    featured: false
  }
]

export function BlogSection() {
  const ref = useRef(null)
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)
  const { theme } = useTheme()
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  // Theme colors
  const getThemeColor = () => {
    switch(theme) {
      case "gold": return "amber-500"
      case "blue": return "blue-500"
      case "yellow": return "yellow-500"
      default: return "primary"
    }
  }

  const themeColor = getThemeColor()

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  // Category colors
  const categoryColors: Record<string, string> = {
    "Corporate Law": "from-blue-500 to-blue-600",
    "Criminal Defense": "from-red-500 to-red-600",
    "Family Law": "from-green-500 to-green-600",
    "IP Law": "from-purple-500 to-purple-600",
  }

  return (
    <section className={cn(
      "py-16 md:py-20 lg:py-24 relative overflow-hidden",
      theme === "gold" && "bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/10 dark:to-transparent",
      theme === "blue" && "bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/10 dark:to-transparent",
      theme === "yellow" && "bg-gradient-to-b from-yellow-50/50 to-white dark:from-yellow-950/10 dark:to-transparent"
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${
            theme === "gold" ? "#F59E0B" : 
            theme === "blue" ? "#3B82F6" : 
            theme === "yellow" ? "#EAB308" : 
            "#000"
          } 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Category Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2",
              theme === "gold" && "bg-amber-500/10 text-amber-600",
              theme === "blue" && "bg-blue-500/10 text-blue-600",
              theme === "yellow" && "bg-yellow-500/10 text-yellow-600"
            )}>
              <BookOpen className="h-4 w-4" />
              Legal Insights
            </span>
          </motion.div>

          {/* Title */}
          <h2 className={cn(
            "text-3xl sm:text-4xl md:text-5xl font-bold mb-4",
            theme === "gold" && "text-amber-900 dark:text-amber-100",
            theme === "blue" && "text-blue-900 dark:text-blue-100",
            theme === "yellow" && "text-yellow-900 dark:text-yellow-100"
          )}>
            Latest from Our Blog
          </h2>

          {/* Description */}
          <p className={cn(
            "text-base md:text-lg max-w-2xl mx-auto",
            theme === "gold" && "text-amber-700 dark:text-amber-300",
            theme === "blue" && "text-blue-700 dark:text-blue-300",
            theme === "yellow" && "text-yellow-700 dark:text-yellow-300"
          )}>
            Expert legal insights and updates from our attorneys
          </p>
        </motion.div>

        {/* Featured Post - Different Layout */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8 md:mb-12"
        >
          {blogPosts.filter(post => post.featured).map((post, index) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredPost(post.id)}
              onHoverEnd={() => setHoveredPost(null)}
              className="group"
            >
              <div className={cn(
                "grid lg:grid-cols-2 gap-6 md:gap-8 rounded-2xl md:rounded-3xl overflow-hidden",
                "bg-white dark:bg-gray-900",
                "border",
                theme === "gold" && "border-amber-200 dark:border-amber-800",
                theme === "blue" && "border-blue-200 dark:border-blue-800",
                theme === "yellow" && "border-yellow-200 dark:border-yellow-800",
                hoveredPost === post.id && cn(
                  "shadow-xl",
                  theme === "gold" && "shadow-amber-500/20",
                  theme === "blue" && "shadow-blue-500/20",
                  theme === "yellow" && "shadow-yellow-500/20"
                )
              )}>
                {/* Image Column */}
                <div className="relative h-64 sm:h-80 lg:h-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-700",
                      hoveredPost === post.id && "scale-110"
                    )}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t opacity-60",
                    theme === "gold" && "from-amber-900/80 to-transparent",
                    theme === "blue" && "from-blue-900/80 to-transparent",
                    theme === "yellow" && "from-yellow-900/80 to-transparent"
                  )} />

                  {/* Category Tag */}
                  <div className="absolute top-4 left-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      "bg-gradient-to-r text-white",
                      categoryColors[post.category] || "from-gray-500 to-gray-600"
                    )}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content Column */}
                <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm mb-4">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <User className="h-3 w-3 md:h-4 md:w-4" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3 md:h-4 md:w-4" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={cn(
                    "text-xl md:text-2xl lg:text-3xl font-bold mb-4",
                    theme === "gold" && "text-amber-900 dark:text-amber-100",
                    theme === "blue" && "text-blue-900 dark:text-blue-100",
                    theme === "yellow" && "text-yellow-900 dark:text-yellow-100"
                  )}>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm md:text-base text-muted-foreground mb-6">
                    {post.excerpt}
                  </p>

                  {/* Stats & CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
                        <Heart className="h-3 w-3 md:h-4 md:w-4" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
                        <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
                        {post.comments}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.id}`}
                      className={cn(
                        "inline-flex items-center gap-2 text-sm md:text-base font-semibold transition-all",
                        theme === "gold" && "text-amber-600 hover:text-amber-700",
                        theme === "blue" && "text-blue-600 hover:text-blue-700",
                        theme === "yellow" && "text-yellow-600 hover:text-yellow-700"
                      )}
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Regular Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {blogPosts.filter(post => !post.featured).map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredPost(post.id)}
              onHoverEnd={() => setHoveredPost(null)}
              className="group"
            >
              <div className={cn(
                "relative rounded-xl md:rounded-2xl overflow-hidden",
                "bg-white dark:bg-gray-900",
                "border",
                theme === "gold" && "border-amber-200 dark:border-amber-800",
                theme === "blue" && "border-blue-200 dark:border-blue-800",
                theme === "yellow" && "border-yellow-200 dark:border-yellow-800",
                hoveredPost === post.id && cn(
                  "shadow-xl",
                  theme === "gold" && "shadow-amber-500/20",
                  theme === "blue" && "shadow-blue-500/20",
                  theme === "yellow" && "shadow-yellow-500/20"
                )
              )}>
                {/* Image Container */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-500",
                      hoveredPost === post.id && "scale-110"
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Category Tag */}
                  <div className="absolute top-3 left-3">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-semibold",
                      "bg-gradient-to-r text-white",
                      categoryColors[post.category] || "from-gray-500 to-gray-600"
                    )}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={cn(
                    "text-lg md:text-xl font-bold mb-2 line-clamp-2",
                    theme === "gold" && "text-amber-900 dark:text-amber-100",
                    theme === "blue" && "text-blue-900 dark:text-blue-100",
                    theme === "yellow" && "text-yellow-900 dark:text-yellow-100"
                  )}>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      {post.author.split(' ')[0]}
                    </span>

                    <Link
                      href={`/blog/${post.id}`}
                      className={cn(
                        "text-sm font-semibold inline-flex items-center gap-1",
                        theme === "gold" && "text-amber-600 hover:text-amber-700",
                        theme === "blue" && "text-blue-600 hover:text-blue-700",
                        theme === "yellow" && "text-yellow-600 hover:text-yellow-700"
                      )}
                    >
                      Read
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Hover Stats */}
                  <motion.div
                    className={cn(
                      "absolute top-3 right-3 flex gap-2",
                      "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-1",
                      "border",
                      theme === "gold" && "border-amber-200",
                      theme === "blue" && "border-blue-200",
                      theme === "yellow" && "border-yellow-200"
                    )}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredPost === post.id ? 1 : 0,
                      scale: hoveredPost === post.id ? 1 : 0.8
                    }}
                  >
                    <span className="flex items-center gap-1 text-xs">
                      <Heart className="h-3 w-3 text-red-500" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1 text-xs">
                      <MessageCircle className="h-3 w-3 text-blue-500" />
                      {post.comments}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-12 lg:mt-16"
        >
          <Link
            href="/blog"
            className={cn(
              "inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl text-sm md:text-base font-semibold transition-all",
              "bg-gradient-to-r text-white",
              theme === "gold" && "from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
              theme === "blue" && "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
              theme === "yellow" && "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
            )}
          >
            <span>View All Articles</span>
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}