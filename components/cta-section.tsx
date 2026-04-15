import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-10 md:py-14" style={{ backgroundColor: '#E8EDF5' }}>
      <div className="mx-auto max-w-[800px] px-6 text-center">
        <h2 className="font-serif text-[28px] font-bold text-navy md:text-[36px]">
          Ready to Get Started?
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-navy/80">
          Tell us about your bookkeeping needs! We're here to answer questions and help you explore your options — no obligation.
        </p>
        <div className="mt-10">
          <Button
            asChild
            className="rounded-lg px-10 py-4 text-[16px] font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            style={{ backgroundColor: '#2B4C7E' }}
          >
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
