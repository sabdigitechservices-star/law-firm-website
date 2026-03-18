"use client"

import { motion } from "framer-motion"
import { 
  Building2, Scale, Heart, Home, Activity, Globe,
  ArrowRight 
} from "lucide-react"
import Link from "next/link"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import siteData from "@/data/siteData.json"

const iconMap: Record<string, any> = {
  Building2,
  Scale,
  Heart,
  Home,
  Activity,
  Globe
}

export default function PracticeAreasPage() {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Practice Areas
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive legal expertise across multiple domains to serve all your needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <SectionWrapper className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteData.practiceAreas.map((area, index) => {
              const Icon = iconMap[area.icon] || Scale

              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link href={`/practice-areas/${area.title.toLowerCase().replace(" ", "-")}`}>
                    <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 h-full">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                        <div className="relative w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {area.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                          {area.cases}+ Cases
                        </span>
                        <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* Why Choose Us */}
      <SectionWrapper className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Firm
            </h2>
            <p className="text-lg text-muted-foreground">
              We bring experience, dedication, and results to every case
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Experienced Attorneys",
                description: "Our team brings decades of combined experience across all practice areas",
                icon: Scale
              },
              {
                title: "Personalized Approach",
                description: "We take time to understand your unique situation and needs",
                icon: Heart
              },
              {
                title: "Proven Results",
                description: "Track record of successful outcomes for our clients",
                icon: Award
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-card border border-border text-center"
                >
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}