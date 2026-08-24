"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WaveDivider } from "@/components/wave-divider"
import { Button } from "@/components/ui/button"
import {
  Calculator,
  BookOpen,
  HelpCircle,
  Mail,
  Send,
  ChevronUp,
} from "lucide-react"
import { DirectHireCalculator } from "@/components/direct-hire-calculator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Does this apply to contractors or agency workers?",
    answer: "No — this calculator is for direct-hire (employee) arrangements only. With independent contractors, you pay the contractor's invoice and they handle their own taxes, so there are no employer payroll costs to calculate. With agencies, the agency handles everything internally and bills you a single hourly rate; no per-employee math is needed on your side.",
  },
  {
    question: "What if my worker has multiple employers?",
    answer: "CPP and EI are calculated by each employer independently, so the math in the calculator still applies to your share. If you're concerned about combined contributions exceeding annual maximums, that gets reconciled when the worker files their personal tax return — it doesn't affect your monthly cost.",
  },
  {
    question: "How accurate are the CPP and EI rates?",
    answer: "The rates in the calculator are the current 2026 rates (CPP 5.95%, EI employer 2.28%). These are set annually by CRA and Service Canada. The calculator should be reviewed and updated each January when new rates take effect.",
  },
  {
    question: "What about CPP2 (the additional CPP contribution)?",
    answer: "CPP2 only applies to earnings above the Year's Maximum Pensionable Earnings (~$71,300 in 2026). Most FMHC direct-hire workers earn well below that threshold, so CPP2 doesn't factor into the calculation. If you have a high-earning worker who might cross the YMPE, the calculator will need adjustment — reach out and we'll help with the math.",
  },
  {
    question: "Does the calculator handle stat holiday pay?",
    answer: "Not directly. Stat holiday pay is calculated separately under Ontario's Employment Standards Act and depends on the employee's earnings and work schedule. Because entitlement varies, the calculator does not estimate these costs automatically. Families who want a more conservative budget may wish to build a small buffer into their wage planning to account for statutory holiday obligations and other employment-related costs not included in the estimate.",
  },
]

