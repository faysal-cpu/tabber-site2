"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WaveDivider } from "@/components/wave-divider"
import { Button } from "@/components/ui/button"
import { Check, FileText, Calculator, ClipboardCheck, BarChart3, HelpCircle, ChevronRight, Download, Clock, Phone, Sparkles, Mail, GraduationCap, Award, Shield, BookOpen, Send, ChevronUp, DollarSign, Users } from "lucide-react"

const steps = [
  { num: "01", icon: Calculator, title: "Payroll Processing", tagline: "Accurate payroll processing you can rely on.", description: "Payroll processing and source deduction remittances for families who directly employ their care workers, or invoice tracking and payment recording for agency or independent contractor arrangements." },
  { num: "02", icon: FileText, title: "Monthly Reconciliation", tagline: "Clear, organized records every month.", description: "Expense tracking against your FMHC funding allocation, clear categorization of all transactions, and organized records for every submission." },
  { num: "03", icon: ClipboardCheck, title: "Compliance Reporting", tagline: "Never miss a deadline.", description: "Organized records and monthly reports prepared to Ontario Health atHome requirements. Submissions completed accurately, on time, every time." },
  { num: "04", icon: BarChart3, title: "Monthly Funding Reports", tagline: "Understand your funding at a glance.", description: "Clear monthly summaries showing budget vs. actuals, remaining funds, and spending trends — always know where you stand against your approved allocation." },
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

const faqs = [
  { q: "What is Family-Managed Home Care (FMHC)?", a: "FMHC is a program through Ontario Health atHome that provides funding for families to directly manage and hire care workers for a loved one at home, rather than receiving services through an agency." },
  { q: "Will I ever have to pay out-of-pocket for FMHC bookkeeping?", a: "No. We tailor the service to fit fully within your approved FMHC funding allocation. You will never be charged beyond what your program covers." },
  { q: "What do I need to get started?", a: "Getting started is simple. Share your Ontario Health atHome Sync folder with your bookkeeper, send us your funding confirmation and any related FMHC documents, and forward your invoices and monthly bank statements as they become available — we'll handle the rest." },
  { q: "How often will I receive reports?", a: "Monthly. We prepare your complete report package ahead of the Ontario Health atHome submission deadline each month. We also prepare all required compliance documents on your behalf." },
  { q: "Will my bookkeeper be accepted by Ontario Health atHome?", a: "Yes. Tabber meets all Schedule O qualification requirements under the FMHC program agreement. We provide the required credential letter and documentation directly to Ontario Health atHome as part of onboarding." },
  { q: "Do I need to handle payroll myself?", a: "No. For families who directly employ care workers, we handle payroll calculations, source deduction remittances, and year-end T4 preparation. For independent contractor arrangements, we track invoices and payments. You make the payments — we handle the recordkeeping and reporting." },
  { q: "Do you work directly with Ontario Health atHome?", a: "We complete your monthly reporting directly inside your Ontario Health atHome Sync folder and upload all supporting documents ahead of the deadline. Your dedicated bookkeeper is also available to attend your meetings with Ontario Health atHome — including the Financial Orientation meeting — so you're never navigating those conversations alone. The only things you need to send us each month are your invoices and any eligible expense receipts, along with your bank statement PDF — we handle everything else." },
]

const onboardingSteps = [
  { icon: Mail, title: "We review your inquiry", description: "We'll respond within 1 business day to learn more about your setup and answer any questions." },
  { icon: FileText, title: "Review your funding & documents", description: "We review your funding agreement and any relevant documents, and confirm your onboarding steps." },
  { icon: Sparkles, title: "Start within 7 days", description: "You're in good hands! We take over your bookkeeping and reporting so you can focus on care." },
]

export default function FmhcPage() {
  const [submitted, setSubmitted] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      })
      setSubmitted(true)
    } catch (error) {
      console.error("Form submission error:", error)
      alert("There was an error submitting the form. Please try again.")
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Tabber - FMHC Bookkeeper Ontario",
    "description": "Expert FMHC bookkeeper for Ontario families. Specialized Family-Managed Home Care bookkeeping services including CPA-led FMHC bookkeeping, payroll processing, and Ontario Health atHome compliance reporting.",
    "areaServed": {
      "@type": "State",
      "name": "Ontario"
    },
    "serviceType": ["FMHC Bookkeeping", "Family-Managed Home Care Bookkeeping", "Payroll Services", "Compliance Reporting"],
    "provider": {
      "@type": "AccountingService",
      "name": "Tabber",
      "url": "https://tabber.ca"
    },
    "telephone": "+1-647-872-0394",
    "email": "hello@tabber.ca",
    "priceRange": "Covered by FMHC Funding"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero - warmer tone with supportive image */}
        <section className="py-10 md:py-12" style={{ backgroundColor: '#E8EDF5' }}>
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16 md:items-stretch">
              <div className="flex-1 text-center md:text-left flex flex-col justify-between">
                <div>
                  <div className="my-3">
                    {/* Desktop: One line */}
                    <div className="hidden md:flex flex-nowrap justify-start gap-2">
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap bg-white rounded-full px-3 py-2.5 shadow-md">
                        <GraduationCap className="size-4 flex-shrink-0" style={{ color: '#2B4C7E' }} strokeWidth={2.5} />
                        <span className="text-sm font-medium" style={{ color: '#2B4C7E' }}>CPA Certified</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap bg-white rounded-full px-3 py-2.5 shadow-md">
                        <Award className="size-4 flex-shrink-0" style={{ color: '#2B4C7E' }} strokeWidth={2.5} />
                        <span className="text-sm font-medium" style={{ color: '#2B4C7E' }}>FMHC Specialist</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap bg-white rounded-full px-3 py-2.5 shadow-md">
                        <Shield className="size-4 flex-shrink-0" style={{ color: '#2B4C7E' }} strokeWidth={2.5} />
                        <span className="text-sm font-medium" style={{ color: '#2B4C7E' }}>Fully Insured</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap bg-white rounded-full px-3 py-2.5 shadow-md">
                        <BookOpen className="size-4 flex-shrink-0" style={{ color: '#2B4C7E' }} strokeWidth={2.5} />
                        <span className="text-sm font-medium" style={{ color: '#2B4C7E' }}>NPI Member</span>
                      </span>
                    </div>
                  </div>
                  <h1 className="font-serif text-[30px] font-bold leading-[1.15] text-navy md:text-[46px]">Trusted Family-Managed Home Care Bookkeeping</h1>
                  <div className="mt-4">
                    <p className="text-[16px] md:text-[18px] font-medium leading-relaxed" style={{ color: '#2B4C7E' }}>Fully covered by program funding,</p>
                    <p className="text-[16px] md:text-[18px] font-medium leading-relaxed" style={{ color: '#2B4C7E' }}>at no cost to families.</p>
                  </div>
                  <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground">Your dedicated FMHC bookkeeper handles your payroll, monthly reporting, and funding administration — so instead of managing paperwork, you can focus on the people who need you most.</p>
                </div>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                  <Button asChild className="rounded-lg px-8 py-3 text-[15px] font-semibold text-white shadow-md hover:shadow-lg" style={{ backgroundColor: '#2B4C7E' }}>
                    <Link href="#contact-form">Get Started — It's Free</Link>
                  </Button>
                </div>
                {/* Mobile pills - after CTA */}
                <div className="mt-6 flex md:hidden flex-wrap justify-center gap-1">
                  <span className="inline-flex items-center gap-0.5 whitespace-nowrap bg-white rounded-full px-1.5 py-0.5 shadow-md">
                    <GraduationCap className="size-2.5 flex-shrink-0" style={{ color: '#2B4C7E' }} strokeWidth={2.5} />
                    <span className="text-[10px] font-medium" style={{ color: '#2B4C7E' }}>CPA Certified</span>
                  </span>
                  <span className="inline-flex items-center gap-0.5 whitespace-nowrap bg-white rounded-full px-1.5 py-0.5 shadow-md">
                    <Award className="size-2.5 flex-shrink-0" style={{ color: '#2B4C7E' }} strokeWidth={2.5} />
                    <span className="text-[10px] font-medium" style={{ color: '#2B4C7E' }}>FMHC Specialist</span>
                  </span>
                  <span className="inline-flex items-center gap-0.5 whitespace-nowrap bg-white rounded-full px-1.5 py-0.5 shadow-md">
                    <Shield className="size-2.5 flex-shrink-0" style={{ color: '#2B4C7E' }} strokeWidth={2.5} />
                    <span className="text-[10px] font-medium" style={{ color: '#2B4C7E' }}>Fully Insured</span>
                  </span>
                  <span className="inline-flex items-center gap-0.5 whitespace-nowrap bg-white rounded-full px-1.5 py-0.5 shadow-md">
                    <BookOpen className="size-2.5 flex-shrink-0" style={{ color: '#2B4C7E' }} strokeWidth={2.5} />
                    <span className="text-[10px] font-medium" style={{ color: '#2B4C7E' }}>NPI Member</span>
                  </span>
                </div>
              </div>
              <div className="w-full max-w-[380px] flex-shrink-0 md:w-[40%] md:max-w-none">
                <div className="relative aspect-[3/2] md:aspect-auto md:h-full overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src="/images/fmhc-hero-woman.jpg"
                    alt="FMHC bookkeeping services for Ontario families - Family-Managed Home Care financial management"
                    fill
                    className="object-cover"
                    style={{ objectPosition: '70% center', transform: 'scale(1.15)' }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <WaveDivider backgroundColor="#F9FAFB" />

        {/* What is FMHC - SHORTENED */}
        <section className="bg-gray-50 py-10 md:py-12 border-t border-border/30">
          <div className="mx-auto max-w-[1000px] px-6">
            <h2 className="mb-6 text-center font-serif text-[26px] font-bold text-navy md:text-[32px]">What is FMHC?</h2>
            <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
              <p>Family-Managed Home Care (FMHC) is a program through Ontario Health atHome that empowers families to receive funding and hire their own care workers, rather than receiving care through an agency. This gives families control and flexibility — but also creates administrative responsibilities like payroll, monthly reporting & tracking, and financial recordkeeping.</p>
              <p className="font-medium text-navy">{"That's where we come in. Our CPA-qualified bookkeeper specializes in Family-Managed Home Care and handles all the numbers so you can focus on care."}</p>
            </div>
          </div>
        </section>

        {/* Our Services - Combined Section */}
        <section id="our-services" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-8 text-center">
              <h2 className="mb-3 font-serif text-[26px] font-bold text-navy md:text-[32px]">Our Full-Service FMHC Bookkeeping</h2>
              <p className="text-[15px] leading-[1.7] text-muted-foreground">We handle everything end-to-end — so you never miss a deadline or risk your funding.</p>
            </div>

            {/* Service Cards */}
            <div className="mb-10 grid gap-6 md:grid-cols-2">
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

            {/* What's Covered */}
            <div className="mx-auto max-w-[900px] rounded-xl border-2 border-[#2B4C7E]/20 bg-card p-8 shadow-sm">
              <h3 className="mb-5 text-center font-serif text-[18px] font-semibold text-navy">What's Covered</h3>
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
        </section>

        {/* Credentials & Pricing - Consistent Cards */}
        <section className="bg-gray-50 py-8 md:py-10 border-t border-border/30">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="flex flex-col gap-6">
              {/* Fully Qualified */}
              <div className="flex items-center gap-6 rounded-xl border-2 border-[#2B4C7E] bg-gradient-to-br from-[#E8EDF5] to-white p-6 md:p-8 shadow-md">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#2B4C7E]">
                  <Shield className="size-6 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="mb-2 font-serif text-[20px] font-bold text-navy md:text-[22px]">Fully Qualified for Ontario Health atHome</h2>
                  <p className="text-[14px] leading-[1.7] text-muted-foreground">Your dedicated Bookkeeper meets all Schedule O qualification requirements under the FMHC program agreement, including a CPA designation in good standing, professional liability insurance, National Payroll Institute membership, and a registered business number. We provide all the required documentation for submission to Ontario Health atHome.</p>
                </div>
              </div>

              {/* Transparent Pricing */}
              <div className="flex items-center gap-6 rounded-xl border-2 border-[#2B4C7E] bg-gradient-to-br from-[#E8EDF5] to-white p-6 md:p-8 shadow-md">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#2B4C7E]">
                  <DollarSign className="size-6 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="mb-2 font-serif text-[20px] font-bold text-navy md:text-[22px]">You will never be charged out-of-pocket</h2>
                  <p className="text-[14px] leading-[1.7] text-muted-foreground">All FMHC bookkeeping services are delivered fully within your approved funding allocation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Happens After You Reach Out */}
        <section className="py-12 md:py-16 border-t border-border/30" style={{ backgroundColor: '#E8EDF5' }}>
          <div className="mx-auto max-w-[1100px] px-6">
            <h2 className="mb-10 text-center font-serif text-[26px] font-bold text-navy md:text-[32px]">What Happens After You Reach Out</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {onboardingSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="relative rounded-xl border-2 border-[#2B4C7E]/20 bg-gradient-to-br from-white to-[#E8EDF5]/30 p-6 text-center shadow-md transition-all hover:shadow-xl hover:border-[#2B4C7E]/40">
                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[#2B4C7E] shadow-md">
                      <Icon className="size-7 text-white" strokeWidth={2} />
                    </div>
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider" style={{ color: '#2B4C7E' }}>Step {i + 1}</span>
                    <h3 className="mb-3 font-serif text-[17px] font-bold text-navy">{step.title}</h3>
                    <p className="text-[14px] leading-[1.7] text-muted-foreground">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Resources & Guides */}
        <section className="bg-gray-50 py-8 md:py-10 border-t border-border/30">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="mb-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <BookOpen className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Resources & Guides</h2>
              </div>
              <p className="text-sm text-muted-foreground">We've put together resources and guides to help you navigate the FMHC program with confidence.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {/* Complete FMHC Guide */}
              <Link
                href="/resources/fmhc"
                className="flex flex-col gap-3 rounded-xl border-2 border-border bg-white p-5 transition-all duration-300 hover:border-[#2B4C7E] hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                  <BookOpen className="size-5" style={{ color: '#2B4C7E' }} />
                </div>
                <div>
                  <h3 className="font-serif text-[15px] font-semibold text-navy mb-1">Complete FMHC Guide</h3>
                  <p className="text-xs text-muted-foreground">Eligibility, application, and compliance requirements</p>
                </div>
              </Link>

              {/* Care Arrangement Guide */}
              <Link
                href="/resources/care-arrangement-guide"
                className="flex flex-col gap-3 rounded-xl border-2 border-border bg-white p-5 transition-all duration-300 hover:border-[#2B4C7E] hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                  <Users className="size-5" style={{ color: '#2B4C7E' }} />
                </div>
                <div>
                  <h3 className="font-serif text-[15px] font-semibold text-navy mb-1">Choosing Your Care Arrangement</h3>
                  <p className="text-xs text-muted-foreground">Compare agency, contractor, and direct hire options</p>
                </div>
              </Link>

              {/* Direct Hire Calculator */}
              <Link
                href="/resources/direct-hire-calculator"
                className="flex flex-col gap-3 rounded-xl border-2 border-border bg-white p-5 transition-all duration-300 hover:border-[#2B4C7E] hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                  <Calculator className="size-5" style={{ color: '#2B4C7E' }} />
                </div>
                <div>
                  <h3 className="font-serif text-[15px] font-semibold text-navy mb-1">Direct Hire Cost Calculator</h3>
                  <p className="text-xs text-muted-foreground">Calculate true employer costs for direct hire</p>
                </div>
              </Link>

              {/* Checklists */}
              <Link
                href="/resources#checklists"
                className="flex flex-col gap-3 rounded-xl border-2 border-border bg-white p-5 transition-all duration-300 hover:border-[#2B4C7E] hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                  <Download className="size-5" style={{ color: '#2B4C7E' }} />
                </div>
                <div>
                  <h3 className="font-serif text-[15px] font-semibold text-navy mb-1">Downloadable Checklists</h3>
                  <p className="text-xs text-muted-foreground">Stay organized with compliance checklists</p>
                </div>
              </Link>
            </div>

            {/* See All Resources Button */}
            <div className="mt-6 text-center">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[15px] font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: '#2B4C7E' }}
              >
                <BookOpen className="size-4" />
                See All Resources & Guides
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section - with borders and icons */}
        <section className="bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[800px] px-6">
            <h2 className="mb-8 text-center font-serif text-[26px] font-bold text-navy md:text-[32px]">FMHC Questions</h2>
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

        {/* Contact Form Section */}
        <section id="contact-form" className="scroll-mt-20 py-10 md:py-14" style={{ backgroundColor: '#E8EDF5' }}>
          <div className="mx-auto max-w-[700px] px-6">
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-xl bg-card p-12 text-center shadow-sm">
                <div className="mb-3 flex size-14 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                  <Send className="size-6" style={{ color: '#2B4C7E' }} />
                </div>
                <h2 className="font-serif text-xl font-bold text-navy">Message Sent</h2>
                <p className="mt-2 max-w-[380px] text-sm text-muted-foreground">Thank you for reaching out. We will get back to you within 24 hours.</p>
                <Button onClick={() => setSubmitted(false)} className="mt-5 rounded-lg text-white hover:bg-navy-light" style={{ backgroundColor: '#2B4C7E' }}>Send Another Message</Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="font-serif text-[28px] font-bold text-navy md:text-[34px]">Get in Touch — No Pressure</h2>
                  <p className="mt-3 text-[15px] leading-[1.6] text-navy/70">Fill in your details and we'll follow up within 1 business day to walk through your setup and next steps.</p>
                </div>

                <form
                  name="fmhc-contact"
                  onSubmit={handleSubmit}
                  className="rounded-xl border-2 border-[#2B4C7E] bg-white p-6 md:p-8 shadow-lg"
                >
              <input type="hidden" name="form-name" value="fmhc-contact" />
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">Phone Number <span className="text-gray-400 text-xs font-normal">(optional)</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="care-type" className="block text-sm font-semibold text-navy mb-2">How are you receiving care?</label>
                  <select
                    id="care-type"
                    name="care-type"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20"
                  >
                    <option value="">Select an option</option>
                    <option value="agency">Through a registered agency</option>
                    <option value="independent-contractor">Through independent contracting</option>
                    <option value="direct">Directly hiring</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-navy mb-2">Anything you'd like us to know? <span className="text-gray-400 text-xs font-normal">(optional)</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20 resize-none"
                    placeholder="Tell us a bit about your situation..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg px-8 py-3.5 text-[15px] font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200"
                  style={{ backgroundColor: '#2B4C7E' }}
                >
                  Send Message
                </button>

                <p className="text-center text-xs text-muted-foreground mt-3">
                  We'll respond within 1 business day. No commitment required.
                </p>
              </div>
            </form>
              </>
            )}
          </div>
        </section>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex size-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: '#2B4C7E' }}
            aria-label="Back to top"
          >
            <ChevronUp className="size-6 text-white" />
          </button>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
