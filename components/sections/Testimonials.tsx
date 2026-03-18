"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"
import siteData from "@/data/siteData.json"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { cn } from "@/lib/utils"

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % siteData.testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + siteData.testimonials.length) % siteData.testimonials.length)
  }

  return (
    <SectionWrapper className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            What our clients say about their experience with us
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-2xl p-8 md:p-12"
              >
                {/* Quote Marks */}
                <div className="text-6xl text-primary/20 font-serif mb-4">"</div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < siteData.testimonials[currentIndex].rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted"
                      )}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-xl text-foreground mb-8 leading-relaxed">
                  {siteData.testimonials[currentIndex].content}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-primary/10">
                    <Image
                      src={`/images/testimonial-${currentIndex + 1}.jpg`}
                      alt={siteData.testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">
                      {siteData.testimonials[currentIndex].name}
                    </h4>
                    <p className="text-muted-foreground">
                      {siteData.testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {siteData.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}