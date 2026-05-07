import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, Home, Shield, MapPin } from "lucide-react"

const trustBadges = [
  { icon: Award, label: "CPA‑Qualified" },
  { icon: Home, label: "FMHC Specialist" },
  { icon: Shield, label: "Fully Insured" },
  { icon: MapPin, label: "Ontario‑Based" },
]

export function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[55fr_45fr] relative" style={{ backgroundColor: '#E8EDF5' }}>
      {/* Left Column - Text constrained to 600px */}
      <div className="flex flex-col justify-center px-6 pt-10 pb-6 md:px-16 md:py-10 md:pl-[max(60px,calc((100vw-1400px)/2))]">
        <div className="max-w-[600px]">
          <h1 className="font-serif tracking-tight text-navy">
            <span className="block text-[40px] md:text-[64px] font-bold leading-[1.1]">
              Professional Bookkeeping
            </span>
            <span className="block mt-3 md:mt-5 text-[24px] md:text-[32px] font-normal leading-[1.3] md:whitespace-nowrap">
              for Families & Small Businesses in Ontario
            </span>
          </h1>

          <p className="mt-6 md:mt-7 text-[16px] leading-[1.6] text-navy/80 max-w-[500px] md:max-w-[580px]">
            CPA‑led financial management with specialized expertise in Family‑Managed Home Care (FMHC) and small business bookkeeping.
          </p>

          <div className="mt-6 md:mt-8">
            <Button
              asChild
              className="rounded-lg px-9 py-4 text-[16px] font-bold text-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              style={{ backgroundColor: '#2B4C7E' }}
            >
              <Link href="/contact">Let&rsquo;s Talk About Your Needs</Link>
            </Button>
          </div>

          <div className="mt-6 md:mt-8">
            {/* Mobile & Desktop: One line */}
            <div className="flex md:hidden flex-nowrap justify-start gap-1 overflow-x-auto">
              {trustBadges.map((badge) => {
                const Icon = badge.icon
                return (
                  <span key={badge.label} className="inline-flex items-center gap-1 whitespace-nowrap bg-white rounded-full px-2 py-1.5 shadow-md">
                    <Icon className="size-3.5 flex-shrink-0" style={{ color: '#2B4C7E' }} strokeWidth={2.5} />
                    <span className="text-xs font-medium text-navy/70">{badge.label}</span>
                  </span>
                )
              })}
            </div>
            {/* Desktop: One line */}
            <div className="hidden md:flex flex-nowrap justify-start gap-2">
              {trustBadges.map((badge) => {
                const Icon = badge.icon
                return (
                  <span key={badge.label} className="inline-flex items-center gap-1.5 whitespace-nowrap bg-white rounded-full px-3 py-2.5 shadow-md">
                    <Icon className="size-4 flex-shrink-0" style={{ color: '#2B4C7E' }} strokeWidth={2.5} />
                    <span className="text-sm font-medium text-navy/70">{badge.label}</span>
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Substantial Image with Aspect Ratio Control */}
      <div className="relative flex items-center justify-center pt-0 pb-10 md:py-10 px-6 md:pr-[max(60px,calc((100vw-1400px)/2))] md:pl-12">
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="/images/hero-office.jpg"
            alt="Professional bookkeeping services in Ontario - CPA-qualified financial management for businesses and FMHC families"
            fill
            className="object-cover"
            style={{ objectPosition: '66% 25%', transform: 'scale(1.1)', transformOrigin: '66% 25%' }}
            priority
          />
        </div>
      </div>
    </section>
  )
}
