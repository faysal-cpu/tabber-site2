import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Check, FileText, Calculator, ClipboardCheck, BarChart3, Star, Quote, HelpCircle, ChevronRight, Download, Clock, Phone, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "FMHC Bookkeeping | Tabber",
  description: "Specialized Family-Managed Home Care bookkeeping for Ontario families. Ontario Health atHome compliant payroll, reporting, and compliance services.",
}

const steps = [
  { num: "01", icon: Calculator, title: "Payroll Processing", tagline: "Accurate payroll processing you can rely on.", description: "Complete payroll for your care workers including T4s, RP remittances, and CRA filings. Processed accurately and on time, every pay period." },
  { num: "02", icon: FileText, title: "Monthly Reconciliation", tagline: "Clear, organized records every month.", description: "Bank and credit card reconciliation, expense tracking against your FMHC funding allocation, and clear categorization of all transactions." },
  { num: "03", icon: ClipboardCheck, title: "Compliance Reporting", tagline: "Never miss a deadline again.", description: "Monthly and quarterly compliance reports formatted to Ontario Health atHome requirements. Timely submissions that protect your funding." },
  { num: "04", icon: BarChart3, title: "Financial Statements", tagline: "Understand your funding at a glance.", description: "Clear internal financial statements showing budget vs. actuals, remaining funds, and spending trends. Always know where you stand." },
]

const complianceItems = [
  "Ontario Health atHome reporting",
  "CRA payroll remittance deadlines",
  "T4/T4A year-end filing",
  "Funding allocation tracking",
  "Expense eligibility verification",
  "Monthly reconciliation accuracy",
  "Record retention compliance",
  "Audit-ready documentation",
]

const fmhcTestimonials = [
  { headline: "Dependable Bookkeeping", quote: "I used to dread sorting through our FMHC expenses every month. Tabber took that whole task off my hands without having to pay anything out of pocket. Everything's clear and handled properly now.", name: "Sarah M.", role: "Substitute Decision-Maker" },
  { headline: "Reliable FMHC Support", quote: "It's been helpful working with someone who understands FMHC requirements. Our reporting and records stay organized, and everything gets done properly.", name: "Jennifer K.", role: "Primary Caregiver" },
]

const faqs = [
  { q: "What is Family-Managed Home Care (FMHC)?", a: "FMHC is a program through Ontario Health atHome that provides funding for families to directly manage and hire care workers for a loved one at home, rather than receiving services through an agency." },
  { q: "Will I ever have to pay out-of-pocket for FMHC bookkeeping?", a: "No. I tailor the service to fit fully within your approved FMHC funding allocation. You will never be charged beyond what your program covers." },
  { q: "What do I need to get started?", a: "Typically, we need access to your accounting software or bank statements, existing records, and your funding confirmation letter. We guide you step-by-step to make onboarding smooth and stress-free." },
  { q: "How often will I receive reports?", a: "Monthly at minimum, with quarterly summaries. We also prepare all required Ontario Health atHome compliance reports on your behalf." },
  { q: "Do you work directly with Ontario Health atHome?", a: "We collaborate with care coordinators and ensure all reporting is submitted in the format required by Ontario Health atHome. We handle the paperwork so you don't have to." },
]

const onboardingSteps = [
  { icon: Phone, title: "15-minute intro call", description: "A quick, pressure-free conversation to understand your needs." },
  { icon: FileText, title: "Review your funding & documents", description: "We assess your FMHC allocation and gather what we need." },
  { icon: Sparkles, title: "Start within 7 days", description: "We begin handling payroll and reporting right away." },
]

