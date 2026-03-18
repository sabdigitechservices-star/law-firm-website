"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";
import { 
  Scale, Shield, Gavel, Handshake, 
  Clock, TrendingUp, Users, Globe,
  CheckCircle, Award, Briefcase, Star
} from "lucide-react";
import siteData from "@/data/siteData.json";

// Icon mapping for different icon types
const iconMap: Record<string, any> = {
  Scale: Scale,
  Shield: Shield,
  Gavel: Gavel,
  Handshake: Handshake,
  Clock: Clock,
  TrendingUp: TrendingUp,
  Users: Users,
  Globe: Globe,
  CheckCircle: CheckCircle,
  Award: Award,
  Briefcase: Briefcase,
  Star: Star
};

// Custom hook for counter animation (optional for some elements)
function useCounter(endValue: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
      let start = 0;
      const increment = endValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= endValue) {
          setCount(endValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, endValue, duration]);

  return { count, ref, isVisible };
}

function FeatureItem({ icon, title, description, highlight, highlightIcon, color }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-50px" });

  // Get icon components
  const Icon = iconMap[icon] || Scale;
  const HighlightIcon = iconMap[highlightIcon] || Award;

  // Theme-based colors for hover states
  const getThemeHoverColor = () => {
    switch(theme) {
      case "gold": return "rgba(245, 158, 11, 0.2)";
      case "blue": return "rgba(59, 130, 246, 0.2)";
      case "yellow": return "rgba(234, 179, 8, 0.2)";
      default: return "rgba(255, 255, 255, 0.2)";
    }
  };

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Main Content Card */}
      <div className={cn(
        "relative z-10 p-6 md:p-8 rounded-2xl overflow-hidden",
        "bg-white/10 backdrop-blur-sm border",
        theme === "gold" && "border-amber-500/20",
        theme === "blue" && "border-blue-500/20",
        theme === "yellow" && "border-yellow-500/20",
        "transition-all duration-500"
      )}>
        {/* Background Gradient on Hover */}
        <motion.div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-500",
            "bg-gradient-to-br",
            color
          )}
          animate={{ opacity: isHovered ? 0.2 : 0 }}
        />

        {/* Icon Container */}
        <motion.div
          className={cn(
            "relative w-20 h-20 mx-auto mb-6 rounded-2xl",
            "bg-gradient-to-br flex items-center justify-center",
            color
          )}
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotateY: isHovered ? 180 : 0,
          }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="h-10 w-10 text-white" />
          
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: isHovered ? ["-100%", "100%"] : "-100%"
            }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        {/* Title */}
        <motion.h3
          className={cn(
            "text-xl md:text-2xl font-bold text-center mb-3",
            theme === "gold" && "text-amber-900 dark:text-amber-100",
            theme === "blue" && "text-blue-900 dark:text-blue-100",
            theme === "yellow" && "text-yellow-900 dark:text-yellow-100"
          )}
          animate={{
            scale: isHovered ? 1.05 : 1
          }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <p className={cn(
          "text-sm md:text-base text-center mb-6",
          theme === "gold" && "text-amber-700 dark:text-amber-300",
          theme === "blue" && "text-blue-700 dark:text-blue-300",
          theme === "yellow" && "text-yellow-700 dark:text-yellow-300"
        )}>
          {description}
        </p>

        {/* Highlight Badge */}
        <motion.div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full",
            "bg-gradient-to-r text-white text-sm font-semibold mx-auto",
            color
          )}
          animate={{
            scale: isHovered ? 1.1 : 1,
            y: isHovered ? -2 : 0
          }}
        >
          <HighlightIcon className="h-4 w-4" />
          <span>{highlight}</span>
        </motion.div>

        {/* Decorative Corner */}
        <motion.div
          className={cn(
            "absolute top-0 right-0 w-16 h-16",
            "bg-gradient-to-bl from-transparent",
            theme === "gold" && "to-amber-500/20",
            theme === "blue" && "to-blue-500/20",
            theme === "yellow" && "to-yellow-500/20"
          )}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0
          }}
        />
      </div>

      {/* Outer Glow on Hover */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-2xl blur-xl -z-10",
          "bg-gradient-to-br",
          color
        )}
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

