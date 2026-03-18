"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Linkedin, Mail } from "lucide-react"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import siteData from "@/data/siteData.json"

export default function AttorneysPage() {
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
              Our Attorneys
            </h1>
            <p className="text-xl text-muted-foreground">
              Meet our team of experienced legal professionals dedicated to your success
            </p>
          </motion.div>
        </div>
      </section>

      {/* Attorneys Grid */}
      <SectionWrapper className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {siteData.attorneys.map((attorney, index) => (
              <motion.div
                key={attorney.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="relative rounded-2xl bg-card border border-border overflow-hidden">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={attorney.image}
                      alt={attorney.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                      <Link
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary/80 transition-colors"
                      >
                        <Linkedin className="h-5 w-5 text-white" />
                      </Link>
                      <Link
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary/80 transition-colors"
                      >
                        <Mail className="h-5 w-5 text-white" />
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {attorney.name}
                    </h3>
                    <p className="text-primary font-semibold mb-2">{attorney.title}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {attorney.specialization}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {attorney.experience}+ years experience
                    </p>
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                      {attorney.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Join Our Team */}
      <SectionWrapper className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join Our Team
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're always looking for talented attorneys to join our growing practice
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact Us About Opportunities
            </Link>
          </motion.div>
        </div>
      </SectionWrapper>
    </main>
  )
}