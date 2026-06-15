"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { WaveDivider } from "@/components/wave-divider"
import { WhoWeServe } from "@/components/who-we-serve"
import { ServicesSection } from "@/components/services-section"
import { WhyChoose } from "@/components/why-choose"
import { CtaSection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import { ChevronUp } from "lucide-react"

export default function HomePage() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <WaveDivider backgroundColor="#FAF9F7" />
        <WhoWeServe />
        <ServicesSection />
        <WhyChoose />
        <CtaSection />

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex size-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: '#2B4C7E' }}
            aria-label="Back to top"
          >
            <ChevronUp className="size-6 text-white" />
          </button>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
