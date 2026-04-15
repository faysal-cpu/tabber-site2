import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const trustBadges = [
  "CPA‑Qualified",
  "FMHC Specialist",
  "Fully Insured",
  "Ontario‑Based",
]

export function HeroSection() {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] relative" style={{ backgroundColor: '#E8EDF5' }}>
      {/* Left Column - Vertically Centered */}
      <div className="flex flex-col justify-center px-6 py-12 md:px-20 md:pl-[max(60px,calc((100vw-1400px)/2))]">
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
          {trustBadges.map((badge) => (
            <span key={badge} className="flex items-center gap-1.5 whitespace-nowrap">
              <Check className="size-4 flex-shrink-0" style={{ color: '#2B4C7E' }} strokeWidth={2.5} />
              <span className="text-sm font-medium text-navy/70">{badge}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Right Column - Balanced Image with Rounded Edges */}
      <div className="relative h-[50vh] md:h-screen flex items-center justify-center py-8 md:py-16 px-5 md:pr-10 md:pl-5">
        <div className="relative w-full h-[75%] rounded-3xl overflow-hidden shadow-xl">
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
