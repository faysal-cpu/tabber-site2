"use client"

import type { Metadata } from "next"
import Link from "next/link"
import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import {
  Calculator,
  BarChart3,
  ShieldCheck,
  TrendingUp,
  Settings,
  Check,
  DollarSign,
} from "lucide-react"

const services = [
  {
    id: "bookkeeping-payroll",
    icon: Calculator,
    title: "Bookkeeping & Payroll",
    description:
      "Simple, clear, and deliverable. We handle your day-to-day financial recordkeeping so you always know where things stand.",
    includes: [
      "Monthly bank & credit card reconciliation",
      "Payroll processing & source deduction remittances",
      "T4 and T4A year-end preparation",
      "CRA payroll filings & remittance tracking",
      "Accounts payable & receivable tracking",
      "Organized digital recordkeeping for audit readiness",
    ],
  },
  {
    id: "financial-reporting",
    icon: BarChart3,
    title: "Financial Reporting",
    description:
      "No forecasting models. No fancy projections. Just clarity on your numbers when you need it.",
    includes: [
      "Monthly financial statements (P&L and balance sheet)",
      "Budget vs. actual tracking for funding programs",
      "Cash flow tracking and reporting",
      "Year-end bookkeeping preparation for tax filing",
      "Clear monthly summary reports for decision-making",
    ],
  },
  {
    id: "risk-compliance",
    icon: ShieldCheck,
    title: "Risk & Compliance",
    description:
      "Supportive and practical — not enterprise compliance frameworks. We keep this grounded and small-business appropriate.",
    includes: [
      "Review of payroll & bookkeeping processes for consistency",
      "Identification of documentation gaps for funded programs",
      "Basic internal control recommendations",
      "Organized documentation for funding reviews",
      "Ongoing attention to CRA compliance deadlines",
    ],
  },
  {
    id: "analytics-insights",
    icon: TrendingUp,
    title: "Analytics & Insights",
    description:
      "Light and useful insights to help you understand your numbers. No data dashboards or corporate buzzwords.",
    includes: [
      "Monthly trend and variance explanations",
      "Expense category analysis",
      "Simple KPI tracking (customized to your needs)",
      "Quarterly financial check-in summary",
      "Identification of unusual transactions or variances",
    ],
  },
  {
    id: "setup-consulting",
    icon: Settings,
    title: "Setup & Consulting",
    description:
      "Get started right with proper setup and hands-on guidance tailored to your specific needs.",
    includes: [
      "QuickBooks or Xero setup and cleanup",
      "Chart of accounts design for funding requirements",
      "Payroll system setup",
      "Basic workflow organization",
      "One-on-one walkthrough sessions",
    ],
  },
]

export default function ServicesPage() {
  const [activeSection, setActiveSection] = useState(services[0].id)

  useEffect(() => {
    const handleScroll = () => {
      const sections = services.map((s) => document.getElementById(s.id))
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(services[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="mx-auto max-w-[800px] px-6 text-center">
            <nav className="mb-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
              <span className="mx-2">{">"}</span>
              <span className="text-navy">Services</span>
            </nav>
            <h1 className="font-serif text-[34px] font-bold leading-[1.2] text-navy md:text-[44px]">
              Our Services
            </h1>
            <p className="mx-auto mt-3 max-w-[540px] text-[16px] leading-[1.65] text-muted-foreground">
              Tailored financial management — from day-to-day bookkeeping to
              strategic insights.
            </p>
            {/* FMHC Callout */}
            <div 
              className="mx-auto mt-6 inline-flex items-center gap-3 rounded-xl border-l-[3px] bg-white px-4 py-2.5"
              style={{ borderLeftColor: '#2B4C7E', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <p className="text-sm text-muted-foreground">
                Managing Family-Managed Home Care (FMHC)? We offer specialized support —{" "}
                <Link href="/fmhc" className="font-medium underline underline-offset-2" style={{ color: '#2B4C7E' }}>
                  learn more
                </Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Main content with sticky sidebar */}
        <div className="relative mx-auto max-w-[1200px] px-6">
          <div className="flex gap-12">
            {/* Sticky Sidebar - Desktop only */}
            <aside className="hidden lg:block lg:w-[220px]">
              <nav className="sticky top-28 py-12">
                <ul className="flex flex-col gap-1">
                  {services.map((service) => (
                    <li key={service.id}>
                    <button
                      onClick={() => scrollToSection(service.id)}
                      className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        activeSection === service.id
                          ? "font-medium"
                          : "text-muted-foreground hover:bg-secondary hover:text-navy"
                      }`}
                      style={activeSection === service.id ? { backgroundColor: '#E8EDF5', color: '#2B4C7E' } : undefined}
                    >
                      {service.title}
                    </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Services Content */}
            <div className="flex-1 py-8 lg:py-0">
              {services.map((service, i) => {
                const Icon = service.icon
                const bgClass =
                  i % 2 === 0 ? "bg-card" : "bg-secondary"
                return (
                  <section
                    key={service.id}
                    id={service.id}
                    className={`scroll-mt-24 rounded-xl ${bgClass} mb-6 border border-border/50 p-8 md:p-10`}
                  >
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
                      <div className="flex shrink-0 items-center justify-center">
                        <div className="flex size-20 items-center justify-center rounded-xl" style={{ backgroundColor: '#E8EDF5' }}>
                          <Icon
                            className="size-10"
                            style={{ color: '#2B4C7E' }}
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h2 className="font-serif text-[24px] font-bold text-navy md:text-[28px]">
                          {service.title}
                        </h2>
                        <ul className="mt-5 flex flex-col gap-2.5">
                          {service.includes.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2.5"
                            >
                              <Check
                                className="size-4 shrink-0"
                                style={{ color: '#2B4C7E' }}
                                strokeWidth={2.5}
                              />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                )
              })}
            </div>
          </div>
        </div>

        {/* Transparent Pricing - Highlighted */}
        <section className="py-14 md:py-20" style={{ backgroundColor: '#E8EDF5' }}>
          <div className="mx-auto max-w-[700px] px-6 text-center">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full" style={{ backgroundColor: '#D9E2EF' }}>
              <DollarSign className="size-8" style={{ color: '#2B4C7E' }} strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-[30px] font-bold text-navy md:text-[36px]">
              Transparent Pricing
            </h2>
            <p className="mt-4 text-[16px] leading-[1.7] text-muted-foreground">
              Every client is different. We provide clear, upfront quotes based
              on the scope of work. No hidden fees, no surprises. Most FMHC
              services are typically covered within your funding allocation.
            </p>
            <Button
              asChild
              className="mt-8 rounded-lg px-8 py-3 text-[15px] font-semibold text-white shadow-md hover:shadow-lg"
              style={{ backgroundColor: '#2B4C7E' }}
            >
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 md:py-20" style={{ backgroundColor: '#1A2A44' }}>
          <div className="mx-auto max-w-[700px] px-6 text-center">
            <h2 className="font-serif text-[28px] font-bold text-white md:text-[34px]">
              Ready to Streamline Your Finances?
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-white/70">
              Let us handle the numbers so you can focus on what you do best.
            </p>
            <Button
              asChild
              className="mt-8 rounded-lg bg-white px-8 py-3 text-[15px] font-semibold text-navy hover:shadow-lg"
            >
              <Link href="/contact">Book Free Consultation</Link>
            </Button>
          </div>
        </section>

        {/* Extra spacing before footer */}
        <div className="h-4" style={{ backgroundColor: '#1A2A44' }} />
      </main>
      <SiteFooter />
    </div>
  )
}
