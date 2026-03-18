import { HeroSection } from '@/components/sections/HeroSection'
import { PracticeAreas } from '@/components/sections/PracticeAreas'
import { AboutSection } from '@/components/sections/AboutSection'
import { Attorneys } from '@/components/sections/Attorneys'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactSection } from '@/components/sections/ContactSection'
import StatsSection from '@/components/sections/StatsSection'
import { BlogSection } from '@/components/sections/BlogSection'
import WhyChooseUsSection from '@/components/sections/WhyChooseUs'

export default function Home() {
  return (
    <>
      <HeroSection />
      <PracticeAreas />
      <AboutSection />
      <StatsSection />     
      <Attorneys />
      <WhyChooseUsSection /> 
      <Testimonials />
      <BlogSection />
      <ContactSection />
      
    </>
  )
}