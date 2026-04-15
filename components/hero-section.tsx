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
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] relative" style={{ backgroundColor: '#E8EDF5' }}>
      {/* Left Column - Vertically Centered */}
      <div className="flex flex-col justify-center px-6 py-12 md:px-20 md:pt-8 md:pb-16 md:pl-[max(60px,calc((100vw-1400px)/2))]">
        <h1 className="font-serif tracking-tight text-navy">
          <span className="block text-[40px] md:text-[64px] font-bold leading-[1.1]">
            Professional Bookkeeping
          </span>
          <span className="block mt-3 md:mt-5 text-[24px] md:text-[32px] font-normal leading-[1.3] whitespace-nowrap">
            for Families & Small Businesses in Ontario
          </span>
        </h1>

        <p className="mt-7 text-[16px] leading-[1.6] text-navy/80 max-w-[500px]">
          CPA‑led financial management with specialized expertise in Family‑Managed Home Care (FMHC) and small business bookkeeping.
        </p>

        <div className="mt-12">
          <Button
            asChild
            className="rounded-lg px-9 py-4 text-[16px] font-bold text-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            style={{ backgroundColor: '#2B4C7E' }}
          >
            <Link href="/contact">Let&rsquo;s Talk About Your Needs</Link>
          </Button>
        </div>

        <div className="mt-9 inline-flex flex-wrap gap-3 bg-white px-6 py-4 rounded-full shadow-md max-w-fit" style={{ gap: '12px' }}>
          {trustBadges.map((badge) => {
            const Icon = badge.icon
            return (
              <span key={badge.label} className="flex items-center gap-1.5 whitespace-nowrap">
                <Icon className="size-4 flex-shrink-0" style={{ color: '#2B4C7E' }} strokeWidth={2.5} />
                <span className="text-sm font-medium text-navy/70">{badge.label}</span>
              </span>
            )
          })}
        </div>
      </div>

      {/* Right Column - Wider, Shorter Image */}
      <div className="relative h-[50vh] md:h-screen flex items-center justify-start py-8 md:py-8 px-5 md:pr-6 md:pl-3">
        <div className="relative w-full md:w-[135%] h-[70%] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="/images/hero-office.jpg"
            alt="Professional bookkeeping services in Ontario - CPA-qualified financial management for businesses and FMHC families"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 55%' }}
            priority
          />
        </div>
      </div>
    </section>
  )
}
