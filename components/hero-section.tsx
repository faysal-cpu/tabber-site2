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
      <div className="mx-auto flex max-w-[1200px] flex-col-reverse items-center gap-4 px-6 py-4 md:flex-row md:gap-8 md:py-6">
        <div className="flex-[0.6]">
          <h1 className="max-w-[540px] font-serif text-[28px] font-bold leading-[1.15] tracking-tight text-navy text-balance md:text-[42px]">
            Professional Bookkeeping for Families & Businesses in Ontario
          </h1>
          <p className="mt-3 max-w-[480px] text-[15px] leading-[1.6] text-navy/80">
            CPA-led financial management specializing in Family-Managed Home Care and small business bookkeeping.
          </p>
          <div className="mt-5">
            <Button
              asChild
              className="rounded-lg px-6 py-2.5 text-[15px] font-bold text-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              style={{ backgroundColor: '#2B4C7E' }}
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            {trustBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                <Check className="size-4 text-brand" strokeWidth={2.5} />
                <span className="text-sm font-medium text-navy/70">{badge}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="flex-[0.35]">
          <div className="overflow-hidden rounded-2xl shadow-xl max-h-[320px] md:max-h-[380px]">
            <Image
              src="/images/hero.jpg"
              alt="Professional bookkeeping services in Ontario - CPA-qualified financial management for businesses and FMHC families"
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
