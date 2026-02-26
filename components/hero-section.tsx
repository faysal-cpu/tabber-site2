import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const trustBadges = [
  "CPA-Qualified",
  "Fully Insured",
  "FMHC Specialist",
  "Ontario-Based",
]

export function HeroSection() {
  return (
    <section className="bg-card">
      <div className="mx-auto flex max-w-[1200px] flex-col-reverse items-center gap-10 px-6 py-12 md:flex-row md:gap-14 md:py-16">
        <div className="flex-[0.6]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            Expert Support for Care Programs & Small Businesses
          </p>
          <h1 className="max-w-[540px] font-serif text-[32px] font-bold leading-[1.2] tracking-tight text-navy text-balance md:text-[48px]">
            Professional Bookkeeping for Businesses & Families
          </h1>
          <p className="mt-4 max-w-[480px] text-[16px] leading-[1.65] text-navy/80">
            CPA-qualified bookkeeping that keeps you compliant, organized, and
            free to focus on what matters most.
          </p>
          <div className="mt-8">
            <Button
              asChild
              className="rounded-lg px-8 py-3.5 text-[16px] font-bold text-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              style={{ backgroundColor: '#2B4C7E' }}
            >
              <Link href="/contact">Book Free Consultation</Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            {trustBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                <Check className="size-4 text-brand" strokeWidth={2.5} />
                <span className="text-sm font-medium text-navy/70">{badge}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="flex-[0.4]">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/hero.jpg"
              alt="Warm workspace representing Tabber bookkeeping services"
              width={560}
              height={560}
              className="size-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
