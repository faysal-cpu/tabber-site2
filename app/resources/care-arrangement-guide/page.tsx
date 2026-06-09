"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WaveDivider } from "@/components/wave-divider"
import { Button } from "@/components/ui/button"
import {
  Users,
  FileText,
  Building2,
  Clock,
  Shield,
  CheckCircle2,
  AlertCircle,
  ChevronUp,
  BookOpen,
  ChevronRight,
  HelpCircle,
  Mail,
  FileCheck
} from "lucide-react"
import { DecisionQuiz } from "@/components/fmhc-care-quiz"
import { ContactFormEmbed } from "@/components/contact-form-embed"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    contractor: "Consistent — your chosen contractor(s)",
    directHire: "Consistent — your chosen employee(s)"
  },
  {
    factor: "Worker management",
    agency: "None — agency handles recruitment, scheduling, and backup",
    contractor: "You recruit, screen, onboard, and arrange backup coverage",
    directHire: "You recruit, screen, onboard, and arrange backup coverage"
  },
  {
    factor: "Payroll & year-end tax obligations",
    agency: "None",
    contractor: "None — they invoice you and file their own taxes",
    directHire: "Full: CPP, EI, income tax remittance + T4s by Feb 28"
  },
  {
    factor: "Insurance requirements",
    agency: "Agency carries",
    contractor: "$2M CGL + $25K Abuse Liability — they carry",
    directHire: "$2M CGL + $25K Abuse Liability — they carry"
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
    contractor: "Families with chosen caregiver(s) who meet CRA's contractor criteria",
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

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Choosing Your FMHC Care Arrangement",
            "description": "Compare the three options for hiring care under Ontario's Family-Managed Home Care program — agency, independent contractor, or direct employee. A practical decision guide from Tabber.",
            "image": "https://tabber.ca/images/care-arrangement-guide.png",
            "datePublished": "2026-06-09",
            "dateModified": "2026-06-09",
            "author": {
              "@type": "Person",
              "name": "Faysal El Masri",
              "jobTitle": "CPA"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Tabber",
              "url": "https://tabber.ca"
            }
          })
        }}
      />

      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          {/* Hero Section with Background and Centered Box */}
          <section className="relative h-[450px] md:h-[550px] flex items-center justify-center px-6">
            <Image
              src="/images/care-arrangement-guide.png"
              alt="FMHC Care Arrangement Decision Guide"
              fill
              className="object-cover"
              style={{ objectPosition: 'center' }}
              priority
            />
            <div className="absolute inset-0 bg-[#2B4C7E]/15" />

            {/* Bottom fade to blend with next section */}
            <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-b from-transparent to-[#E8EDF5]" />

            <div className="relative z-10 max-w-[900px] w-full p-8 md:p-12 rounded-2xl shadow-2xl text-center" style={{ backgroundColor: 'rgba(249, 250, 251, 0.95)', backdropFilter: 'blur(12px)' }}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-md border-2" style={{ backgroundColor: '#F3F4F6', borderColor: '#2B4C7E', color: '#2B4C7E' }}>
                <BookOpen className="size-4" />
                <span className="text-sm font-semibold">Decision Guide</span>
              </div>
              <h1 className="font-serif text-[28px] font-bold leading-[1.2] text-navy md:text-[38px] mb-4">
                Choosing Your FMHC Care Arrangement
              </h1>
              <p className="text-[16px] md:text-[17px] font-medium leading-[1.6] mb-5" style={{ color: '#2B4C7E' }}>
                A practical decision guide for FMHC families — compare agency, contractor, and direct-hire arrangements, and find the path that fits you and your family.
              </p>
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
                <span>Written by Faysal El Masri, CPA | Updated June 2026</span>
              </div>
            </div>
          </section>

          <WaveDivider fillColor="#FFFFFF" backgroundColor="#F9FAFB" />

          {/* Care Arrangement Overview */}
          <section className="bg-gray-50 py-10 md:py-14">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <BookOpen className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Care Arrangement Overview</h2>
              </div>
              <p className="text-[17px] leading-[1.8] text-navy/90">
                One of the first decisions a Family-Managed Home Care family makes — usually during Meeting 1 with Ontario Health atHome — is how to structure care. You have three options: contract with a registered agency, hire a care worker as an independent contractor, or hire them directly as an employee. The choice shapes your administrative load, your effective hourly rate, and the legal relationship between you and the person providing care.
              </p>
              <p className="mt-4 text-[17px] leading-[1.8] text-navy/90">
                There's no universal right answer. Below is a closer look at each path, a side-by-side comparison, and a short quiz to help you find a starting point.
              </p>
            </div>
          </section>

          {/* Three Options at a Glance */}
          <section className="bg-gray-50 py-10 md:py-14 border-t border-border/30">
            <div className="mx-auto max-w-[1200px] px-6">
              <div className="mb-10 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <Users className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">The Three Options at a Glance</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {/* Agency Card */}
                <div className="rounded-xl bg-white p-8 shadow-lg border-l-4" style={{ borderLeftColor: '#2B4C7E' }}>
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl" style={{ backgroundColor: '#E8EDF5' }}>
                    <Building2 className="size-6" style={{ color: '#2B4C7E' }} />
                  </div>
                  <h3 className="mb-4 font-serif text-[20px] font-bold text-navy">
                    Working with a Registered Agency
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-navy/85">
                    You contract with a home care agency. They employ the care workers, manage all payroll and HR, and send you monthly invoices. You pay the invoices from your FMHC bank account and report them on your monthly Schedule G&H.
                  </p>
                </div>

                {/* Contractor Card */}
                <div className="rounded-xl bg-white p-8 shadow-lg border-l-4" style={{ borderLeftColor: '#2B4C7E' }}>
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl" style={{ backgroundColor: '#E8EDF5' }}>
                    <Users className="size-6" style={{ color: '#2B4C7E' }} />
                  </div>
                  <h3 className="mb-4 font-serif text-[20px] font-bold text-navy">
                    Hiring an Independent Contractor
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-navy/85">
                    You find a specific caregiver who works as a self-employed contractor. They send you invoices for their services; you pay them from your FMHC account. They handle their own income tax, CPP, and insurance.
                  </p>
                </div>

                {/* Direct Hire Card */}
                <div className="rounded-xl bg-white p-8 shadow-lg border-l-4" style={{ borderLeftColor: '#2B4C7E' }}>
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl" style={{ backgroundColor: '#E8EDF5' }}>
                    <FileText className="size-6" style={{ color: '#2B4C7E' }} />
                  </div>
                  <h3 className="mb-4 font-serif text-[20px] font-bold text-navy">
                    Hiring a Direct Employee
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-navy/85">
                    You become the employer of record. You register a CRA payroll account, run payroll each pay period, withhold and remit source deductions, register with WSIB if hours warrant, and file T4s at year-end. Your bookkeeper handles the mechanics; the legal responsibility sits with you as the contract holder.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Decision Quiz Section */}
          <section className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <HelpCircle className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Not Sure Which Option Is Right for You?</h2>
              </div>
              <p className="mb-8 text-[15px] leading-[1.8] text-muted-foreground">
                Answer a few questions and we'll recommend the care structure that best fits your situation.
              </p>
              <DecisionQuiz />
            </div>
          </section>

          {/* Side-by-Side Comparison */}
          <section className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
            <div className="mx-auto max-w-[1200px] px-6">
              <div className="mb-10 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <FileText className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Side-by-Side Comparison</h2>
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block overflow-hidden rounded-2xl shadow-xl">
                <table className="w-full border-collapse">
                  <thead>
                    <tr style={{ backgroundColor: '#2B4C7E' }}>
                      <th className="p-5 text-left font-serif text-[17px] font-semibold text-white">
                        Factor
                      </th>
                      <th className="p-5 text-left font-serif text-[17px] font-semibold text-white">
                        Agency
                      </th>
                      <th className="p-5 text-left font-serif text-[17px] font-semibold text-white">
                        Independent Contractor
                      </th>
                      <th className="p-5 text-left font-serif text-[17px] font-semibold text-white">
                        Direct Hire (Employee)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="border-b" style={{ borderColor: '#E8EDF5' }}>
                        <td className="bg-white p-5 text-[15px] font-semibold text-navy">
                          {row.factor}
                        </td>
                        <td className="bg-white p-5 text-[15px] leading-[1.6] text-navy/80">
                          {row.agency}
                        </td>
                        <td className="bg-white p-5 text-[15px] leading-[1.6] text-navy/80">
                          {row.contractor}
                        </td>
                        <td className="bg-white p-5 text-[15px] leading-[1.6] text-navy/80">
                          {row.directHire}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-6 lg:hidden">
                {comparisonData.map((row, index) => (
                  <div key={index} className="rounded-xl bg-white p-6 shadow-lg">
                    <h3 className="mb-5 font-serif text-[18px] font-bold text-navy border-b pb-3" style={{ borderColor: '#E8EDF5' }}>
                      {row.factor}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <Building2 className="size-4" style={{ color: '#2B4C7E' }} />
                          <div className="text-[14px] font-semibold text-navy">Agency</div>
                        </div>
                        <div className="text-[15px] leading-[1.6] text-navy/80">{row.agency}</div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <Users className="size-4" style={{ color: '#2B4C7E' }} />
                          <div className="text-[14px] font-semibold text-navy">Independent Contractor</div>
                        </div>
                        <div className="text-[15px] leading-[1.6] text-navy/80">{row.contractor}</div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <FileText className="size-4" style={{ color: '#2B4C7E' }} />
                          <div className="text-[14px] font-semibold text-navy">Direct Hire</div>
                        </div>
                        <div className="text-[15px] leading-[1.6] text-navy/80">{row.directHire}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* A Closer Look - Tabs */}
          <section className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-10 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <FileCheck className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">A Closer Look at Each Path</h2>
              </div>

              <Tabs defaultValue="agency" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-white border-2 border-gray-200 p-1 rounded-xl h-auto">
                  <TabsTrigger
                    value="agency"
                    className="font-serif text-[15px] data-[state=active]:bg-[#2B4C7E] data-[state=active]:text-white rounded-lg py-3 transition-all"
                  >
                    <Building2 className="mr-2 size-4" />
                    Agency
                  </TabsTrigger>
                  <TabsTrigger
                    value="contractor"
                    className="font-serif text-[15px] data-[state=active]:bg-[#2B4C7E] data-[state=active]:text-white rounded-lg py-3 transition-all"
                  >
                    <Users className="mr-2 size-4" />
                    Contractor
                  </TabsTrigger>
                  <TabsTrigger
                    value="direct-hire"
                    className="font-serif text-[15px] data-[state=active]:bg-[#2B4C7E] data-[state=active]:text-white rounded-lg py-3 transition-all"
                  >
                    <FileText className="mr-2 size-4" />
                    Direct Hire
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="agency" className="rounded-xl bg-white p-8 shadow-lg border-2" style={{ borderColor: '#E8EDF5' }}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-xl" style={{ backgroundColor: '#E8EDF5' }}>
                      <Building2 className="size-6" style={{ color: '#2B4C7E' }} />
                    </div>
                    <h3 className="font-serif text-[22px] font-bold text-navy">
                      Working with a Registered Agency
                    </h3>
                  </div>
                  <div className="space-y-4 text-[16px] leading-[1.8] text-navy/85">
                    <p>
                      The simplest path administratively. The agency employs the care workers and handles all of their payroll, taxes, insurance, and HR. Your role is to receive monthly invoices and pay them from your FMHC bank account. From a reporting standpoint, Schedule G&H is straightforward — each invoice is a single line item with the agency's name, hours, and amount.
                    </p>
                    <p>
                      The main trade-off is rate. Agencies charge an hourly rate that includes their margin, which can leave less budget room for other eligible expenses compared to a contractor or direct-hire arrangement. Continuity of caregiver(s) also depends on the agency — some assign the same worker(s) consistently, others rotate based on shift coverage and worker availability.
                    </p>
                    <div className="mt-6 rounded-xl p-5" style={{ backgroundColor: '#E8EDF5' }}>
                      <p className="font-semibold text-navy">
                        <CheckCircle2 className="mr-2 inline size-5" style={{ color: '#2B4C7E' }} />
                        Best suited for families who want minimal administrative load and want a turnkey arrangement. Often the right starting point for families who are still figuring out what their care needs look like in practice.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contractor" className="rounded-xl bg-white p-8 shadow-lg border-2" style={{ borderColor: '#E8EDF5' }}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-xl" style={{ backgroundColor: '#E8EDF5' }}>
                      <Users className="size-6" style={{ color: '#2B4C7E' }} />
                    </div>
                    <h3 className="font-serif text-[22px] font-bold text-navy">
                      Hiring an Independent Contractor
                    </h3>
                  </div>
                  <div className="space-y-4 text-[16px] leading-[1.8] text-navy/85">
                    <p>
                      A middle path. You find specific caregiver(s) who work as self-employed contractors — they invoice you for their services, you pay them from your FMHC bank account, and they handle their own income tax, CPP contributions, and insurance. Each month, you forward the invoices and proof of payment to your bookkeeper, who handles the Schedule G&H reporting and Sync upload.
                    </p>
                    <p>
                      The advantages: you choose your caregiver(s) and keep them consistently, and their full rate goes to the worker — no agency markup — which often leaves more room in the budget for other eligible expenses. The disadvantages: you take on the responsibility of recruiting, screening, and verifying credentials, you need to arrange backup care when they're unavailable, and each contractor must genuinely meet CRA's criteria for self-employment.
                    </p>
                    <div className="rounded-xl p-5 border-l-4" style={{ backgroundColor: '#FEF5F5', borderLeftColor: '#DC2626' }}>
                      <p className="text-[15px] font-medium" style={{ color: '#7F1D1D' }}>
                        <AlertCircle className="mr-2 inline size-5" style={{ color: '#DC2626' }} />
                        <strong>Important:</strong> The CRA doesn't go by what your contract says — they look at the actual working relationship. Who controls the hours, the methods, the routines? Who provides the tools? Who bears the risk of loss? CRA can reclassify a contractor as an employee retroactively and assess back source deductions plus interest if it determines the relationship was actually employment. If you're uncertain about the classification, a tax advisor or a CRA ruling (Form CPT1) is the right next step.
                      </p>
                    </div>
                    <div className="mt-6 rounded-xl p-5" style={{ backgroundColor: '#E8EDF5' }}>
                      <p className="font-semibold text-navy">
                        <CheckCircle2 className="mr-2 inline size-5" style={{ color: '#2B4C7E' }} />
                        Best suited for families who've identified specific caregiver(s) they want to work with long-term, and where the working relationship fits CRA's contractor criteria.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="direct-hire" className="rounded-xl bg-white p-8 shadow-lg border-2" style={{ borderColor: '#E8EDF5' }}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-xl" style={{ backgroundColor: '#E8EDF5' }}>
                      <FileText className="size-6" style={{ color: '#2B4C7E' }} />
                    </div>
                    <h3 className="font-serif text-[22px] font-bold text-navy">
                      Hiring a Direct Employee
                    </h3>
                  </div>
                  <div className="space-y-4 text-[16px] leading-[1.8] text-navy/85">
                    <p>
                      The most administratively involved path, and the one with the most control. You become the employer of record: you register a CRA payroll account, run payroll each pay period (calculating CPP, EI, and income tax), remit source deductions to CRA by the 15th of each month, register for WSIB if combined hours exceed 24 per week, and file T4 slips at year-end. Your bookkeeper handles the calculations and reporting, but the legal employer is you.
                    </p>
                    <p>
                      The benefits are full control over the working relationship and consistency of caregiver(s). The drawbacks are the administrative weight and real liability exposure as an employer. Setup is more involved than the other paths, between CRA registration, payroll configuration, and onboarding paperwork.
                    </p>
                    <div className="mt-6 rounded-xl p-5" style={{ backgroundColor: '#E8EDF5' }}>
                      <p className="font-semibold text-navy">
                        <CheckCircle2 className="mr-2 inline size-5" style={{ color: '#2B4C7E' }} />
                        Best suited for families with administrative capacity, who want full control over the working relationship, and who are comfortable taking on employer obligations. Often the right choice when caregiver(s) want employment status, or when the working arrangement has employment characteristics.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* How to Choose */}
          <section className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                  <HelpCircle className="size-5 text-white" />
                </div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">How to Choose</h2>
              </div>

              <p className="mb-8 text-[15px] leading-[1.8] text-muted-foreground">
                The right path depends less on what's "best in general" and more on what fits your family's situation. Three questions can help you orient.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 font-serif text-[18px] font-bold text-navy">
                    How much administrative work can you reasonably take on?
                  </h3>
                  <p className="text-[15px] leading-[1.8] text-muted-foreground">
                    Agencies require almost none — pay an invoice, file the report. Contractors require some — track invoices, verify credentials, arrange contingency care. Direct hire requires real ongoing commitment — payroll calendars, CRA deadlines, T4 season, WSIB if applicable.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 font-serif text-[18px] font-bold text-navy">
                    How important is having the same caregiver every visit?
                  </h3>
                  <p className="text-[15px] leading-[1.8] text-muted-foreground">
                    Direct hire and independent contractor arrangements give you direct control over who provides care, so consistency is built in. With an agency, consistency depends on the agency's scheduling and worker availability — some agencies prioritize keeping the same worker assigned, others rotate based on shift coverage.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 font-serif text-[18px] font-bold text-navy">
                    How well does the working relationship match CRA's criteria for contractor versus employee?
                  </h3>
                  <p className="text-[15px] leading-[1.8] text-muted-foreground">
                    The CRA doesn't go by what your contract says — they look at who controls the work, who provides the tools, and who bears the risk of loss. If you're uncertain how to classify your situation, that's a question for a tax advisor or CRA directly (Form CPT1, Request for a CPP/EI Ruling).
                  </p>
                </div>

                {/* Closing paragraph - styled like FMHC page */}
                <div className="rounded-xl bg-blue-50 border-l-4 p-6 shadow-sm" style={{ borderLeftColor: '#2B4C7E' }}>
                  <p className="text-[15px] leading-[1.7]" style={{ color: '#2B4C7E' }}>
                    Whatever path you choose, you'll need a qualified bookkeeper before Ontario Health atHome releases your first funding deposit. Schedule O of your agreement specifies the required bookkeeper qualifications. Tabber supports families across all three models, and our services are structured to fit within the bookkeeping allowance built into your FMHC budget — no out-of-pocket cost to you.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-10 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
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
          <section className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="mb-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                    <Mail className="size-5 text-white" />
                  </div>
                  <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Have Questions?</h2>
                </div>
                <p className="text-[15px] leading-[1.8] text-muted-foreground">
                  Every FMHC situation is different. If you're unsure which path makes sense for your setup, feel free to reach out — we're happy to talk it through.
                </p>
              </div>
              <ContactFormEmbed />
            </div>
          </section>

          {/* Footer Disclaimer */}
          <section className="scroll-mt-20 bg-gray-50 py-8 border-t border-border/30">
            <div className="mx-auto max-w-[900px] px-6">
              <p className="text-center text-xs leading-[1.6] text-muted-foreground italic">
                Tabber is an independent bookkeeping provider and is not affiliated with Ontario Health atHome. Program requirements can change and may vary by agreement. This page provides general information only and is not legal, tax, payroll, medical, or eligibility advice. Families should follow their own signed agreement and confirm current requirements with their Ontario Health atHome care coordinator. For legal, employment, payroll, tax, or SDM questions, consult an appropriate qualified professional.
              </p>
            </div>
          </section>
        </main>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex size-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: '#2B4C7E' }}
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