export default function DirectHireCalculatorPage() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      })
      setFormSubmitted(true)

      // Track form submission in Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'Direct Hire Calculator',
          event_label: 'Contact Form Submission',
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      alert("There was an error submitting the form. Please try again.")
    }
  }

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": "https://tabber.ca/resources/direct-hire-calculator#article",
                "headline": "FMHC Direct Hire Cost Calculator",
                "description": "Calculate the true hourly cost of hiring a direct employee under Ontario's Family-Managed Home Care program — wages plus employer CPP, EI, and WSIB costs.",
                "image": "https://tabber.ca/images/direct-hire-calculator.png",
                "datePublished": "2026-06-10",
                "dateModified": "2026-06-10",
                "author": {
                  "@type": "Person",
                  "name": "Faysal El Masri",
                  "jobTitle": "CPA",
                  "url": "https://tabber.ca/about"
                },
                "publisher": {
                  "@type": "Organization",
                  "@id": "https://tabber.ca/#organization",
                  "name": "Tabber",
                  "url": "https://tabber.ca",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://tabber.ca/tabber-logo-full.svg"
                  }
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://tabber.ca/resources/direct-hire-calculator"
                },
                "keywords": "FMHC calculator, direct hire calculator, FMHC cost calculator, caregiver wage calculator, Schedule B calculator, FMHC payroll calculator"
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://tabber.ca/resources/direct-hire-calculator#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://tabber.ca"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Resources",
                    "item": "https://tabber.ca/resources"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Direct Hire Calculator",
                    "item": "https://tabber.ca/resources/direct-hire-calculator"
                  }
                ]
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://tabber.ca/resources/direct-hire-calculator#calculator",
                "name": "FMHC Direct Hire Cost Calculator",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "CAD"
                },
                "description": "Free calculator to determine the true hourly cost of hiring a direct employee under Family-Managed Home Care, including wages, CPP, EI, and WSIB costs."
              },
              {
                "@type": "Organization",
                "@id": "https://tabber.ca/#organization",
                "name": "Tabber",
                "url": "https://tabber.ca",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://tabber.ca/tabber-logo-full.svg"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+1-647-872-0394",
                  "contactType": "customer service",
                  "email": "hello@tabber.ca"
                }
              }
            ]
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative h-[450px] md:h-[500px] flex items-center justify-center">
            <Image
              src="/images/Designer (7).png"
              alt="FMHC Direct Hire Cost Calculator"
              fill
              className="object-cover"
              style={{ objectPosition: "center" }}
              priority
            />
            <div className="absolute inset-0 bg-[#2B4C7E]/15" />

            {/* Bottom fade to blend with next section */}
            <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-b from-transparent to-[#E8EDF5]" />

            <div className="relative z-10 max-w-[900px] w-full mx-6 p-8 md:p-12 rounded-2xl shadow-2xl text-center" style={{ backgroundColor: "rgba(249, 250, 251, 0.95)", backdropFilter: "blur(12px)" }}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-md border-2" style={{ backgroundColor: "#F3F4F6", borderColor: "#2B4C7E", color: "#2B4C7E" }}>
                <Calculator className="size-4" />
                <span className="text-sm font-semibold">Calculator</span>
              </div>
              <h1 className="font-serif text-[28px] font-bold leading-[1.2] text-navy md:text-[38px] mb-4">
                FMHC Direct Hire Cost Calculator
              </h1>
              <p className="text-[16px] md:text-[17px] font-medium leading-[1.6] mb-5" style={{ color: "#2B4C7E" }}>
                Not sure what wage you can afford to pay your employee?
              </p>
              <p className="text-[15px] md:text-[16px] font-medium leading-[1.6] mb-5" style={{ color: "#2B4C7E" }}>
                This calculator shows your true hourly cost — including employer payroll costs — so you know if a wage fits within your FMHC funding.
              </p>
              <div className="flex items-center gap-2 text-[11px] justify-center pt-4 border-t border-gray-200 text-navy/70">
                <div className="relative size-7 overflow-hidden rounded-full flex-shrink-0">
                  <Image
                    src="/images/profile-faysal.jpg"
                    alt="Faysal El Masri"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "58% 25%", transform: "scale(1.70)" }}
                  />
                </div>
                <span>Built by Faysal El Masri, CPA | Updated June 2026</span>
              </div>
            </div>
          </section>

          {/* Calculator Overview */}
          <section style={{ backgroundColor: "#E8EDF5" }} className="py-10 md:py-14">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: "#2B4C7E" }}>
                  <BookOpen className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Calculator Overview</h2>
              </div>
              <p className="text-[15px] leading-[1.8] text-muted-foreground">
                If you're hiring a care worker as a direct employee under Family-Managed Home Care, the wage you advertise isn't the whole story. As the employer, you also cover the employer side of Canada Pension Plan, Employment Insurance, and — if hours exceed 24 per week — WSIB premiums. All of those costs add up on top of the wage, and the total has to fit under the all-in hourly rate approved in your FMHC Schedule B — otherwise you will have to pay out of pocket.
              </p>
              <p className="mt-4 text-[15px] leading-[1.8] text-muted-foreground">
                This calculator does the math. Enter the hours, the wage you're considering, and a couple of details about the arrangement, and it shows you the true per-hour cost — and whether your offer fits within your approved rate. It also tells you the maximum sustainable wage if you want to back into it from the cap.
              </p>
              <p className="mt-4 text-[15px] leading-[1.8] font-semibold text-muted-foreground">
                Most families underestimate the employer-side costs of direct hire. This tool helps you see whether a proposed wage actually fits within your FMHC funding before you commit.
              </p>
            </div>
          </section>

          <WaveDivider fillColor="#E8EDF5" backgroundColor="#F9FAFB" />

          {/* Calculator Section */}
          <section className="bg-gray-50 py-10 md:py-14">
            <div className="mx-auto max-w-[1200px] px-6">
              <div className="mb-10 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: "#2B4C7E" }}>
                  <Calculator className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">The Calculator</h2>
              </div>
              <DirectHireCalculator />

              {/* Disclaimer */}
              <div className="mt-8 rounded-xl bg-amber-50 border-2 border-amber-200 p-6">
                <p className="text-sm leading-relaxed text-amber-900">
                  <strong>Important:</strong> This calculator estimates regular payroll costs only. Actual employment costs may be higher due to statutory holiday pay, overtime, mileage reimbursements, training time, WSIB rate changes, or other employer obligations.
                </p>
              </div>
            </div>
          </section>

          {/* How the Calculation Works */}
          <section className="bg-gray-50 py-10 md:py-14 border-t border-border/30">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: "#2B4C7E" }}>
                  <BookOpen className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">How the Calculation Works</h2>
              </div>

              <div className="space-y-6 text-[15px] leading-[1.8] text-muted-foreground">
                <div>
                  <h3 className="mb-3 font-serif text-[18px] font-bold text-navy">
                    What goes into the "true cost" of an employee
                  </h3>
                  <p>
                    When you hire someone as a direct employee under FMHC, your monthly cost isn't just their wage. As the employer, you also pay:
                  </p>
                  <ul className="mt-3 ml-6 space-y-2 list-disc">
                    <li>
                      <strong>Canada Pension Plan (CPP) — employer contribution</strong><br />
                      Both employee and employer contribute 5.95% of pensionable earnings. Pensionable earnings are calculated as gross wages minus the basic exemption ($291.67 per month).
                    </li>
                    <li>
                      <strong>Employment Insurance (EI) — employer portion</strong><br />
                      Employee EI is 1.63% of gross wages. The employer pays 1.4× that amount, or roughly 2.28%.
                    </li>
                    <li>
                      <strong>WSIB premiums — if applicable</strong><br />
                      In Ontario, in-home domestic workers are exempt if they work under 24 hours per week. Above that threshold, WSIB premiums apply, typically around 1.05% of gross wages (varies by classification).
                    </li>
                    <li>
                      <strong>Vacation pay</strong><br />
                      Ontario requires at least 4% vacation pay. This can either be included in the hourly rate or paid out separately.
                    </li>
                  </ul>
                  <p className="mt-3">
                    The "all-in rate" in your FMHC Schedule B is meant to cover all of these costs combined — wages plus employer payroll costs — divided by the service hours delivered.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 font-serif text-[18px] font-bold text-navy">
                    Understanding Schedule B constraints
                  </h3>
                  <p>
                    Your Schedule B sets <strong>two fixed ceilings</strong>: the maximum hourly rate AND the approved number of service hours per month. You cannot exceed the approved hours even if your rate is lower, and you cannot pay a higher rate even if you use fewer hours. There is no flexibility to trade off between rate and units.
                  </p>
                  <p className="mt-3">
                    If you offer a wage that pushes the per-hour cost over the Schedule B max, your monthly costs exceed your approved funding — the shortfall comes out of pocket. The calculator above lets you test different wages against your specific Schedule B before you make an offer.
                  </p>
                  <p className="mt-3">
                    It's also useful when a worker counters your initial offer — you can immediately see whether a higher wage still fits, or whether you need to negotiate other terms.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-gray-50 py-10 md:py-14 border-t border-border/30">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-10 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: "#2B4C7E" }}>
                  <HelpCircle className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Frequently Asked Questions</h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="rounded-xl border-none bg-white px-8 py-2 shadow-lg"
                  >
                    <AccordionTrigger className="text-left font-serif text-[17px] font-semibold text-navy hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[16px] leading-[1.7] text-navy/85 pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* CTA Section with Contact Form */}
          <section className="bg-gray-50 py-10 md:py-14 border-t border-border/30">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: "#2B4C7E" }}>
                    <Mail className="size-5 text-white" />
                  </div>
                  <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Need help selecting the right wage?</h2>
                </div>
                <p className="text-[15px] leading-[1.8] text-muted-foreground">
                  Every FMHC setup is different. If you'd like a quick review of your calculation, we're here to help — no commitment required.
                </p>
              </div>

              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center rounded-xl bg-card p-12 text-center shadow-sm border border-border">
                  <div className="mb-3 flex size-14 items-center justify-center rounded-full" style={{ backgroundColor: "#E8EDF5" }}>
                    <Send className="size-6" style={{ color: "#2B4C7E" }} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy">Message Sent</h3>
                  <p className="mt-2 max-w-[380px] text-sm text-muted-foreground">
                    Thank you for reaching out. We will get back to you within one business day.
                  </p>
                  <Button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-5 rounded-lg text-white"
                    style={{ backgroundColor: "#2B4C7E" }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  name="direct-hire-calc"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleFormSubmit}
                  className="rounded-xl border-2 border-[#2B4C7E] bg-white p-6 md:p-8 shadow-xl"
                >
                  <input type="hidden" name="form-name" value="direct-hire-calc" />
                  <p hidden>
                    <label>
                      Don't fill this out: <input name="bot-field" />
                    </label>
                  </p>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
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
                      <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
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
                      <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">
                        Phone Number <span className="text-gray-400 text-xs font-normal">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-navy mb-2">
                        Anything you'd like us to know? <span className="text-gray-400 text-xs font-normal">(optional)</span>
                      </label>
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
                      style={{ backgroundColor: "#2B4C7E" }}
                    >
                      Send Message
                    </button>

                    <p className="text-center text-xs text-muted-foreground mt-3">
                      We'll respond within 1 business day. No commitment required.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </section>

          {/* Footer Disclaimer */}
          <section className="bg-gray-50 py-8 border-t border-border/30">
            <div className="mx-auto max-w-[900px] px-6">
              <p className="text-center text-xs leading-[1.6] text-muted-foreground italic">
                Tabber is an independent bookkeeping provider and is not affiliated with Ontario Health atHome. Program requirements can change and may vary by agreement. This calculator is for informational planning purposes only and is not legal, tax, payroll, or eligibility advice. CPP, EI, and WSIB rates are set annually and should be verified against current CRA, Service Canada, and WSIB publications before making employment decisions. For specific guidance on your situation, consult an appropriate qualified professional.
              </p>
            </div>
          </section>
        </main>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex size-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: "#2B4C7E" }}
            aria-label="Back to top"
          >
            <ChevronUp className="size-6 text-white" />
          </button>
        )}

        <SiteFooter />
      </div>
    </>
  )
}