export default function FmhcPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero - warmer tone with supportive image */}
        <section className="py-14 md:py-20" style={{ backgroundColor: '#E8EDF5' }}>
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                  <Check className="size-4" style={{ color: '#2B4C7E' }} strokeWidth={2.5} />
                  <span className="text-sm font-semibold" style={{ color: '#2B4C7E' }}>Ontario Health atHome Specialist</span>
                </div>
                <h1 className="font-serif text-[32px] font-bold leading-[1.15] text-navy md:text-[44px]">Family-Managed Home Care Bookkeeping</h1>
                <p className="mt-5 text-[17px] leading-[1.7] text-navy/80">Let us handle the paperwork, so you can focus entirely on your loved one — with no extra cost to your family.</p>
                <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">Dedicated bookkeeping, payroll, and compliance support tailored to Ontario FMHC funding requirements.</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                  <Button asChild className="rounded-lg px-8 py-3 text-[15px] font-semibold text-white shadow-md hover:shadow-lg" style={{ backgroundColor: '#2B4C7E' }}>
                    <Link href="/contact">Book Free Consultation</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-lg border-2 px-8 py-3 text-[15px] font-semibold hover:bg-navy/5" style={{ borderColor: '#2B4C7E', color: '#2B4C7E' }}>
                    <Link href="#how-we-help">See How We Help</Link>
                  </Button>
                </div>
              </div>
              <div className="w-full max-w-[400px] flex-shrink-0 md:w-[45%]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src="/images/fmhc-hero.jpg"
                    alt="Warm, comfortable home environment"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is FMHC - improved readability */}
        <section className="bg-card py-14 md:py-20">
          <div className="mx-auto max-w-[800px] px-6">
            <h2 className="mb-8 text-center font-serif text-[26px] font-bold text-navy md:text-[32px]">What is FMHC?</h2>
            <div className="space-y-5 text-[15px] leading-[1.8] text-muted-foreground">
              <p>Family-Managed Home Care (FMHC) is a program administered by Ontario Health atHome that empowers families to directly manage the care of a loved one at home. Instead of receiving care through an agency, families receive funding to hire, schedule, and pay their own care workers.</p>
              <p>This gives families control and flexibility — but also adds administrative responsibilities like payroll, remittances, compliance reporting, and financial recordkeeping.</p>
              <p className="font-medium text-navy">{"That's where Tabber comes in. We handle the numbers so you can focus on care."}</p>
            </div>
          </div>
        </section>

        {/* How We Help - more spacing, taglines */}
        <section id="how-we-help" className="scroll-mt-20 bg-secondary py-14 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="mb-12 text-center font-serif text-[26px] font-bold text-navy md:text-[32px]">How We Help</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {steps.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.num} className="relative rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-md" style={{ borderLeftWidth: '3px', borderLeftColor: '#2B4C7E' }}>
                    <span className="absolute right-6 top-5 font-serif text-[44px] font-bold" style={{ color: 'rgba(43,76,126,0.1)' }}>{step.num}</span>
                    <div className="mb-4 flex size-12 items-center justify-center rounded-lg" style={{ backgroundColor: '#E8EDF5' }}>
                      <Icon className="size-6" style={{ color: '#2B4C7E' }} strokeWidth={1.5} />
                    </div>
                    <h3 className="mb-1 font-serif text-[18px] font-semibold text-navy">{step.title}</h3>
                    <p className="mb-3 text-sm font-medium" style={{ color: '#2B4C7E' }}>{step.tagline}</p>
                    <p className="max-w-[400px] text-sm leading-[1.7] text-muted-foreground">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Compliance & Reporting - two column bullets */}
        <section className="bg-card py-14 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
              <div className="md:flex-[0.4]">
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[30px]">Compliance & Reporting</h2>
                <p className="mt-4 max-w-[420px] text-[15px] leading-[1.7] text-muted-foreground">Stay compliant with confidence. We handle all reporting requirements so you never miss a deadline or risk your funding.</p>
              </div>
              <div className="md:flex-[0.6]">
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {complianceItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 shrink-0" style={{ color: '#2B4C7E' }} strokeWidth={2.5} />
                      <span className="text-[14px] leading-[1.6] text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Example */}
        <section className="py-12 md:py-16" style={{ backgroundColor: '#E8EDF5' }}>
          <div className="mx-auto max-w-[800px] px-6 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: '#2B4C7E' }}>Transparent Pricing</p>
            <h2 className="font-serif text-[24px] font-bold text-navy md:text-[28px]">You will never be charged out-of-pocket.</h2>
            <p className="mt-3 text-[15px] text-muted-foreground">All FMHC bookkeeping services are delivered fully within your approved funding allocation.</p>
          </div>
        </section>

        {/* From FMHC Families - enhanced testimonials */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="mb-12 text-center font-serif text-[26px] font-bold text-navy md:text-[32px]">From FMHC Families</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {fmhcTestimonials.map((t) => (
                <div key={t.name} className="relative rounded-2xl border border-border bg-card p-10 shadow-sm">
                  <Quote className="absolute right-8 top-8 size-12" style={{ color: 'rgba(43,76,126,0.1)' }} />
                  <div className="relative flex flex-col gap-4">
                    <p className="font-serif text-[15px] font-semibold" style={{ color: '#2B4C7E' }}>{t.headline}</p>
                    <div className="flex gap-1" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-5" style={{ fill: '#2B4C7E', color: '#2B4C7E' }} />
                      ))}
                    </div>
                    <blockquote className="text-[16px] italic leading-[1.75] text-navy">{`"${t.quote}"`}</blockquote>
                    <div className="mt-2 flex items-center gap-3 border-t border-border pt-4">
                      <div className="flex size-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: '#2B4C7E' }}>
                        {t.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-navy">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Happens After You Book */}
        <section className="bg-card py-14 md:py-20">
          <div className="mx-auto max-w-[900px] px-6">
            <h2 className="mb-10 text-center font-serif text-[26px] font-bold text-navy md:text-[32px]">What Happens After You Book</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {onboardingSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="relative text-center">
                    <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                      <Icon className="size-6" style={{ color: '#2B4C7E' }} strokeWidth={1.5} />
                    </div>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider" style={{ color: '#2B4C7E' }}>Step {i + 1}</span>
                    <h3 className="mb-2 font-serif text-[16px] font-semibold text-navy">{step.title}</h3>
                    <p className="text-sm leading-[1.6] text-muted-foreground">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section - with borders and icons */}
        <section className="bg-secondary py-14 md:py-20">
          <div className="mx-auto max-w-[800px] px-6">
            <h2 className="mb-10 text-center font-serif text-[26px] font-bold text-navy md:text-[32px]">FMHC Questions</h2>
            <div className="flex flex-col divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
              {faqs.map((faq) => (
                <details key={faq.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center gap-3 px-6 py-5 transition-colors hover:bg-secondary/50">
                    <HelpCircle className="size-5 shrink-0" style={{ color: '#2B4C7E' }} strokeWidth={1.5} />
                    <span className="flex-1 text-left font-serif text-[15px] font-semibold text-navy">{faq.q}</span>
                    <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="border-t border-border bg-secondary/30 px-6 py-4">
                    <p className="pl-8 text-sm leading-[1.7] text-muted-foreground">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Downloadable Checklist CTA */}
        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6 px-6 text-center md:flex-row md:text-left">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
              <Download className="size-7" style={{ color: '#2B4C7E' }} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-[20px] font-bold text-navy">Free FMHC Bookkeeping Checklist</h3>
              <p className="mt-1 text-sm text-muted-foreground">What you need to stay compliant with Ontario Health atHome. Download our quick-reference PDF.</p>
            </div>
            <Button variant="outline" className="shrink-0 gap-2 rounded-lg border-2 px-6 hover:text-white" style={{ borderColor: '#2B4C7E', color: '#2B4C7E', backgroundColor: 'transparent' }}>
              <Download className="size-4" />
              Download PDF
            </Button>
          </div>
        </section>

        {/* Final CTA - with secondary option */}
        <section className="py-14 md:py-20" style={{ backgroundColor: '#1A2A44' }}>
          <div className="mx-auto max-w-[700px] px-6 text-center">
            <h2 className="font-serif text-[28px] font-bold text-white md:text-[34px]">Let Us Handle the Bookkeeping</h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-white/70">You focus on your {"family's"} care. We focus on keeping your finances compliant and organized.</p>
            <p className="mt-2 text-sm text-white/50">Friendly, pressure-free consultations.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild className="rounded-lg bg-white px-8 py-3 text-[15px] font-semibold text-navy hover:bg-white/90 hover:shadow-lg">
                <Link href="/contact">Book Free Consultation</Link>
              </Button>
              <Button asChild className="rounded-lg border-2 border-white bg-transparent px-8 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-navy">
                <Link href="/contact?type=question">Ask a Question</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
