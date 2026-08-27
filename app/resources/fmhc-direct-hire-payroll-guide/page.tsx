"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WaveDivider } from "@/components/wave-divider"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Users,
  ClipboardCheck,
  AlertCircle,
  Calendar,
  HelpCircle,
  CheckCircle,
  Shield,
  FileCheck,
  Calculator,
  Clock,
  DollarSign,
  AlertTriangle,
  BookOpen,
  ExternalLink,
  ChevronUp,
  Briefcase,
  TrendingUp,
  Target,
  FileSpreadsheet,
  Send,
} from "lucide-react"

const sections = [
  { id: "intro", title: "Introduction", icon: BookOpen },
  { id: "what-direct-hire-means", title: "What Direct Hire Means", icon: Users },
  { id: "before-first-payroll", title: "Before the First Payroll", icon: ClipboardCheck },
  { id: "running-payroll", title: "Running Payroll", icon: Calculator },
  { id: "wsib", title: "Understanding WSIB", icon: Shield },
  { id: "staying-within-funding", title: "Staying Within FMHC Funding", icon: DollarSign },
  { id: "ongoing-requirements", title: "Ongoing Requirements", icon: FileCheck },
  { id: "mistakes", title: "Common Mistakes", icon: AlertTriangle },
  { id: "faq", title: "FAQ", icon: HelpCircle },
  { id: "where-tabber-fits", title: "Where Tabber Fits In", icon: CheckCircle },
]