export default function WhyChooseUsSection() {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Get features from siteData.json
  const features = siteData.whyChooseUs || [];

  // Background images based on theme (different from stats section)
  const backgroundImages = {
    gold: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&auto=format&fit=crop",
    blue: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1920&auto=format&fit=crop",
    yellow: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&auto=format&fit=crop"
  };

  // Theme-based overlay color
  const getOverlayColor = () => {
    switch(theme) {
      case "gold": return "rgba(0, 0, 0, 0.85)";
      case "blue": return "rgba(0, 0, 0, 0.85)";
      case "yellow": return "rgba(0, 0, 0, 0.85)";
      default: return "rgba(0, 0, 0, 0.85)";
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImages[theme as keyof typeof backgroundImages] || backgroundImages.gold}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{ 
          backgroundColor: getOverlayColor(),
          transition: 'background-color 0.3s ease'
        }}
      />

      {/* Animated Particles (lighter than stats section) */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute rounded-full",
              theme === "gold" && "bg-amber-500",
              theme === "blue" && "bg-blue-500",
              theme === "yellow" && "bg-yellow-500"
            )}
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Decorative Badge */}
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className={cn(
              "inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4",
              theme === "gold" && "bg-amber-500/20 text-amber-300",
              theme === "blue" && "bg-blue-500/20 text-blue-300",
              theme === "yellow" && "bg-yellow-500/20 text-yellow-300"
            )}
          >
            <Award className="h-4 w-4 inline-block mr-2" />
            Why Choose Us
          </motion.span>

          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4",
            "font-serif"
          )}>
            The {siteData.firmName} Advantage
          </h2>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            What sets us apart from other law firms
          </p>

          {/* Decorative Line */}
          <motion.div
            className="w-24 h-1 mx-auto mt-6 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${
                theme === "gold" ? "#F59E0B" :
                theme === "blue" ? "#3B82F6" :
                theme === "yellow" ? "#EAB308" :
                "#FFFFFF"
              }, transparent)`
            }}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Features Grid - Using data from siteData.json */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={feature.id || index} {...feature} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-8 py-4 rounded-xl font-semibold text-lg",
              "bg-gradient-to-r text-white",
              theme === "gold" && "from-amber-500 to-amber-600",
              theme === "blue" && "from-blue-500 to-blue-600",
              theme === "yellow" && "from-yellow-500 to-yellow-600"
            )}
          >
            Schedule a Consultation
          </motion.button>
        </motion.div>
      </div>

      {/* Top Wave Effect */}
      <div className="absolute top-0 left-0 w-full rotate-180">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(255,255,255,0.05)"
            d="M0,0 L48,10 C96,20,192,40,288,45 C384,50,480,40,576,35 C672,30,768,30,864,35 C960,40,1056,50,1152,45 C1248,40,1344,20,1392,10 L1440,0 L1440,100 L1392,100 C1344,100,1248,100,1152,100 C1056,100,960,100,864,100 C768,100,672,100,576,100 C480,100,384,100,288,100 C192,100,96,100,48,100 L0,100 Z"
          />
        </svg>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(255,255,255,0.05)"
            d="M0,0 L48,10 C96,20,192,40,288,45 C384,50,480,40,576,35 C672,30,768,30,864,35 C960,40,1056,50,1152,45 C1248,40,1344,20,1392,10 L1440,0 L1440,100 L1392,100 C1344,100,1248,100,1152,100 C1056,100,960,100,864,100 C768,100,672,100,576,100 C480,100,384,100,288,100 C192,100,96,100,48,100 L0,100 Z"
          />
        </svg>
      </div>
    </section>
  );
}