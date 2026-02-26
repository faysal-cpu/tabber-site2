import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: '#1A2A44' }}>
      <div className="mx-auto max-w-[800px] px-6 text-center">
        <h2 className="font-serif text-[28px] font-bold text-white md:text-[36px]">
          Ready to Get Started?
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-white/80">
          Book a free 15-minute consultation to discuss your bookkeeping needs
          -- no obligation.
        </p>
        <div className="mt-10">
          <Button
            asChild
            className="rounded-lg px-10 py-4 text-[16px] font-bold text-navy shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <Link href="/contact">Schedule Your Free Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
