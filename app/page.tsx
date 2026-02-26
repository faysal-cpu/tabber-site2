import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { WhoWeServe } from "@/components/who-we-serve"
import { ServicesSection } from "@/components/services-section"
import { WhyChoose } from "@/components/why-choose"
import { Testimonials } from "@/components/testimonials"
import { CtaSection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <WhoWeServe />
        <ServicesSection />
        <WhyChoose />
        <Testimonials />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}
