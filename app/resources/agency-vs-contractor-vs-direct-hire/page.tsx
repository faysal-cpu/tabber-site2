"use client"

import Link from "next/link"
import { useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WaveDivider } from "@/components/wave-divider"
import { Button } from "@/components/ui/button"
import {
  Users,
  FileText,
  Building2,
  Clock,
  DollarSign,
  Shield,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { useState } from "react"
import { DecisionQuiz } from "@/components/fmhc-care-quiz"
import { ContactFormEmbed } from "@/components/contact-form-embed"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// This would normally be in metadata, but for client component we'll use it differently
const pageTitle = "Agency, Contractor, or Direct Hire: How to Choose Your FMHC Care Arrangement | Tabber"
const pageDescription = "Compare the three options for hiring care under Ontario's Family-Managed Home Care program — agency, independent contractor, or direct employee. A practical decision guide from Tabber."

const comparisonData = [
  {
    factor: "Administrative complexity",
    agency: "Lowest — pay invoices, report monthly",
    contractor: "Moderate — track invoices, manage the relationship",
    directHire: "Highest — full employer obligations"
  },
  {
    factor: "Hourly cost structure",
    agency: "Agency rate (includes their margin)",
    contractor: "Contractor's rate paid directly to them",
    directHire: "Wages + employer payroll costs (CPP, EI, WSIB)"
  },
  {
    factor: "Caregiver continuity",
    agency: "Depends on the agency's scheduling",
    contractor: "Consistent — your chosen contractor",
    directHire: "Consistent — your chosen employee"
  },
  {
    factor: "Recruitment effort",
    agency: "None — agency handles staffing",
    contractor: "You find, screen, and onboard",
    directHire: "You find, screen, and onboard"
  },
  {
    factor: "Backup when worker is unavailable",
    agency: "Agency provides",
    contractor: "You arrange replacement",
    directHire: "You arrange replacement"
  },
  {
    factor: "Payroll obligations",
    agency: "None",
    contractor: "None — they invoice you",
    directHire: "Full: CPP, EI, income tax, monthly CRA remittance"
  },
  {
    factor: "Year-end obligations",
    agency: "None",
    contractor: "None — they file their own taxes",
    directHire: "T4 and T4 Summary by February 28"
  },
  {
    factor: "Insurance requirements",
    agency: "Agency carries",
    contractor: "$2M CGL + $25K Abuse Liability — they carry",
    directHire: "$2M CGL + $25K Abuse Liability — they carry"
  },
  {
    factor: "WSIB registration",
    agency: "Not applicable",
    contractor: "Not applicable",
    directHire: "Required if employee works more than 24 hours/week"
  },
  {
    factor: "Bookkeeper requirement",
    agency: "Per Schedule O of FMHC agreement",
    contractor: "Per Schedule O of FMHC agreement",
    directHire: "Per Schedule O of FMHC agreement"
  },
  {
    factor: "Time to set up",
    agency: "Fastest",
    contractor: "Moderate",
    directHire: "Longest"
  },
  {
    factor: "Best suited for",
    agency: "Families wanting minimal admin",
    contractor: "Families with a chosen caregiver who genuinely meets CRA's contractor criteria",
    directHire: "Families with admin capacity who want full control"
  }
]

const faqs = [
  {
    question: "Can I change my mind later?",
    answer: "Yes — you can transition between models if your situation changes. We can walk you through what the change involves."
  },
  {
    question: "Does it cost more to use a bookkeeper if I'm a direct hire?",
    answer: "Schedule I of your FMHC agreement includes a monthly bookkeeping allowance regardless of which model you choose. Tabber's services are structured to fit within that allowance, so there's no out-of-pocket cost — even for direct-hire arrangements, which are the most involved."
  },
  {
    question: "What if my chosen contractor turns out to be classified as an employee by CRA?",
    answer: "This is the main risk of the contractor model. CRA's classification can apply retroactively, which means back source deductions plus interest. The right approach is to structure the arrangement from day one based on what the working relationship actually is — and switch to direct employment if it functions that way in practice. If you're uncertain how to classify your situation, that's a question for a tax advisor or CRA directly (Form CPT1, Request for a CPP/EI Ruling). Tabber's role is the bookkeeping and reporting based on whichever structure you've chosen."
  },
  {
    question: "Can I hire a family member?",
    answer: "Generally no. FMHC prohibits hiring an immediate family member or household member as a care provider without written permission from Ontario Health atHome. The same rule applies to hiring a family member as your bookkeeper. Exceptions are granted in some circumstances; ask your Care Coordinator early if this is something you're considering."
  },
  {
    question: "Which arrangement is most common?",
    answer: "Which arrangement is right depends on your family's situation more than any \"typical\" choice. Each of the three is well-established under FMHC; the right fit comes down to the factors covered in the matrix above."
  }
]

export default function CareArrangementGuidePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-card py-10 md:py-12">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-4">
              <Link
                href="/resources"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-navy transition-colors"
              >
                ← Back to Resources
              </Link>
            </div>
            <h1 className="font-serif text-[34px] font-bold leading-[1.2] text-navy md:text-[44px]">
              Choosing Your FMHC Care Arrangement
            </h1>
            <p className="mt-4 text-[16px] leading-[1.7] text-muted-foreground">
              One of the first decisions a Family-Managed Home Care family makes — usually during Meeting 1 with Ontario Health atHome — is how to structure care. You have three options: contract with a registered agency, hire a care worker as an independent contractor, or hire them directly as an employee. The choice shapes your administrative load, your effective hourly rate, and the legal relationship between you and the person providing care.
            </p>
            <p className="mt-3 text-[16px] leading-[1.7] text-muted-foreground">
              There's no universal right answer. Below is a side-by-side comparison and a closer look at each path, so you can decide what fits your family.
            </p>
          </div>
        </section>

        <WaveDivider fillColor="#FFFFFF" backgroundColor="#F0EDE8" />

        {/* Decision Quiz Section */}
        <DecisionQuiz />

        {/* Three Options at a Glance */}
        <section className="bg-card py-10 md:py-14">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="mb-8 text-center font-serif text-[28px] font-bold text-navy md:text-[34px]">
              The Three Options at a Glance
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Agency Card */}
              <div className="rounded-xl border-2 border-border bg-secondary p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                  <Building2 className="size-6" style={{ color: '#2B4C7E' }} />
                </div>
                <h3 className="mb-3 font-serif text-[20px] font-semibold text-navy">
                  Working with a Registered Agency
                </h3>
                <p className="text-[15px] leading-[1.7] text-muted-foreground">
                  You contract with a home care agency. They employ the care workers, manage all payroll and HR, and send you monthly invoices. You pay the invoices from your FMHC bank account and report them on your monthly Schedule G&H.
                </p>
              </div>

              {/* Contractor Card */}
              <div className="rounded-xl border-2 border-border bg-secondary p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                  <Users className="size-6" style={{ color: '#2B4C7E' }} />
                </div>
                <h3 className="mb-3 font-serif text-[20px] font-semibold text-navy">
                  Hiring an Independent Contractor
                </h3>
                <p className="text-[15px] leading-[1.7] text-muted-foreground">
                  You find a specific caregiver who works as a self-employed contractor. They send you invoices for their services; you pay them from your FMHC account. They handle their own income tax, CPP, and insurance.
                </p>
              </div>

              {/* Direct Hire Card */}
              <div className="rounded-xl border-2 border-border bg-secondary p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                  <FileText className="size-6" style={{ color: '#2B4C7E' }} />
                </div>
                <h3 className="mb-3 font-serif text-[20px] font-semibold text-navy">
                  Hiring a Direct Employee
                </h3>
                <p className="text-[15px] leading-[1.7] text-muted-foreground">
                  You become the employer of record. You register a CRA payroll account, run payroll each pay period, withhold and remit source deductions, register with WSIB if hours warrant, and file T4s at year-end. Your bookkeeper handles the mechanics; the legal responsibility sits with you as the contract holder.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Side-by-Side Comparison */}
        <section className="bg-secondary py-10 md:py-14">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="mb-8 text-center font-serif text-[28px] font-bold text-navy md:text-[34px]">
              Side-by-Side Comparison
            </h2>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2" style={{ borderColor: '#2B4C7E' }}>
                    <th className="bg-card p-4 text-left font-serif text-[16px] font-semibold text-navy">
                      Factor
                    </th>
                    <th className="bg-card p-4 text-left font-serif text-[16px] font-semibold text-navy">
                      Agency
                    </th>
                    <th className="bg-card p-4 text-left font-serif text-[16px] font-semibold text-navy">
                      Independent Contractor
                    </th>
                    <th className="bg-card p-4 text-left font-serif text-[16px] font-semibold text-navy">
                      Direct Hire (Employee)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-border">
                      <td className="bg-card p-4 text-[14px] font-medium text-navy">
                        {row.factor}
                      </td>
                      <td className="bg-card p-4 text-[14px] text-muted-foreground">
                        {row.agency}
                      </td>
                      <td className="bg-card p-4 text-[14px] text-muted-foreground">
                        {row.contractor}
                      </td>
                      <td className="bg-card p-4 text-[14px] text-muted-foreground">
                        {row.directHire}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-8 lg:hidden">
              {comparisonData.map((row, index) => (
                <div key={index} className="rounded-lg border border-border bg-card p-5">
                  <h3 className="mb-4 font-serif text-[16px] font-semibold text-navy">
                    {row.factor}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 text-[13px] font-medium text-navy">Agency</div>
                      <div className="text-[14px] text-muted-foreground">{row.agency}</div>
                    </div>
                    <div>
                      <div className="mb-1 text-[13px] font-medium text-navy">Independent Contractor</div>
                      <div className="text-[14px] text-muted-foreground">{row.contractor}</div>
                    </div>
                    <div>
                      <div className="mb-1 text-[13px] font-medium text-navy">Direct Hire</div>
                      <div className="text-[14px] text-muted-foreground">{row.directHire}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* A Closer Look */}
        <section className="bg-card py-10 md:py-14">
          <div className="mx-auto max-w-[900px] px-6">
            <h2 className="mb-10 text-center font-serif text-[28px] font-bold text-navy md:text-[34px]">
              A Closer Look at Each Path
            </h2>

            <div className="space-y-10">
              {/* Agency */}
              <div>
                <h3 className="mb-4 font-serif text-[22px] font-semibold text-navy">
                  Working with a Registered Agency
                </h3>
                <div className="space-y-4 text-[15px] leading-[1.7] text-muted-foreground">
                  <p>
                    The simplest path administratively. The agency employs the care workers and handles all of their payroll, taxes, insurance, and HR. Your role is to receive monthly invoices and pay them from your FMHC bank account. From a reporting standpoint, Schedule G&H is straightforward — each invoice is a single line item with the agency's name, hours, and amount.
                  </p>
                  <p>
                    The main trade-off is rate. Agencies charge an hourly rate that includes their margin, which can leave less budget room for other eligible expenses compared to a contractor or direct-hire arrangement. Continuity of caregiver also depends on the agency — some assign the same worker consistently, others rotate based on shift coverage and worker availability.
                  </p>
                  <p className="font-medium text-navy">
                    Best suited for families who want minimal administrative load and want a turnkey arrangement. Often the right starting point for families who are still figuring out what their care needs look like in practice.
                  </p>
                </div>
              </div>

              {/* Contractor */}
              <div>
                <h3 className="mb-4 font-serif text-[22px] font-semibold text-navy">
                  Hiring an Independent Contractor
                </h3>
                <div className="space-y-4 text-[15px] leading-[1.7] text-muted-foreground">
                  <p>
                    A middle path. You find a specific caregiver who works as a self-employed contractor — they invoice you for their services, you pay them from your FMHC bank account, and they handle their own income tax, CPP contributions, and insurance. Each month, you forward the invoice and proof of payment to your bookkeeper, who handles the Schedule G&H reporting and Sync upload.
                  </p>
                  <p>
                    The advantages: you choose your caregiver and keep them consistently, and their full rate goes to the worker — no agency markup — which often leaves more room in the budget for other eligible expenses. The disadvantages: you take on the responsibility of recruiting, screening, and verifying credentials, you need to arrange backup care when they're unavailable, and the contractor must genuinely meet CRA's criteria for self-employment.
                  </p>
                  <p>
                    That last point matters more than most families realize. The CRA doesn't go by what your contract says — they look at the actual working relationship. Who controls the hours, the methods, the routines? Who provides the tools? Who bears the risk of loss? CRA can reclassify a contractor as an employee retroactively and assess back source deductions plus interest if it determines the relationship was actually employment. If you're uncertain about the classification, a tax advisor or a CRA ruling (Form CPT1) is the right next step.
                  </p>
                  <p className="font-medium text-navy">
                    Best suited for families who've identified a specific caregiver they want to work with long-term, and where the working relationship fits CRA's contractor criteria.
                  </p>
                </div>
              </div>

              {/* Direct Hire */}
              <div>
                <h3 className="mb-4 font-serif text-[22px] font-semibold text-navy">
                  Hiring a Direct Employee
                </h3>
                <div className="space-y-4 text-[15px] leading-[1.7] text-muted-foreground">
                  <p>
                    The most administratively involved path, and the one with the most control. You become the employer of record: you register a CRA payroll account, run payroll each pay period (calculating CPP, EI, and income tax), remit source deductions to CRA by the 15th of each month, register for WSIB if hours exceed 24 per week, and file T4 slips at year-end. Your bookkeeper handles the calculations and reporting, but the legal employer is you.
                  </p>
                  <p>
                    The benefits are full control over the working relationship and consistency of caregiver. The drawbacks are the administrative weight and real liability exposure as an employer. Setup is more involved than the other paths, between CRA registration, payroll configuration, and onboarding paperwork.
                  </p>
                  <p className="font-medium text-navy">
                    Best suited for families with administrative capacity, who want full control over the working relationship, and who are comfortable taking on employer obligations. Often the right choice when a caregiver wants employment status, or when the working arrangement has employment characteristics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Choose */}
        <section className="bg-secondary py-10 md:py-14">
          <div className="mx-auto max-w-[900px] px-6">
            <h2 className="mb-6 text-center font-serif text-[28px] font-bold text-navy md:text-[34px]">
              How to Choose
            </h2>
            <p className="mb-8 text-center text-[15px] leading-[1.7] text-muted-foreground">
              The right path depends less on what's "best in general" and more on what fits your family's situation. Three questions can help you orient.
            </p>

            <div className="space-y-6">
              <div className="rounded-lg bg-card p-6">
                <h3 className="mb-3 font-serif text-[18px] font-semibold text-navy">
                  How much administrative work can you reasonably take on?
                </h3>
                <p className="text-[15px] leading-[1.7] text-muted-foreground">
                  Agencies require almost none — pay an invoice, file the report. Contractors require some — track invoices, verify credentials, arrange contingency care. Direct hire requires real ongoing commitment — payroll calendars, CRA deadlines, T4 season, WSIB if applicable.
                </p>
              </div>

              <div className="rounded-lg bg-card p-6">
                <h3 className="mb-3 font-serif text-[18px] font-semibold text-navy">
                  How important is having the same caregiver every visit?
                </h3>
                <p className="text-[15px] leading-[1.7] text-muted-foreground">
                  Direct hire and independent contractor arrangements give you direct control over who provides care, so consistency is built in. With an agency, consistency depends on the agency's scheduling and worker availability — some agencies prioritize keeping the same worker assigned, others rotate based on shift coverage.
                </p>
              </div>

              <div className="rounded-lg bg-card p-6">
                <h3 className="mb-3 font-serif text-[18px] font-semibold text-navy">
                  How well does the working relationship match CRA's criteria for contractor versus employee?
                </h3>
                <p className="text-[15px] leading-[1.7] text-muted-foreground">
                  The CRA doesn't go by what your contract says — they look at who controls the work, who provides the tools, and who bears the risk of loss. If you're uncertain how to classify your situation, that's a question for a tax advisor or CRA directly (Form CPT1, Request for a CPP/EI Ruling).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Happens Next */}
        <section className="bg-card py-10 md:py-14">
          <div className="mx-auto max-w-[900px] px-6">
            <h2 className="mb-6 text-center font-serif text-[28px] font-bold text-navy md:text-[34px]">
              What Happens Next
            </h2>
            <p className="mb-8 text-center text-[15px] leading-[1.7] text-muted-foreground">
              Once you've made your choice, here's what the path forward looks like.
            </p>

            <div className="space-y-6">
              <div className="rounded-lg border-l-4 bg-secondary p-6" style={{ borderColor: '#2B4C7E' }}>
                <h3 className="mb-3 font-serif text-[18px] font-semibold text-navy">
                  If you're going with an agency
                </h3>
                <p className="text-[15px] leading-[1.7] text-muted-foreground">
                  Talk to your Care Coordinator about agencies in your region, or research options independently. Once you've chosen one, set up the invoicing relationship and you're ready to start receiving care.
                </p>
              </div>

              <div className="rounded-lg border-l-4 bg-secondary p-6" style={{ borderColor: '#2B4C7E' }}>
                <h3 className="mb-3 font-serif text-[18px] font-semibold text-navy">
                  If you're going with an independent contractor
                </h3>
                <p className="text-[15px] leading-[1.7] text-muted-foreground">
                  Identify your caregiver, sign a written service provider agreement that includes all the provisions required under Schedule D of your FMHC agreement, verify their insurance ($2M Commercial General Liability + $25K Abuse Liability), and confirm their Police Vulnerable Sector Check (PVSC). Then we set up your FMHC bookkeeping.
                </p>
              </div>

              <div className="rounded-lg border-l-4 bg-secondary p-6" style={{ borderColor: '#2B4C7E' }}>
                <h3 className="mb-3 font-serif text-[18px] font-semibold text-navy">
                  If you're going with direct hire
                </h3>
                <p className="text-[15px] leading-[1.7] text-muted-foreground">
                  Identify your caregiver, register your CRA payroll account, register with WSIB if their hours will exceed 24/week, sign an offer letter and a Schedule D agreement, and we handle the payroll setup and FMHC bookkeeping.
                </p>
              </div>

              <div className="mt-8 rounded-lg bg-card p-6 border-2 border-border">
                <p className="text-[15px] leading-[1.7] text-muted-foreground">
                  In all three cases, you'll need a qualified bookkeeper before Ontario Health atHome will release your first funding deposit. Schedule O of your agreement specifies the required bookkeeper qualifications. Tabber supports families across all three models, and our services are structured to fit within the bookkeeping allowance built into your FMHC budget — no out-of-pocket cost to you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-secondary py-10 md:py-14">
          <div className="mx-auto max-w-[900px] px-6">
            <h2 className="mb-8 text-center font-serif text-[28px] font-bold text-navy md:text-[34px]">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-lg border border-border bg-card px-6"
                >
                  <AccordionTrigger className="text-left font-serif text-[16px] font-semibold text-navy hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-[1.7] text-muted-foreground pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section with Contact Form */}
        <section className="bg-card py-10 md:py-14">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-8 text-center">
              <h2 className="font-serif text-[28px] font-bold text-navy md:text-[34px]">
                Have Questions About Your Situation?
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-muted-foreground">
                We're here to help. Send us your questions and we'll get back to you within one business day.
              </p>
            </div>
            <ContactFormEmbed />
          </div>
        </section>

        {/* Footer Disclaimer */}
        <section className="bg-secondary py-6">
          <div className="mx-auto max-w-[900px] px-6">
            <p className="text-center text-[13px] leading-[1.6] text-muted-foreground">
              Tabber is an independent bookkeeping provider and is not affiliated with Ontario Health atHome. Program requirements can change and may vary by agreement. This page provides general information only and is not legal, tax, payroll, medical, or eligibility advice. Families should follow their own signed agreement and confirm current requirements with their Ontario Health atHome Care Coordinator. For legal, employment, payroll, tax, or SDM questions, consult an appropriate qualified professional.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
