"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const categories = ["All", "General", "FMHC", "Pricing", "Getting Started"]

const faqs = [
  { category: "General", q: "What services does Tabber provide?", a: "Tabber provides professional bookkeeping, payroll processing, financial reporting, risk & compliance services, analytics & insights, and system setup & consulting for small businesses and Family-Managed Home Care programs." },
  { category: "General", q: "What areas do you serve?", a: "We serve clients across Ontario, Canada. All services are delivered remotely, so your location within the province doesn't limit our ability to support you." },
  { category: "General", q: "What software do you use?", a: "We primarily work with QuickBooks Online and Xero. If you use a different platform, we're happy to discuss compatibility or help you migrate." },
  { category: "General", q: "Do you work with incorporated businesses and sole proprietors?", a: "Yes. We support corporations, partnerships, and sole proprietors across Ontario, providing bookkeeping, payroll, reporting, and compliance support." },
  { category: "General", q: "How will we communicate?", a: "We work remotely and communicate through email, secure document upload, and scheduled calls. You'll always know how to reach us and what to expect." },
  { category: "General", q: "Do you replace my accountant?", a: "No. Bookkeeping and accounting work together, but serve different purposes. We handle day-to-day financial records, payroll, and reporting, while your accountant manages tax filings. We can coordinate with your accountant to make their job easier." },
  { category: "General", q: "Is my financial information secure?", a: "Yes. All client data is handled using secure, encrypted platforms that meet industry standards for privacy and data protection." },
  { category: "FMHC", q: "What is Family-Managed Home Care (FMHC)?", a: "FMHC is a program through Ontario Health atHome that provides funding for families to directly manage and hire care workers for a loved one at home, rather than receiving services through an agency." },
  { category: "FMHC", q: "Will I ever have to pay out-of-pocket for FMHC bookkeeping?", a: "No. I tailor the service to fit fully within your approved FMHC funding allocation. You will never be charged beyond what your program covers." },
  { category: "FMHC", q: "What FMHC compliance reports do you handle?", a: "We prepare all required Ontario Health atHome compliance reports, including monthly and quarterly financial summaries, payroll documentation, and year-end filings." },
  { category: "Pricing", q: "How is pricing determined?", a: "Pricing is based on the scope of work, transaction volume, and reporting needs. After a short consultation, we provide a clear, upfront quote tailored to your requirements — with no hidden fees." },
  { category: "Pricing", q: "Do you offer monthly packages?", a: "Yes, most clients work with us on a monthly retainer basis. This provides consistent service and predictable costs. We can also accommodate project-based work." },
  { category: "Getting Started", q: "How do I get started with Tabber?", a: "Book a free 15-minute consultation through our contact page. We'll discuss your needs, answer your questions, and provide a custom quote if it's a good fit." },
  { category: "Getting Started", q: "What do I need to provide to get started?", a: "Typically, we need access to your accounting software or bank statements, existing records, and for FMHC families, your funding confirmation letter. We guide you step-by-step to make onboarding smooth and stress-free." },
  { category: "Getting Started", q: "How quickly can you start?", a: "Most new clients are fully onboarded within 1-2 weeks. We focus on a smooth transition and ensure everything is set up correctly from the start." },
]

export default function FaqPage() {
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? faqs : faqs.filter((f) => f.category === active)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-[800px] px-6 text-center">
            <h1 className="font-serif text-[34px] font-bold leading-[1.2] text-navy md:text-[44px]">Frequently Asked Questions</h1>
            <p className="mt-3 text-[16px] leading-[1.65] text-muted-foreground">Find answers to common questions about our services</p>
          </div>
        </section>

        <section className="bg-secondary py-4">
          <div className="mx-auto flex max-w-[800px] flex-wrap items-center justify-center gap-2 px-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  active === cat ? "bg-navy text-white" : "bg-card text-navy hover:bg-navy/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-secondary py-6 pb-16">
          <div className="mx-auto flex max-w-[800px] flex-col gap-3 px-6">
            {filtered.map((faq) => (
              <details key={faq.q} className="group rounded-xl bg-card p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-[16px] font-semibold text-navy">
                  {faq.q}
                  <span className="ml-4 shrink-0 transition-transform duration-200 group-open:rotate-45" style={{ color: '#2B4C7E' }}>+</span>
                </summary>
                <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-[600px] px-6 text-center">
            <h2 className="font-serif text-[24px] font-bold text-navy md:text-[30px]">Still Have Questions?</h2>
            <p className="mt-3 text-[15px] text-muted-foreground">{"We're here to help. Reach out and we'll get back to you within 24 hours."}</p>
            <Button asChild className="mt-6 rounded-lg px-8 py-3 text-[15px] font-semibold text-white shadow-md hover:shadow-lg" style={{ backgroundColor: '#2B4C7E' }}>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