export default function PayrollGuidePage() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

      // Track form submission in Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'Contact',
          event_label: 'Payroll Guide Inquiry Form',
          value: 1
        })
      }

      setFormSubmitted(true)
    } catch (error) {
      console.error("Form submission error:", error)
      alert("There was an error submitting the form. Please try again.")
    }
  }

  const trackButtonClick = (buttonName: string, destination: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'CTA',
        event_label: buttonName,
        event_value: destination
      })
    }
  }

  const trackExternalLink = (linkName: string, url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'outbound_link', {
        event_category: 'External Link',
        event_label: linkName,
        event_value: url
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
                "@id": "https://tabber.ca/resources/fmhc-direct-hire-payroll-guide#article",
                "headline": "FMHC Direct-Hire Payroll: CRA Remittances, WSIB and Employer Responsibilities",
                "description": "Hiring a caregiver directly through FMHC? Learn how caregiver payroll, CRA remittances, vacation pay, WSIB, T4s, and Schedule B budgeting work in Ontario.",
                "image": "https://tabber.ca/images/fmhc-payroll-guide.png",
                "datePublished": "2026-08-26",
                "dateModified": "2026-08-26",
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
                  "@id": "https://tabber.ca/resources/fmhc-direct-hire-payroll-guide"
                },
                "keywords": "FMHC payroll, FMHC CRA remittances, FMHC WSIB, caregiver payroll Ontario, direct hire payroll"
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://tabber.ca/resources/fmhc-direct-hire-payroll-guide#breadcrumb",
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
                    "name": "FMHC Payroll Guide",
                    "item": "https://tabber.ca/resources/fmhc-direct-hire-payroll-guide"
                  }
                ]
              }
            ]
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative h-[450px] md:h-[550px] flex items-center justify-center px-6">
            <Image
              src="/images/fmhc-payroll-guide.png"
              alt="FMHC Direct-Hire Payroll Guide"
              fill
              className="object-cover"
              style={{ objectPosition: 'center 65%' }}
              priority
            />
            <div className="absolute inset-0 bg-[#2B4C7E]/15" />
            <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-b from-transparent to-[#E8EDF5]" />

            <div className="relative z-10 max-w-[800px] w-full p-8 md:p-12 rounded-2xl shadow-2xl text-center" style={{ backgroundColor: 'rgba(249, 250, 251, 0.95)', backdropFilter: 'blur(12px)' }}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-md border-2" style={{ backgroundColor: '#F3F4F6', borderColor: '#2B4C7E', color: '#2B4C7E' }}>
                <Briefcase className="size-4" />
                <span className="text-sm font-semibold">Practical Payroll Guide</span>
              </div>
              <h1 className="font-serif text-[34px] md:text-[40px] font-bold leading-[1.2] text-navy mb-5">
                FMHC Direct-Hire Payroll
              </h1>
              <div className="border-t-2 pt-5 mb-5" style={{ borderColor: '#2B4C7E' }}>
                <p className="text-[17px] md:text-[19px] font-semibold leading-[1.3] mb-4" style={{ color: '#2B4C7E' }}>
                  CRA Remittances, WSIB and Employer Responsibilities
                </p>
                <p className="text-[15px] md:text-[16px] leading-[1.6] text-navy/80">
                  Hiring a caregiver directly through Family-Managed Home Care gives your family greater control — but also makes you an employer. Here's what that means.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] justify-center pt-4 border-t border-gray-200 text-navy/70">
                <div className="relative size-7 overflow-hidden rounded-full flex-shrink-0">
                  <Image
                    src="/images/profile-faysal.jpg"
                    alt="Faysal El Masri"
                    fill
                    className="object-cover"
                    style={{ objectPosition: '58% 25%', transform: 'scale(1.70)' }}
                  />
                </div>
                <span>Written by Faysal El Masri, CPA | Updated August 2026</span>
              </div>
            </div>
          </section>

          {/* Quick Navigation */}
          <section className="pt-6 pb-10 md:pt-8 md:pb-12" style={{ backgroundColor: '#E8EDF5' }}>
            <div className="mx-auto max-w-[1100px] px-6">
              <h2 className="mb-8 text-center font-serif text-[24px] font-bold text-navy">Quick Navigation</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: "Getting Set Up", items: [
                    { href: "#intro", icon: BookOpen, label: "Introduction" },
                    { href: "#what-direct-hire-means", icon: Users, label: "What Direct Hire Means" },
                    { href: "#before-first-payroll", icon: ClipboardCheck, label: "Before First Payroll" },
                  ]},
                  { title: "Running Payroll", items: [
                    { href: "#running-payroll", icon: Calculator, label: "Payroll Calculations" },
                    { href: "#wsib", icon: Shield, label: "WSIB Requirements" },
                  ]},
                  { title: "Budget & Compliance", items: [
                    { href: "#staying-within-funding", icon: DollarSign, label: "Schedule B Funding" },
                    { href: "#ongoing-requirements", icon: FileCheck, label: "Ongoing Requirements" },
                  ]},
                  { title: "Support", items: [
                    { href: "#mistakes", icon: AlertTriangle, label: "Common Mistakes" },
                    { href: "#faq", icon: HelpCircle, label: "FAQ" },
                    { href: "#where-tabber-fits", icon: CheckCircle, label: "Where Tabber Fits" },
                  ]},
                ].map((group, idx) => (
                  <div key={idx}>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: '#2B4C7E' }}>{group.title}</h3>
                    <div className="space-y-2">
                      {group.items.map((item, i) => {
                        const Icon = item.icon
                        return (
                          <a key={i} href={item.href} className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                            <Icon className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                            <span className="font-medium text-navy">{item.label}</span>
                          </a>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <WaveDivider fillColor="#E8EDF5" backgroundColor="#FFFFFF" />

          {/* Introduction */}
          <section id="intro" className="scroll-mt-20 bg-white py-10 md:py-14">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <BookOpen className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Introduction</h2>
              </div>
              <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
                <p>
                  Hiring a caregiver directly through Family-Managed Home Care gives your family greater control over who provides care, when services are delivered, and how the arrangement is structured.
                </p>
                <p>
                  It also makes the FMHC contract holder an employer.
                </p>
                <p>
                  That means paying the caregiver is only one part of the process. You may also need to calculate payroll deductions, remit amounts to the Canada Revenue Agency, provide vacation pay and public holiday entitlements, issue pay statements and T4 slips, and determine whether WSIB coverage is required.
                </p>
                <p>
                  For many families, this is the most intimidating part of direct hire. The caregiver relationship may feel straightforward, but payroll introduces a different set of responsibilities, deadlines, and documents.
                </p>
                <p>
                  The good news is that once the payroll process is set up properly, it becomes a predictable routine.
                </p>

                <div className="rounded-xl border-2 bg-white p-6 shadow-md" style={{ borderColor: '#E8EDF5', backgroundColor: '#F9FAFB' }}>
                  <p className="text-sm font-medium text-navy mb-2">
                    <strong>Still deciding between care arrangements?</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    If you are still deciding between an agency, independent contractor, and direct-hire arrangement, start with our FMHC Care Arrangement Guide.
                  </p>
                  <Link
                    href="/resources/care-arrangement-guide"
                    onClick={() => trackButtonClick('Care Arrangement Guide', '/resources/care-arrangement-guide')}
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                    style={{ color: '#2B4C7E' }}
                  >
                    <BookOpen className="size-4" />
                    View Care Arrangement Guide
                  </Link>
                </div>

                <p>
                  If you have already chosen direct hire, this guide explains what happens next.
                </p>
              </div>
            </div>
          </section>

          <WaveDivider fillColor="#FFFFFF" backgroundColor="#F9FAFB" />

          {/* What Direct Hire Actually Means */}
          <section id="what-direct-hire-means" className="scroll-mt-20 bg-gray-50 py-10 md:py-14">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <Users className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">What Direct Hire Actually Means</h2>
              </div>
              <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
                <p>
                  Under a direct-hire arrangement, the family employs the caregiver.
                </p>
                <p>
                  The employment relationship is between the FMHC contract holder and the caregiver, even where a bookkeeper calculates payroll or prepares the monthly financial reporting.
                </p>
                <p>
                  The family remains responsible for ensuring that:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "The caregiver is paid accurately and on time;",
                    "Payroll deductions and employer contributions are calculated;",
                    "Amounts owing to CRA are remitted;",
                    "Ontario employment standards are followed;",
                    "WSIB obligations are reviewed;",
                    "Payroll and employment records are retained;",
                    "Year-end filings are completed; and",
                    "The total employment cost remains within the FMHC funding limits.",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-white p-4 shadow-sm">
                      <CheckCircle className="mt-0.5 size-5 shrink-0" style={{ color: '#2B4C7E' }} />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p>
                  A qualified bookkeeper can manage much of the calculation, documentation, monitoring, and reporting work. However, the CRA payroll account, WSIB account where applicable, and legal employer obligations remain in the family's name.
                </p>
                <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <p className="text-sm">
                    For a broader overview of contract-holder responsibilities, see our{" "}
                    <Link href="/resources/fmhc" className="font-semibold hover:underline" style={{ color: '#2B4C7E' }}>
                      Complete FMHC Guide
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <WaveDivider fillColor="#F9FAFB" backgroundColor="#FFFFFF" />

          {/* Before the First Payroll */}
          <section id="before-first-payroll" className="scroll-mt-20 bg-white py-10 md:py-14">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <ClipboardCheck className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Before the First Payroll</h2>
              </div>
              <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
                <p>
                  The best time to establish the payroll process is before the caregiver receives the first payment.
                </p>
                <p>
                  Waiting until after wages have been paid can make it more difficult to reconstruct deductions, determine the correct remittance period, and prepare compliant payroll records.
                </p>

                <div className="rounded-xl border-2 border-[#2B4C7E] bg-white p-6 shadow-md">
                  <h3 className="mb-4 font-serif text-[20px] font-semibold text-navy">Direct-Hire Payroll Setup Checklist</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2" style={{ borderColor: '#2B4C7E' }}>
                          <th className="text-left py-2 px-3 font-semibold text-navy">Requirement</th>
                          <th className="text-left py-2 px-3 font-semibold text-navy">Why It Is Needed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { req: "Written employment agreement", why: "Documents the wage, pay frequency, vacation treatment, duties, and employment terms" },
                          { req: "CRA Business Number and payroll program account", why: "Allows payroll deductions and employer contributions to be remitted" },
                          { req: "Caregiver's Social Insurance Number", why: "Required for payroll records and T4 reporting" },
                          { req: "Federal TD1 form", why: "Tells the employer which federal tax credits to apply" },
                          { req: "Ontario TD1 form", why: "Tells the employer which Ontario tax credits to apply" },
                          { req: "Signed timesheet process", why: "Supports the hours used for payroll and FMHC reporting" },
                          { req: "Established pay frequency", why: "Determines when wages are calculated and paid" },
                          { req: "WSIB review", why: "Determines whether mandatory or optional coverage applies" },
                          { req: "Schedule B review", why: "Confirms the proposed wage fits within the funded rate and approved hours" },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-border">
                            <td className="py-3 px-3 align-top font-medium">{row.req}</td>
                            <td className="py-3 px-3 align-top text-muted-foreground">{row.why}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    CRA identifies the employee's Social Insurance Number, province of employment, and completed TD1 forms as part of setting up employee payroll information.
                  </p>
                </div>

                <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Do FMHC Families Need a CRA Payroll Account?</h3>
                  <p className="mb-3">
                    If the caregiver is an employee, the family will generally require a CRA payroll program account.
                  </p>
                  <p className="mb-3">
                    A payroll account is added to a CRA Business Number and is identified by the letters RP.
                  </p>
                  <p className="mb-3">
                    For example: <code className="px-2 py-1 bg-gray-100 rounded">123456789 RP 0001</code>
                  </p>
                  <p className="mb-3">
                    The payroll account is used to remit payroll deductions and employer contributions and to manage year-end payroll reporting.
                  </p>
                  <p className="mb-3">
                    The account belongs to the family acting as the employer. It should not be registered in the name of the bookkeeper or the caregiver.
                  </p>
                  <p className="text-sm">
                    Families can review CRA's official payroll account guidance.
                  </p>
                </div>

                <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Employee Information Required</h3>
                  <p className="mb-2 text-sm">The caregiver must provide before the first payroll is processed:</p>
                  <ul className="ml-6 space-y-1 list-disc text-sm">
                    <li>Social Insurance Number</li>
                    <li>Completed Federal TD1 form</li>
                    <li>Completed Ontario TD1 form</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <WaveDivider fillColor="#FFFFFF" backgroundColor="#F9FAFB" />

          {/* Running Payroll */}
          <section id="running-payroll" className="scroll-mt-20 bg-gray-50 py-10 md:py-14">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <Calculator className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">What a Payroll Calculation Includes</h2>
              </div>
              <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
                <p>
                  A payroll calculation begins with gross pay, but gross pay is not the amount the caregiver receives.
                </p>
                <p>
                  Employee deductions are calculated first. The remaining amount is the caregiver's net pay.
                </p>
                <p>
                  The employer then has additional contributions and employment costs of its own.
                </p>

                <div className="rounded-xl border-2 border-[#2B4C7E] bg-white p-6 shadow-md mt-6">
                  <h3 className="mb-3 font-serif text-[20px] font-semibold text-navy">A Simple Payroll Example</h3>
                  <p className="mb-3">Assume one payroll produces the following amounts:</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2" style={{ borderColor: '#2B4C7E' }}>
                          <th className="text-left py-2 px-3 font-semibold text-navy">Item</th>
                          <th className="text-right py-2 px-3 font-semibold text-navy">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border">
                          <td className="py-2 px-3">Gross pay</td>
                          <td className="py-2 px-3 text-right">$1,500.00</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 px-3">Employee CPP, EI, and income tax</td>
                          <td className="py-2 px-3 text-right">($280.00)</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 px-3 font-semibold">Net pay to caregiver</td>
                          <td className="py-2 px-3 text-right font-semibold">$1,220.00</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 px-3">Employer CPP and EI</td>
                          <td className="py-2 px-3 text-right">$115.00</td>
                        </tr>
                        <tr className="border-b-2" style={{ borderColor: '#2B4C7E' }}>
                          <td className="py-2 px-3 font-semibold">Total employment cost before WSIB</td>
                          <td className="py-2 px-3 text-right font-semibold">$1,615.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm">
                    The caregiver receives $1,220.00, but the payroll costs the family $1,615.00 before any applicable WSIB premium.
                  </p>
                  <p className="mt-2 text-sm">
                    The difference is not lost. Part represents deductions withheld from the caregiver and sent to CRA. The rest represents the employer's CPP and EI contributions.
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    This distinction is essential when comparing payroll costs with the Schedule B funded rate.
                  </p>
                </div>

                <div className="rounded-xl border-l-4 bg-blue-50 p-6 mt-4" style={{ borderLeftColor: '#2B4C7E' }}>
                  <p className="text-sm font-medium" style={{ color: '#2B4C7E' }}>
                    <strong>This is one of the most common reasons direct-hire families accidentally exceed their approved Schedule B funding.</strong> They budget using the caregiver's wage and forget that employer payroll costs must come from the same funding envelope.
                  </p>
                </div>

                <div className="rounded-xl border-2 bg-white p-6 shadow-md" style={{ borderColor: '#E8EDF5', backgroundColor: '#F9FAFB' }}>
                  <h3 className="mb-3 font-serif text-[18px] font-semibold text-navy">How Tabber Handles Each Pay Period</h3>
                  <p className="mb-3">
                    Once the family provides a completed timesheet approved by both the family and employee, Tabber prepares a clear payroll summary showing exactly what needs to happen next.
                  </p>
                  <p className="mb-2">The summary includes:</p>
                  <ul className="ml-6 space-y-1 list-disc text-sm">
                    <li>Gross pay — The caregiver's earnings before deductions</li>
                    <li>Vacation pay — The vacation amount payable or accrued</li>
                    <li>Employee deductions — CPP, EI, and income tax withheld</li>
                    <li>Net pay — The exact amount to pay the caregiver</li>
                    <li>CRA remittance — The combined amount to send to CRA</li>
                    <li>WSIB premium — The amount payable where WSIB coverage applies</li>
                    <li>Payment deadlines — When each payment must be completed</li>
                    <li>Schedule B impact — How the payroll cost compares with the approved hours and funded rate</li>
                  </ul>
                </div>

                <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">What Is a CRA Payroll Remittance?</h3>
                  <p className="mb-3">
                    A CRA payroll remittance is the payment the employer sends to CRA after payroll is processed.
                  </p>
                  <p className="mb-2">It ordinarily includes:</p>
                  <ul className="ml-6 space-y-1 list-disc text-sm">
                    <li>income tax withheld from the employee;</li>
                    <li>employee CPP contributions;</li>
                    <li>employer CPP contributions;</li>
                    <li>employee EI premiums; and</li>
                    <li>employer EI premiums.</li>
                  </ul>
                  <p className="mt-3">
                    The employer temporarily holds the employee deductions and sends them to CRA together with the required employer contributions.
                  </p>
                  <p className="mt-2">
                    This is why the caregiver's net pay does not represent the family's total employment cost.
                  </p>
                </div>

                <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">When Are CRA Remittances Due?</h3>
                  <p className="mb-3">
                    The family's remittance frequency and due date depend on the remitter type assigned by CRA.
                  </p>
                  <p className="mb-3">
                    CRA has several remitter categories, including new small employer quarterly remitters, quarterly remitters with an established compliance history, regular remitters, and accelerated remitters.
                  </p>
                  <p className="mb-3">
                    Eligible new small employers may qualify for quarterly remittances. Regular remitters generally remit by the 15th day of the month following the month in which the employee was paid.
                  </p>
                  <p>
                    Families should confirm the remitter type assigned to their payroll account rather than assuming every employer follows the same schedule.
                  </p>
                </div>

                <div className="rounded-xl border-l-4 bg-blue-50 p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 size-5 shrink-0" style={{ color: '#2B4C7E' }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#2B4C7E' }}>
                        <strong>Important:</strong> Late or missing remittances can result in penalties and interest. CRA's employer guide also addresses consequences for failures to deduct or remit payroll amounts.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Vacation Pay Is an Employment Cost</h3>
                  <p className="mb-3">
                    Vacation pay is one of the employment costs that families need to consider when selecting a caregiver's wage.
                  </p>
                  <p className="mb-3">
                    For employees with less than five years of employment, the statutory minimum vacation pay is generally 4% of gross wages, excluding vacation pay itself. The entitlement increases after five years of employment.
                  </p>
                  <p className="mb-3">
                    Vacation pay may be accrued or paid with each payroll where the arrangement is documented and administered appropriately.
                  </p>
                  <p className="mb-2">The employment agreement should clearly explain:</p>
                  <ul className="ml-6 space-y-1 list-disc text-sm">
                    <li>the employee's base hourly wage;</li>
                    <li>the applicable vacation-pay rate;</li>
                    <li>whether vacation pay is accrued or paid with each payroll; and</li>
                    <li>how vacation time will be scheduled.</li>
                  </ul>
                  <p className="mt-3 font-semibold text-navy">
                    From an FMHC budgeting perspective, the key point is straightforward: Vacation pay is an employer cost and must be included when determining whether the caregiver's wage fits within the Schedule B funded rate.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <WaveDivider fillColor="#F9FAFB" backgroundColor="#FFFFFF" />

          {/* Understanding WSIB */}
          <section id="wsib" className="scroll-mt-20 bg-white py-10 md:py-14">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <Shield className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Understanding WSIB</h2>
              </div>
              <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
                <p>
                  WSIB's domestic worker policy provides coverage where a domestic worker is directly hired and paid by a private household and works more than 24 hours per week for one employer.
                </p>
                <p>
                  The policy includes categories such as housekeepers, companions, and caregivers of children. Whether a particular FMHC caregiver falls within the domestic worker policy depends on the worker's actual duties and arrangement.
                </p>

                <div className="rounded-xl border-2 border-[#2B4C7E] bg-white p-6 shadow-md">
                  <h3 className="mb-3 font-serif text-[18px] font-semibold text-navy">The More-Than-24-Hours-Per-Week Rule</h3>
                  <p className="mb-2">Under the policy:</p>
                  <ul className="ml-6 space-y-2 list-disc text-sm">
                    <li>a domestic worker employed <strong>more than 24 hours per week</strong> by one employer is covered;</li>
                    <li>a domestic worker employed 24 hours per week or less by one employer is not covered under the mandatory insurance plan;</li>
                    <li>working more than 24 total hours for multiple employers does not create mandatory coverage where the worker works 24 hours or less for each individual employer; and</li>
                    <li>a domestic worker who is not mandatorily covered may apply for optional insurance.</li>
                  </ul>
                </div>

                <div className="rounded-xl border-l-4 bg-blue-50 p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 size-5 shrink-0" style={{ color: '#2B4C7E' }} />
                    <div>
                      <p className="text-sm font-medium mb-2" style={{ color: '#2B4C7E' }}>
                        <strong>Important:</strong> The WSIB policy says <strong>more than 24 hours per week</strong>, not "24 hours or more."
                      </p>
                      <p className="text-sm" style={{ color: '#2B4C7E' }}>
                        If the employee works FMHC-funded and personally funded hours for the same household, consider the employee's complete schedule when reviewing the threshold. The funding source does not create a separate employer.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">What If the Caregiver's Hours Increase Later?</h3>
                  <p className="mb-3">
                    A caregiver may begin with a modest schedule and take on additional shifts as the client's care needs change.
                  </p>
                  <p className="mb-3">
                    For example, an employee may begin at 15 hours per week and later move to 26 hours per week. That change should trigger a new WSIB review.
                  </p>
                  <p className="mb-3 font-semibold text-navy">
                    WSIB should not be assessed once at the date of hire and then forgotten.
                  </p>
                  <p className="mb-2">Review the employee's WSIB position when:</p>
                  <ul className="ml-6 space-y-1 list-disc text-sm">
                    <li>the regular weekly schedule changes;</li>
                    <li>personally funded hours are added;</li>
                    <li>the caregiver begins covering additional shifts; or</li>
                    <li>the caregiver regularly exceeds the original schedule.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <WaveDivider fillColor="#FFFFFF" backgroundColor="#F9FAFB" />

          {/* Staying Within FMHC Funding */}
          <section id="staying-within-funding" className="scroll-mt-20 bg-gray-50 py-10 md:py-14">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <DollarSign className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Staying Within FMHC Funding</h2>
              </div>
              <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
                <p>
                  The maximum rate in Schedule B is the total funded rate, not necessarily the wage available to offer the caregiver.
                </p>
                <p className="mb-2">The same funding may need to support:</p>
                <ul className="ml-6 space-y-2 list-disc">
                  <li>base wages;</li>
                  <li>vacation pay;</li>
                  <li>employer CPP;</li>
                  <li>employer EI;</li>
                  <li>WSIB premiums;</li>
                  <li>public holiday costs; and</li>
                  <li>other employment costs required by the arrangement.</li>
                </ul>

                <div className="rounded-xl border-2 border-[#2B4C7E] bg-white p-6 shadow-md">
                  <h3 className="mb-3 font-serif text-[20px] font-semibold text-navy">Wage Versus Effective Cost</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-semibold">Amount</span>
                      <span className="font-semibold">Meaning</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span>Caregiver wage</span>
                      <span className="text-right">The base hourly rate in the employment agreement</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span>Employer payroll costs</span>
                      <span className="text-right">CPP, EI, vacation pay, WSIB, and other applicable costs</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span>Effective hourly cost</span>
                      <span className="text-right">Total employment cost divided by FMHC service hours</span>
                    </div>
                    <div className="flex justify-between py-2 border-b-2" style={{ borderColor: '#2B4C7E' }}>
                      <span className="font-semibold">Schedule B maximum rate</span>
                      <span className="text-right font-semibold">Maximum funded cost per approved service hour</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">
                    A family may have a maximum funded rate of $38.46 per hour. That does not automatically mean the employee can be offered a wage of $38.46 per hour.
                  </p>
                  <p className="mt-2 text-sm">
                    The calculation works backward:
                  </p>
                  <div className="mt-2 ml-6 text-sm space-y-1">
                    <p>Schedule B maximum rate</p>
                    <p className="ml-4">less employer payroll costs</p>
                    <p className="ml-4">less vacation pay</p>
                    <p className="ml-4">less WSIB where applicable</p>
                    <p className="ml-4 font-semibold">equals an approximate sustainable caregiver wage</p>
                  </div>
                </div>

                <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Leave Some Room</h3>
                  <p>
                    Avoid setting the wage at the calculator's absolute mathematical maximum. Public holiday pay and other payroll costs can create fluctuations. A modest buffer is generally easier to manage than repeated personally funded top-ups or a wage commitment the FMHC budget cannot consistently support.
                  </p>
                </div>

                <div className="rounded-xl border-2 bg-white p-6 shadow-md" style={{ borderColor: '#E8EDF5', backgroundColor: '#F9FAFB' }}>
                  <p className="text-sm font-medium text-navy mb-2">
                    <strong>Use the calculator</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Tabber can review the family's Schedule B, expected caregiver hours, vacation treatment, WSIB position, and proposed pay frequency before the wage is finalized.
                  </p>
                  <Link
                    href="/resources/direct-hire-calculator"
                    onClick={() => trackButtonClick('Direct Hire Calculator', '/resources/direct-hire-calculator')}
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                    style={{ color: '#2B4C7E' }}
                  >
                    <Calculator className="size-4" />
                    FMHC Direct Hire Cost Calculator
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <WaveDivider fillColor="#F9FAFB" backgroundColor="#FFFFFF" />

          {/* Ongoing Requirements */}
          <section id="ongoing-requirements" className="scroll-mt-20 bg-white py-10 md:py-14">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <FileCheck className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Ongoing Requirements</h2>
              </div>
              <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
                <p>
                  Payroll responsibilities continue beyond the monthly payment cycle.
                </p>

                <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">T4 Reporting</h3>
                  <p>
                    The employer must prepare and file the required T4 information return and provide the employee with a T4 slip for the year. The T4 reports employment income and payroll deductions, including CPP, EI, and income tax.
                  </p>
                </div>

                <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Records of Employment</h3>
                  <p>
                    A Record of Employment may be required when the employee experiences an interruption of earnings or the employment relationship ends.
                  </p>
                </div>

              </div>
            </div>
          </section>

          <WaveDivider fillColor="#FFFFFF" backgroundColor="#F9FAFB" />

          {/* Common Mistakes */}
          <section id="mistakes" className="scroll-mt-20 bg-gray-50 py-10 md:py-14">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <AlertTriangle className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Common FMHC Payroll Mistakes</h2>
              </div>

              <div className="mb-6 rounded-xl border-2 bg-white p-6 shadow-sm" style={{ borderColor: '#E8EDF5' }}>
                <p className="text-[15px] leading-[1.8] text-muted-foreground">
                  Most payroll issues don't come from misunderstanding the rules—they come from small operational misses. Here are the situations we see most often and how to avoid them.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Treating the Schedule B Rate as the Employee's Wage",
                    fix: "Use the FMHC Direct Hire Cost Calculator before making the offer."
                  },
                  {
                    title: "Paying the Employee Before Opening a Payroll Account",
                    fix: "Complete the employer and employee setup before the first payroll."
                  },
                  {
                    title: "Assuming Every CRA Remittance Is Due Monthly",
                    fix: "Confirm the remitter type through the family's CRA payroll account."
                  },
                  {
                    title: "Applying the WSIB Threshold Incorrectly",
                    fix: "Monitor the worker's complete weekly schedule, including personally funded hours worked for the same household."
                  },
                  {
                    title: "Mixing Vacation, Sick Leave, and Public Holiday Pay",
                    fix: "Address each entitlement separately in the employment agreement and payroll process."
                  },
                  {
                    title: "Reporting the Full Payroll Cost as FMHC-Funded",
                    fix: "Calculate the complete payroll and document a consistent allocation between FMHC and personal funding."
                  },
                  {
                    title: "Keeping Incomplete Payment Support",
                    fix: "Retain the timesheet, pay statement, and proof of every related payment."
                  },
                ].map((mistake, i) => (
                  <div key={i} className="rounded-lg bg-white p-4 shadow-sm border-l-4 flex items-start gap-4" style={{ borderLeftColor: '#2B4C7E' }}>
                    <div className="flex-1">
                      <h3 className="font-semibold text-navy text-[15px] mb-2">
                        {mistake.title}
                      </h3>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="size-4 shrink-0 mt-0.5" style={{ color: '#2B4C7E' }} />
                        <p className="text-sm text-muted-foreground">{mistake.fix}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <WaveDivider fillColor="#F9FAFB" backgroundColor="#FFFFFF" />

          {/* FAQ */}
          <section id="faq" className="scroll-mt-20 bg-white py-10 md:py-14">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <HelpCircle className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {[
                  {
                    q: "Can an FMHC employee be paid once per month?",
                    a: "The pay frequency should be clearly documented and must comply with the employment agreement and applicable Ontario employment standards. Monthly, semi-monthly, biweekly, and weekly schedules create different payroll periods and workflows. Choose a schedule the family can operate consistently."
                  },
                  {
                    q: "Does an employee need WSIB if the employee works exactly 24 hours per week?",
                    a: "Under WSIB's domestic worker policy, mandatory coverage applies when the worker is employed more than 24 hours per week by one employer. A worker at exactly 24 hours is not mandatorily covered under that policy, although optional insurance may be available."
                  },
                  {
                    q: "What if the employee works 20 FMHC hours and 6 personally funded hours each week?",
                    a: "If the same household employs the worker for all 26 hours, the entire 26-hour schedule should be considered when reviewing the more-than-24-hours WSIB threshold. The funding sources are different, but the worker still has one household employer."
                  },
                  {
                    q: "Does working for several families trigger WSIB?",
                    a: "WSIB's domestic worker policy says a worker who works more than 24 hours in total for multiple employers, but 24 hours or less for each individual employer, is not covered under the mandatory plan on that basis."
                  },
                  {
                    q: "Can a family obtain optional WSIB coverage below the threshold?",
                    a: "WSIB's domestic worker policy says domestic workers who are not covered under the mandatory plan may apply for optional insurance."
                  },
                  {
                    q: "Is vacation pay included in the wage?",
                    a: "That depends on how the employment agreement is structured and administered. Ontario requires vacation pay to be provided, and the treatment should be clearly documented in the employment agreement and on the employee's pay statements."
                  },
                  {
                    q: "Does the family file the employee's personal income tax return?",
                    a: "No. The family deducts and remits payroll income tax based on the employee's payroll information and TD1 forms. The employee remains responsible for filing a personal income tax return."
                  },
                  {
                    q: "Can payroll and bookkeeping support be paid from FMHC funding?",
                    a: "Bookkeeping expenses are addressed within each family's FMHC agreement and eligible-expense allocation. Families should review their Schedule I and individual funding terms. Tabber's FMHC services are structured to fit within the approved bookkeeping allowance where sufficient funding is available."
                  },
                ].map((faq, i) => (
                  <details key={i} className="group rounded-xl border border-border bg-white overflow-hidden shadow-sm">
                    <summary className="flex cursor-pointer items-start gap-3 px-6 py-5 transition-colors hover:bg-card">
                      <HelpCircle className="mt-0.5 size-5 shrink-0" style={{ color: '#2B4C7E' }} />
                      <span className="flex-1 font-serif text-[15px] font-semibold text-navy">{faq.q}</span>
                      <span className="text-2xl text-muted-foreground group-open:hidden">+</span>
                      <span className="text-2xl text-muted-foreground hidden group-open:block">−</span>
                    </summary>
                    <div className="border-t border-border bg-card px-6 py-4">
                      <p className="pl-8 text-sm leading-[1.7] text-muted-foreground">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <WaveDivider fillColor="#FFFFFF" backgroundColor="#F9FAFB" />

          {/* Contact Form Section */}
          <section className="scroll-mt-20 bg-gray-50 py-10 md:py-14">
            <div className="mx-auto max-w-[800px] px-6">
              <div className="mb-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                    <HelpCircle className="size-5 text-white" />
                  </div>
                  <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Have Questions?</h2>
                </div>
                <p className="text-[15px] leading-[1.8] text-muted-foreground">
                  Setting up direct-hire payroll for the first time? Not sure if your proposed wage fits within Schedule B, or whether you need WSIB coverage? We're here to help you get your payroll setup right from the start — no commitment required.
                </p>
              </div>
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center rounded-xl bg-card p-12 text-center shadow-sm border border-border">
                  <div className="mb-3 flex size-14 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                    <Send className="size-6" style={{ color: '#2B4C7E' }} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy">Message Sent</h3>
                  <p className="mt-2 max-w-[380px] text-sm text-muted-foreground">
                    Thank you for reaching out. We will get back to you within one business day.
                  </p>
                  <Button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-5 rounded-lg text-white"
                    style={{ backgroundColor: '#2B4C7E' }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  name="payroll-guide-inquiry"
                  onSubmit={handleFormSubmit}
                  className="rounded-xl border-2 border-[#2B4C7E] bg-white p-6 md:p-8 shadow-xl"
                >
                  <input type="hidden" name="form-name" value="payroll-guide-inquiry" />
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
                      style={{ backgroundColor: '#2B4C7E' }}
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

          <WaveDivider fillColor="#F9FAFB" backgroundColor="#FFFFFF" />

          {/* Where Tabber Fits In */}
          <section id="where-tabber-fits" className="scroll-mt-20 bg-white py-10 md:py-14">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <CheckCircle className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Where Tabber Fits In</h2>
              </div>
              <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
                <p>
                  Most families choose direct hire because they want greater control over care, not because they want to become payroll administrators.
                </p>
                <p>
                  Tabber specializes exclusively in bookkeeping, payroll, and financial reporting for Ontario Family-Managed Home Care families.
                </p>
                <p>
                  This is not general payroll adapted to FMHC after the fact.
                </p>

                <div className="rounded-xl border-2 border-[#2B4C7E] bg-white p-6 shadow-md">
                  <h3 className="mb-3 font-serif text-[20px] font-semibold text-navy">Our process is designed around the realities FMHC families face:</h3>
                  <ul className="ml-6 space-y-2 list-disc text-sm">
                    <li>caregiver wages must fit within Schedule B;</li>
                    <li>approved hours can vary by month;</li>
                    <li>care categories must be tracked separately;</li>
                    <li>CRA and WSIB payments must be supported;</li>
                    <li>personally funded care must remain separate where applicable;</li>
                    <li>every payment must reconcile to the dedicated bank account; and</li>
                    <li>Schedule G&H must be completed accurately and on time.</li>
                  </ul>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border-2 border-[#2B4C7E] bg-card p-6">
                    <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Before Payroll Begins</h3>
                    <p className="text-sm">
                      We review the Schedule B funding, proposed caregiver wage, expected hours, vacation-pay treatment, pay frequency, and potential WSIB obligations.
                    </p>
                  </div>
                  <div className="rounded-xl border-2 border-[#2B4C7E] bg-card p-6">
                    <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Every Pay Period</h3>
                    <p className="text-sm">
                      We calculate gross wages, vacation pay, employee and employer CPP/EI, income tax, net pay, CRA remittances, and WSIB premiums where applicable.
                    </p>
                  </div>
                  <div className="rounded-xl border-2 border-[#2B4C7E] bg-card p-6">
                    <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Every Month</h3>
                    <p className="text-sm">
                      We connect the payroll records to the FMHC bank account and reporting package before completing Schedule G&H.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border-2 bg-white p-6 shadow-md" style={{ borderColor: '#E8EDF5', backgroundColor: '#F9FAFB' }}>
                  <h3 className="mb-3 font-serif text-[20px] font-semibold text-navy">Why Families Choose Tabber</h3>
                  <p className="mb-3">
                    FMHC payroll requires more than payroll software. A calculation can be technically correct and still create a reporting problem if it exceeds the funded rate, uses the wrong service category, includes personal costs, or cannot be reconciled to the FMHC bank account.
                  </p>
                  <p className="mb-3">
                    Tabber brings payroll and FMHC reporting together.
                  </p>
                  <p className="mb-2">Families receive:</p>
                  <ul className="ml-6 space-y-1 list-disc text-sm">
                    <li>one point of contact for payroll and monthly reporting;</li>
                    <li>calculations built around their actual Schedule B;</li>
                    <li>clear payment amounts and deadlines;</li>
                    <li>ongoing monitoring of funded hours and costs;</li>
                    <li>support for direct-hire and hybrid arrangements;</li>
                    <li>organized, review-ready records; and</li>
                    <li>a process that becomes routine instead of stressful.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-10 md:py-14 border-t border-border/30" style={{ backgroundColor: '#E8EDF5' }}>
            <div className="mx-auto max-w-[800px] px-6 text-center">
              <h2 className="font-serif text-[28px] font-bold text-navy md:text-[34px]">Get Your FMHC Payroll Set Up Properly</h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-navy/80">
                If you are preparing to hire a caregiver directly, the best time to establish the payroll process is before the first payment.
              </p>
              <div className="mt-6 space-y-3 text-sm text-left max-w-[600px] mx-auto">
                <p>Tabber can help you:</p>
                <ul className="ml-6 space-y-2 list-disc">
                  <li>review the proposed arrangement;</li>
                  <li>determine whether the caregiver's wage fits within Schedule B;</li>
                  <li>identify the CRA, vacation-pay, and WSIB considerations;</li>
                  <li>establish the timesheet and payroll workflow; and</li>
                  <li>integrate payroll into monthly FMHC reporting.</li>
                </ul>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="rounded-lg px-8 py-3 text-[15px] font-semibold text-white shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#2B4C7E' }}
                >
                  <Link
                    href="/resources/direct-hire-calculator"
                    onClick={() => trackButtonClick('CTA - Direct Hire Calculator', '/resources/direct-hire-calculator')}
                  >
                    FMHC Direct Hire Calculator
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-lg px-8 py-3 text-[15px] font-semibold border-2 shadow-md hover:shadow-lg"
                  style={{ borderColor: '#2B4C7E', color: '#2B4C7E' }}
                >
                  <Link
                    href="/contact"
                    onClick={() => trackButtonClick('CTA - Contact Tabber', '/contact')}
                  >
                    Contact Tabber
                  </Link>
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                There is no expectation that you already understand payroll. We will explain what is required, identify what still needs to be completed, and help establish a process that works from the first pay period onward.
              </p>
            </div>
          </section>

          <WaveDivider fillColor="#FFFFFF" backgroundColor="#F9FAFB" />

          {/* External Links & Disclaimer */}
          <section className="scroll-mt-20 bg-gray-50 py-10 md:py-12">
            <div className="mx-auto max-w-[1100px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <ExternalLink className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Helpful Official Resources</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-10">
                {[
                  { title: "CRA Payroll Overview", link: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll.html" },
                  { title: "CRA: Open or Manage a Payroll Account", link: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/set-up-new-employee/payroll-accounts.html" },
                  { title: "CRA Employers' Guide: Payroll Deductions", link: "https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/t4001.html" },
                  { title: "CRA Payroll Remittance Due Dates", link: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/remitting-source-deductions/when-remit.html" },
                  { title: "WSIB Domestic Workers Policy", link: "https://www.wsib.ca/en/operational-policy-manual/domestic-workers" },
                  { title: "Ontario ESA Guide: Vacation", link: "https://www.ontario.ca/document/your-guide-employment-standards-act-0/vacation" },
                  { title: "Ontario ESA Guide: Public Holidays", link: "https://www.ontario.ca/document/your-guide-employment-standards-act-0/public-holidays" },
                ].map((resource, i) => (
                  <a
                    key={i}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackExternalLink(resource.title, resource.link)}
                    className="flex flex-col gap-3 rounded-xl border-2 border-border bg-white p-5 transition-all duration-300 hover:border-[#2B4C7E] hover:shadow-md"
                  >
                    <div className="flex size-10 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                      <ExternalLink className="size-5" style={{ color: '#2B4C7E' }} />
                    </div>
                    <h3 className="font-serif text-[15px] font-semibold text-navy">{resource.title}</h3>
                  </a>
                ))}
              </div>

              <div className="mt-8 border-t border-border/30 pt-8">
                <p className="text-center text-xs leading-[1.6] text-muted-foreground italic">
                  Tabber is an independent bookkeeping provider and is not affiliated with Ontario Health atHome, the Canada Revenue Agency, the Workplace Safety and Insurance Board, or the Ontario Ministry of Labour. Program, payroll, employment standards, tax, and WSIB requirements can change and may vary based on the family's agreement and actual working relationship. This page provides general information only and does not constitute legal, tax, employment, payroll, medical, insurance, or eligibility advice. Families should follow their signed FMHC agreement, confirm program requirements with their Ontario Health atHome Care Coordinator, confirm payroll requirements with CRA, and obtain legal or WSIB guidance where appropriate.
                </p>
              </div>
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
    </>
  )
}
