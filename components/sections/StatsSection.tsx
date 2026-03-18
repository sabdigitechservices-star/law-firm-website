"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";
import { Award, Users, Briefcase, Star, Trophy, Calendar, Scale } from "lucide-react";
import siteData from "@/data/siteData.json";

// Icon mapping for different stat types
const iconMap: Record<string, any> = {
  Trophy: Award,
  Users: Users,
  Calendar: Briefcase,
  Scale: Star,
  // Add more mappings as needed
};

// Custom hook for count-up animation
function useCountUp(endValue: number, duration: number = 2000) {
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

function StatItem({ value, label, suffix, icon, description }: any) {
  const { count, ref, isVisible } = useCountUp(value, 2000);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  // Get the appropriate icon component
  const Icon = iconMap[icon] || Award;

  // Description based on stat label (you can add these to siteData.json if needed)
  const getDescription = () => {
    switch(label) {
      case "Cases Won": return "Successful outcomes";
      case "Happy Clients": return "Satisfied customers";
      case "Years Experience": return "Legal expertise";
      case "Expert Attorneys": return "Dedicated team";
      default: return description || "Our achievement";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Main Content */}
      <div className="relative z-10 text-center p-6">
        {/* Icon with Animation */}
        <motion.div
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="h-8 w-8 text-white" />
        </motion.div>

        {/* Count */}
        <motion.div
          className="text-5xl md:text-6xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
        >
          {count}{suffix}
        </motion.div>

        {/* Label */}
        <div className="text-lg md:text-xl font-semibold text-white/90 mb-2">
          {label}
        </div>

        {/* Description - Appears on hover */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-sm text-white/80">
            {getDescription()}
          </p>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white"
          animate={{
            width: isHovered ? "50%" : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Background Glow on Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-sm"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{ zIndex: -1 }}
      />
    </motion.div>
  );
}

export default function StatsSection() {
  const { theme } = useTheme();

  // Get stats from siteData.json
  const statsFromData = siteData.stats.map(stat => {
    // Add suffix based on label
    let suffix = "+";
    if (stat.label === "Expert Attorneys") suffix = "";
    
    // Map icon names
    return {
      value: stat.value,
      label: stat.label,
      suffix: suffix,
      icon: stat.icon,
      description: `${stat.label} achieved`
    };
  });

  // Background images based on theme
  const backgroundImages = {
    gold: "https://plus.unsplash.com/premium_photo-1661769577787-9811af17f98d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGxhd3llcnN8ZW58MHx8MHx8fDA%3D",
    blue: "https://plus.unsplash.com/premium_photo-1661769577787-9811af17f98d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGxhd3llcnN8ZW58MHx8MHx8fDA%3D",
    yellow: "https://plus.unsplash.com/premium_photo-1661769577787-9811af17f98d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGxhd3llcnN8ZW58MHx8MHx8fDA%3D"
  };

  // Theme-based overlay color
  const getOverlayColor = () => {
    switch(theme) {
      case "gold": return "rgba(245, 158, 11, 0.9)";
      case "blue": return "rgba(37, 99, 235, 0.9)";
      case "yellow": return "rgba(234, 179, 8, 0.9)";
      default: return "rgba(0, 0, 0, 0.9)";
    }
  };

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImages[theme as keyof typeof backgroundImages] || backgroundImages.gold}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay with Theme Color */}
      <div
        className="absolute inset-0"
        style={{ 
          backgroundColor: getOverlayColor(),
          transition: 'background-color 0.3s ease'
        }}
      />

      {/* Animated Particles Overlay */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              y: [null, Math.random() * 100 + "%"],
              opacity: [0, 1, 0],
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
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Achievements
          </h2>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full" />
        </motion.div>

        {/* Stats Grid - Using data from siteData.json */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {statsFromData.map((stat, index) => (
            <StatItem key={index} {...stat} index={index} />
          ))}
        </div>
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
            fill="rgba(255,255,255,0.1)"
            d="M0,0 L48,10 C96,20,192,40,288,45 C384,50,480,40,576,35 C672,30,768,30,864,35 C960,40,1056,50,1152,45 C1248,40,1344,20,1392,10 L1440,0 L1440,100 L1392,100 C1344,100,1248,100,1152,100 C1056,100,960,100,864,100 C768,100,672,100,576,100 C480,100,384,100,288,100 C192,100,96,100,48,100 L0,100 Z"
          />
        </svg>
      </div>
    </section>
  );
}