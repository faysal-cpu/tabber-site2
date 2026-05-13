"use client"

import { useState } from "react"
import type { Metadata } from "next"
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
  FolderOpen,
  HelpCircle,
  CheckCircle,
  Shield,
  FileCheck,
  Calculator,
  Send,
  Clock,
  DollarSign,
  AlertTriangle,
  BookOpen,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react"

const sections = [
  { id: "overview", title: "FMHC Overview", icon: BookOpen },
  { id: "eligibility", title: "Eligibility", icon: ClipboardCheck },
  { id: "sdm", title: "How to Become an SDM", icon: Users },
  { id: "requirements", title: "What the Program Requires", icon: FileCheck },
  { id: "application", title: "Application Process", icon: FileText },
  { id: "responsibilities", title: "Your Responsibilities", icon: Shield },
  { id: "care-arrangements", title: "Care Arrangements", icon: Users },
  { id: "bookkeeper", title: "Bookkeeper Requirements", icon: Calculator },
  { id: "reporting", title: "Monthly Reporting", icon: FileText },
  { id: "typical-month", title: "Typical Month", icon: Calendar },
  { id: "eligible-expenses", title: "Eligible Expenses", icon: DollarSign },
  { id: "deadlines", title: "Key Deadlines", icon: Clock },
  { id: "mistakes", title: "Common Mistakes", icon: AlertTriangle },
  { id: "faq", title: "FAQ", icon: HelpCircle },
  { id: "where-tabber-fits-in", title: "Where Tabber Fits In", icon: CheckCircle },
  { id: "external-links", title: "Helpful External Links", icon: ExternalLink },
]

export default function FmhcResourcesPage() {
  const [submitted, setSubmitted] = useState(false)

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

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-10 md:py-12" style={{ backgroundColor: '#E8EDF5' }}>
          <div className="mx-auto max-w-[900px] px-6 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <BookOpen className="size-4" style={{ color: '#2B4C7E' }} />
              <span className="text-sm font-semibold" style={{ color: '#2B4C7E' }}>Comprehensive Guide</span>
            </div>
            <h1 className="font-serif text-[32px] font-bold leading-[1.2] text-navy md:text-[44px]">
              Family Managed Home Care (FMHC)
            </h1>
            <p className="mt-4 text-[18px] font-medium leading-[1.4] max-w-[700px] mx-auto" style={{ color: '#2B4C7E' }}>
              A practical guide to Ontario's Family-Managed Home Care program — written for families, SDMs, and anyone navigating the FMHC program.
            </p>
            <div className="mt-6 mx-auto max-w-[650px]">
              <div className="relative w-full overflow-hidden rounded-2xl shadow-lg" style={{ height: '280px' }}>
                <Image
                  src="/images/fmhc-resources.png"
                  alt="FMHC Resources Guide"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="pt-6 pb-10 md:pt-8 md:pb-12" style={{ backgroundColor: '#E8EDF5' }}>
          <div className="mx-auto max-w-[1100px] px-6">
            <h2 className="mb-8 text-center font-serif text-[24px] font-bold text-navy">Quick Navigation</h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Understanding the Program */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: '#2B4C7E' }}>Program Basics</h3>
                <div className="space-y-2">
                  <a href="#overview" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <BookOpen className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">FMHC Overview</span>
                  </a>
                  <a href="#eligibility" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <ClipboardCheck className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">Eligibility</span>
                  </a>
                  <a href="#sdm" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <Users className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">How to Become an SDM</span>
                  </a>
                  <a href="#requirements" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <FileCheck className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">Program Requirements</span>
                  </a>
                </div>
              </div>

              {/* Getting Set Up */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: '#2B4C7E' }}>Getting Set Up</h3>
                <div className="space-y-2">
                  <a href="#application" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <FileText className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">Application Process</span>
                  </a>
                  <a href="#responsibilities" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <Shield className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">Your Responsibilities</span>
                  </a>
                  <a href="#care-arrangements" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <Users className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">Care Arrangements</span>
                  </a>
                  <a href="#bookkeeper" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <Calculator className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">Bookkeeper Requirements</span>
                  </a>
                </div>
              </div>

              {/* Managing the Program */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: '#2B4C7E' }}>Managing the Program</h3>
                <div className="space-y-2">
                  <a href="#reporting" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <FileText className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">Monthly Reporting</span>
                  </a>
                  <a href="#typical-month" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <Calendar className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">Typical Month Flow</span>
                  </a>
                  <a href="#eligible-expenses" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <DollarSign className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">Eligible Expenses</span>
                  </a>
                  <a href="#deadlines" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <Clock className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">Key Deadlines</span>
                  </a>
                </div>
              </div>

              {/* Avoiding Issues & Getting Support */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: '#2B4C7E' }}>Avoiding Issues</h3>
                <div className="space-y-2">
                  <a href="#mistakes" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <AlertTriangle className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">Common Mistakes</span>
                  </a>
                  <a href="#faq" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <HelpCircle className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">FAQ</span>
                  </a>
                  <a href="#where-tabber-fits-in" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <CheckCircle className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">Where Tabber Fits In</span>
                  </a>
                  <a href="#external-links" className="flex items-center gap-2 rounded-lg border border-border bg-white p-3 text-sm transition-all duration-200 hover:border-[#2B4C7E] hover:shadow-md">
                    <ExternalLink className="size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="font-medium text-navy">Helpful External Links</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WaveDivider fillColor="#E8EDF5" backgroundColor="#F9FAFB" />

        {/* FMHC Overview */}
        <section id="overview" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                <BookOpen className="size-5 text-white" />
              </div>
              <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">FMHC Overview</h2>
            </div>
            <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
              <p>
                Family-Managed Home Care (FMHC), also known as Self-Directed Care (SDC), is a program administered by Ontario Health atHome. Rather than receiving personal support services through a contracted agency, approved families receive direct funding to hire and manage their own care workers.
              </p>
              <p>
                That shift in control is meaningful — it means care can be arranged around the client's actual schedule, preferences, and needs. But it also means the family takes on real administrative and employer-level responsibilities that don't exist in the traditional home care model. Managing payroll, tracking expenses against a funding budget, submitting monthly reports, and maintaining records for seven years are all part of the job.
              </p>
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section id="eligibility" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                <ClipboardCheck className="size-5 text-white" />
              </div>
              <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Eligibility</h2>
            </div>
            <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
              <p>
                FMHC is not open to everyone, and enrollment is not a direct application — it begins with a conversation with your Ontario Health atHome Care Coordinator. Eligibility is assessed in two distinct parts.
              </p>
              <div className="rounded-xl border-l-4 bg-white p-6 shadow-sm" style={{ borderLeftColor: '#2B4C7E' }}>
                <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Clinical Eligibility</h3>
                <p className="mb-3">The person receiving care must already have an assessed need for home and community care services and an active care plan. The program is currently available to:</p>
                <ul className="ml-6 space-y-2 list-disc">
                  <li>Children with complex medical needs</li>
                  <li>Adults with acquired brain injuries</li>
                  <li>Children receiving education at home who meet program criteria</li>
                  <li>Individuals in extraordinary circumstances as determined by Ontario Health atHome</li>
                </ul>
              </div>
              <div className="rounded-xl border-l-4 bg-white p-6 shadow-sm" style={{ borderLeftColor: '#2B4C7E' }}>
                <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Administrative Eligibility</h3>
                <p>
                  Someone capable of managing the program's financial and employer-level responsibilities must be in place. This person is called the contract holder, and they can be the client themselves if capable, or a Substitute Decision Maker (SDM) acting on their behalf.
                </p>
              </div>
              <p>
                Ontario Health atHome assesses both clinical and administrative eligibility carefully. If either is not met, enrollment will not proceed. The Care Coordinator is your starting point for any conversation about whether FMHC is the right fit.
              </p>
            </div>
          </div>
        </section>

        {/* Substitute Decision-Maker (SDM) */}
        <section id="sdm" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                <Users className="size-5 text-white" />
              </div>
              <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Substitute Decision-Maker (SDM)</h2>
            </div>
            <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
              <p>
                A Substitute Decision-Maker is a person authorized to make decisions on behalf of someone who is unable to make them independently. In the context of FMHC, the SDM takes on the financial and administrative responsibilities of the program — managing funds, submitting reports, and fulfilling all obligations under the SDC agreement.
              </p>

              <h3 className="font-serif text-[20px] font-semibold text-navy pt-4">Who Can Be a Substitute Decision-Maker?</h3>
              <p>
                An SDM can be a spouse, partner, family member, or trusted person who is capable of managing these responsibilities on the client's behalf. For minors, a parent or legal guardian who lives with the child can serve in this role.
              </p>

              <h3 className="font-serif text-[20px] font-semibold text-navy pt-4">How to Become an SDM</h3>
              <p>
                For minors, a parent or legal guardian who lives with the child can serve as SDM. For adults, the SDM must hold one of the following:
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li>Guardian of Property status under Part 1 of the Substitute Decisions Act, 1992</li>
                <li>A Continuing Power of Attorney for Property under the Powers of Attorney Act or Part 1 of the Substitute Decisions Act, 1992</li>
                <li>A role managing Ontario government funding from the Passport Program, Ontario Works, or ODSP on behalf of the client</li>
              </ul>
              <div className="rounded-xl border border-[#2B4C7E] bg-white p-5 mt-4 shadow-sm">
                <p className="text-sm">
                  <strong className="text-navy">For information on establishing Power of Attorney or Guardian of Property status:</strong><br />
                  <a href="https://www.attorneygeneral.jus.gov.on.ca/english/family/pgt/" target="_blank" rel="noopener noreferrer" className="text-[#2B4C7E] hover:underline">
                    attorneygeneral.jus.gov.on.ca/english/family/pgt/
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What the Program Requires */}
        <section id="requirements" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                <FileCheck className="size-5 text-white" />
              </div>
              <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">What the Program Requires of You</h2>
            </div>
            <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
              <p>
                Ontario Health atHome assesses whether the prospective contract holder has the capacity to manage all of the following before approving enrollment. You should be capable of:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Understanding the client's care needs and how services should be delivered",
                  "Recruiting, screening, hiring, scheduling, and supervising care providers",
                  "Establishing contingency plans for when a provider is unavailable",
                  "Managing the program's dedicated bank account and all associated transactions",
                  "Tracking expenses against the approved funding allocation",
                  "Submitting accurate monthly financial reports by the required deadline",
                  "Retaining all financial records and documents for seven years",
                  "Complying with all applicable employment laws if hiring directly",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-white p-4 shadow-sm">
                    <CheckCircle className="mt-0.5 size-5 shrink-0" style={{ color: '#2B4C7E' }} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section id="application" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                <FileText className="size-5 text-white" />
              </div>
              <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">The Application Process</h2>
            </div>
            <div className="space-y-6 text-[15px] leading-[1.8] text-muted-foreground">
              <p>
                Unlike most programs, FMHC doesn't have a standalone application form you fill out and submit. Access runs through Ontario Health atHome, and the process moves in stages — beginning with a conversation with your Care Coordinator.
              </p>

              <div className="space-y-4">
                <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Expressing Interest</h3>
                  <p>
                    Start by telling your Care Coordinator you're interested in self-directing care. They will walk through the basics of the program and make an initial assessment of whether you might be eligible. If things look promising, your file is referred to the FMHC team for a more formal review.
                  </p>
                </div>

                <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Meeting 1 — Getting Oriented</h3>
                  <p>
                    The FMHC team will book your first formal meeting, where you'll learn how to submit your application, review the client's care needs, and discuss your options for structuring care — whether through a registered agency, an independent contractor, or by hiring directly as an employer. This decision has meaningful administrative and financial implications, and it's worth understanding your options before moving forward.
                  </p>
                </div>

                <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Meeting 2 — The Contract</h3>
                  <p>
                    After your application is submitted, you'll meet with the FMHC team a second time to review the full program agreement and all associated documentation, including your care plan and approved budget. This is a substantive meeting — the agreement outlines your legal obligations, the funding structure, reporting requirements, and the circumstances under which the contract can be amended or terminated. Ask questions here. Once signed, it is binding. At the end of this meeting, a start date is agreed upon.
                  </p>
                </div>

                <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Meeting 3 — Financial Orientation</h3>
                  <p>
                    Ontario Health atHome offers a third meeting for the contract holder and their bookkeeper, focused specifically on the financial and reporting side of the program. This meeting is described as optional in official documentation, but every system needs to be in place before the first month of expenses is reported. Your bookkeeper must be available to attend when requested.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border-2 border-[#2B4C7E] bg-white p-6 shadow-md">
                <h3 className="mb-3 font-serif text-[18px] font-semibold text-navy">Before Funding Begins</h3>
                <p className="mb-3">Ontario Health atHome will not deposit initial funds until you have provided:</p>
                <ul className="ml-6 space-y-2 list-disc">
                  <li>Proof that you have opened your dedicated FMHC bank account</li>
                  <li>Proof of the insurance required under your agreement</li>
                  <li>The name and contact information for your bookkeeper, along with your consent for Ontario Health atHome to communicate directly with them about your funds</li>
                  <li>Confirmation that you have hired or retained a service provider, including a description of the services they will provide</li>
                </ul>
                <p className="mt-3">
                  Once everything is in place, your first deposit will arrive. After that, funding is deposited monthly — within 14 calendar days of Ontario Health atHome receiving your complete monthly report.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Responsibilities */}
        <section id="responsibilities" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                <Shield className="size-5 text-white" />
              </div>
              <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Your Responsibilities as the Contract Holder</h2>
            </div>
            <div className="space-y-3 text-[15px] leading-[1.8] text-muted-foreground">
              <p className="mb-4">By signing the SDC agreement, you take on the following obligations:</p>
              {[
                "Ensuring every service provider meets the minimum qualifications set out in Schedule \"C\" before they begin providing services, including holding the required insurance",
                "Ensuring every provider has applied for a Police Vulnerable Sector Check (PVSC) and disclosed the results to you before starting — or, in urgent situations, has applied and will disclose results as soon as they are available",
                "Entering into a written employment or service agreement with each provider that contains all provisions required under Schedule \"D\"",
                "Opening and maintaining a dedicated non-interest-bearing chequing account used exclusively for FMHC funds",
                "Keeping a record of every transaction made from that account",
                "Retaining all financial records, including invoices, proof of payment, and bank statements, for seven years from the date the agreement ends",
                "Notifying your Care Coordinator within 48 hours of any actual or potential changes to the client's health, any hospitalization or emergency department visit, or any situation where the client will not need services for two weeks or more",
                "Having contingency plans in place for when a provider is unavailable — Ontario Health atHome will not cover services that were not delivered",
                "Complying with all applicable laws, including the Employment Standards Act, 2000, the Occupational Health and Safety Act, the Human Rights Code, and the Workplace Safety and Insurance Act, 1997, if you are acting as an employer",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-white p-4 shadow-sm">
                  <AlertCircle className="mt-0.5 size-5 shrink-0" style={{ color: '#2B4C7E' }} />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Care Arrangements */}
        <section id="care-arrangements" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                <Users className="size-5 text-white" />
              </div>
              <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">How to Structure Care Arrangements</h2>
            </div>
            <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
              <p>You have three options for engaging care providers:</p>

              <div className="space-y-4">
                <div className="rounded-xl border-2 border-[#2B4C7E] bg-card p-6 shadow-md">
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Through a Registered Agency</h3>
                  <p>
                    The agency employs the care workers and manages all payroll and employer obligations. Your role is to pay agency invoices and report those payments. This is the simplest arrangement administratively.
                  </p>
                </div>

                <div className="rounded-xl border-2 border-[#2B4C7E] bg-card p-6 shadow-md">
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">As an Independent Contractor</h3>
                  <p>
                    You hire care providers directly, and they invoice you for their services. They are responsible for their own taxes, CPP/EI, and insurance. Your role is to pay invoices, track them against your budget, and report monthly. The working arrangement must genuinely reflect a contractor relationship — the CRA does not rely solely on what a contract says.
                  </p>
                </div>

                <div className="rounded-xl border-2 border-[#2B4C7E] bg-card p-6 shadow-md">
                  <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">As a Direct Employer</h3>
                  <p>
                    You hire care workers as employees, which means you are responsible for payroll, source deductions, CRA remittances, T4s, and all other employer obligations under Ontario and federal law. This arrangement is the most administratively complex and is where having a qualified bookkeeper is most critical.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-navy">
                  The approved hourly rate in your budget applies across all three models and is an all-in rate — it is intended to cover wages, applicable payroll costs, insurance, and all other costs associated with delivering the service.
                </p>
              </div>

              <div className="mt-8 rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                <h3 className="mb-3 font-serif text-[20px] font-semibold text-navy">What Your Written Agreement With Each Provider Must Include</h3>
                <p className="mb-3">Every service provider agreement must contain, at minimum:</p>
                <ul className="ml-6 space-y-2 list-disc text-sm">
                  <li>A provision that the provider will deliver services in accordance with the client's care plan</li>
                  <li>A provision that the provider will disclose their PVSC results immediately upon receiving them, if not already disclosed before hiring</li>
                  <li>A provision that the provider will notify you immediately if charged with or convicted of any criminal offence</li>
                  <li>A provision that the provider will notify you immediately if they no longer meet the minimum qualifications set out in Schedule &quot;C&quot;</li>
                  <li>A provision that if Ontario Health atHome wishes to obtain information about the client's care or the SDM's participation in the program, the provider will cooperate directly with the Care Coordinator</li>
                  <li>The indemnification language set out exactly as it appears in Schedule &quot;D&quot; of the program agreement</li>
                  <li>Insurance confirmation: at minimum $2M in Commercial General Liability Insurance and $25,000 in Abuse Liability coverage, unless Ontario Health atHome has provided written permission for an exception</li>
                  <li>A relationship clause — either confirming the provider is an employee, or confirming they are an independent contractor — using the exact wording required by Schedule &quot;D&quot;</li>
                  <li>A provision acknowledging the provider is a health information custodian subject to the Personal Health Information Protection Act, 2004</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bookkeeper Requirements */}
        <section id="bookkeeper" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                <Calculator className="size-5 text-white" />
              </div>
              <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Bookkeeper Requirements</h2>
            </div>
            <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
              <p>
                Section B5.1 of the SDC agreement requires you to hire or retain a bookkeeper to provide bookkeeping services in respect of the funds, unless Ontario Health atHome has approved an alternate arrangement in writing.
              </p>

              <div className="rounded-xl border-2 border-[#2B4C7E] bg-white p-6 shadow-md">
                <h3 className="mb-3 font-serif text-[18px] font-semibold text-navy">Schedule &quot;O&quot; Requirements</h3>
                <p className="mb-3">Every individual retained as the bookkeeper must have all of the following:</p>
                <ul className="ml-6 space-y-2 list-disc">
                  <li>A registered business number</li>
                  <li>Proof of completion of one of the following: a Payroll Compliance Practitioner (PCP) certificate, a Certified Payroll Manager (CPM) certificate, a Professional Bookkeeper (CPB) certificate, or a Chartered Professional Accountant (CPA) designation</li>
                  <li>Proof of insurance coverage</li>
                </ul>
                <p className="mt-4">
                  Where the service provider is retained as an independent contractor or employed directly, the bookkeeper must also be a member of the Canadian Payroll Association.
                </p>
              </div>

              <p>
                Your bookkeeper must also be available to attend an orientation meeting with you and Ontario Health atHome when requested.
              </p>
            </div>
          </div>
        </section>

        {/* Monthly Reporting */}
        <section id="reporting" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                <FileText className="size-5 text-white" />
              </div>
              <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Monthly Financial Reporting</h2>
            </div>
            <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
              <p>
                Monthly financial reports ensure that all transactions through the FMHC bank account are accurately tracked and meet eligibility under your funding agreement with Ontario Health atHome.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border-l-4 bg-card p-5" style={{ borderLeftColor: '#2B4C7E' }}>
                  <h3 className="mb-2 font-serif text-[16px] font-semibold text-navy">When Reports Are Due</h3>
                  <p className="text-sm">
                    Reports are due no later than ten calendar days after the end of each month. Late reports may delay your next funding deposit or trigger a compliance follow-up.
                  </p>
                </div>

                <div className="rounded-xl border-l-4 bg-card p-5" style={{ borderLeftColor: '#2B4C7E' }}>
                  <h3 className="mb-2 font-serif text-[16px] font-semibold text-navy">What Must Be Submitted</h3>
                  <div className="text-sm">
                    <p className="mb-2">Each month you must provide:</p>
                    <ul className="ml-4 space-y-1 list-disc">
                      <li>The completed Schedule G&H Monthly Financial Report form, signed by you and your service provider</li>
                      <li>The invoice from your service provider (if an independent contractor) or a signed timesheet (if a direct employee)</li>
                      <li>Proof of payment for the services described</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-2 border-[#2B4C7E] bg-card p-6">
                <h3 className="mb-3 font-serif text-[18px] font-semibold text-navy">How to Complete the Report</h3>
                <p className="mb-3">
                  All updates must be made on the live web version of the Excel file via Sync. Do not complete the file offline and re-upload — this causes version control issues that can affect your submission.
                </p>
                <p>
                  To find the reporting documents, open the Financial Documentation folder in the SYNC Secure Portal and locate the Excel file titled Schedule G&H Monthly Financial Report. Open it using Edit in Office.
                </p>
              </div>

              <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">How Funding Is Deposited</h3>
                <p className="mb-3">
                  Funding is deposited monthly into your dedicated FMHC bank account. The amount reflects the maximum authorized under your care plan plus an allowance for eligible expenses. Ontario Health atHome will deposit approved funds no later than 14 calendar days following the day on which they receive your complete, satisfactory submission.
                </p>
              </div>

              <div className="rounded-xl border-2 border-orange-400 bg-orange-50 p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 size-6 shrink-0 text-orange-600" />
                  <div>
                    <h3 className="mb-2 font-serif text-[18px] font-semibold text-orange-900">The Surplus Rule</h3>
                    <p className="text-sm text-orange-900">
                      Unused funds accumulate as a surplus. When that surplus exceeds two months' worth of your approved funding, the next month's deposit is skipped. You will not receive notification of a skipped payment — it is your responsibility to monitor your balance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typical Month */}
        <section id="typical-month" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                <Calendar className="size-5 text-white" />
              </div>
              <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">What a Typical Month Looks Like</h2>
            </div>
            <div className="space-y-5">
              {[
                {
                  title: "Start of Month",
                  content: "Ontario Health atHome deposits funding into your FMHC bank account based on your approved care plan."
                },
                {
                  title: "During the Month",
                  content: "Services are delivered. Depending on your setup, you may receive invoices from an agency, receive invoices from independent contractors, or run payroll for employees."
                },
                {
                  title: "Throughout the Month",
                  content: "As payments are made, each transaction must be tracked and categorized — by service type, provider, and service dates — within your Schedule G&H report."
                },
                {
                  title: "End of Month",
                  content: "You download the bank statement, ensure every transaction in the account is reflected in the report, and attach supporting documentation (invoices, timesheets, proof of payment)."
                },
                {
                  title: "By the 10th",
                  content: "Everything is uploaded to Sync."
                },
                {
                  title: "Review & Next Deposit",
                  content: "Ontario Health atHome reviews your submission. If it is complete and compliant, your next funding deposit is issued within 14 days. The cycle then repeats."
                },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4 rounded-xl border border-border bg-white p-5 shadow-sm">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full font-semibold text-white" style={{ backgroundColor: '#2B4C7E' }}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="mb-1 font-serif text-[16px] font-semibold text-navy">{step.title}</h3>
                    <p className="text-sm leading-[1.7] text-muted-foreground">{step.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligible Expenses */}
        <section id="eligible-expenses" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                <DollarSign className="size-5 text-white" />
              </div>
              <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Eligible Expenses</h2>
            </div>
            <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
              <p>
                In addition to funding for care services, your agreement includes a monthly allowance for eligible administrative expenses. The specific caps for each category are set out in your individual Schedule &quot;I&quot; — confirm the amounts with your Care Coordinator, as they are specific to your agreement. Your agreement includes a separate allowance for administrative expenses, each with a defined monthly cap. These caps are not interchangeable and must be tracked by category.
              </p>

              <div className="rounded-xl border-2 border-[#2B4C7E] bg-card p-6">
                <h3 className="mb-3 font-serif text-[18px] font-semibold text-navy">Recognized Expense Categories</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    "Recruiting and onboarding service providers",
                    "Postage expenses, printing, and faxing",
                    "Administrative expenses relating to the FMHC bank account",
                    "Tenant's insurance and homeowner's insurance",
                    "Bookkeeping expenses",
                    "Masks",
                    "Training (requires written pre-approval)",
                    "Payment in lieu of notice for termination (requires pre-approval)",
                    "Medical supplies and treatment equipment (requires written pre-approval)",
                    "Diagnostic and laboratory services (requires written pre-approval)",
                    "Capacity Assessment under the Substitute Decisions Act, 1992",
                    "Office of the Public Guardian and Trustee (Form 1 and Form 2)",
                  ].map((expense, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 size-4 shrink-0" style={{ color: '#2B4C7E' }} />
                      <span className="text-sm">{expense}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border-2 border-orange-400 bg-orange-50 p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 size-5 shrink-0 text-orange-600" />
                  <p className="text-sm text-orange-900">
                    Items requiring pre-approval must be approved in writing before you spend. The eligible expense caps do not include applicable taxes — applicable taxes may be reported separately and, if approved, will be funded.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border-l-4 bg-card p-6" style={{ borderLeftColor: '#2B4C7E' }}>
                <h3 className="mb-3 font-serif text-[18px] font-semibold text-navy">Confirming Your Expenses Will Be Approved</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>For service provider payments:</strong> Divide the total monthly cost by the total hours of service received. The result must be equal to or less than the maximum approved rate set out in Schedule &quot;B&quot;.</li>
                  <li><strong>For hours of service:</strong> The total claimed must not exceed the monthly limit authorized in your care plan.</li>
                  <li><strong>For eligible expenses:</strong> Each category has a monthly cap as specified in Schedule &quot;I&quot;. All transactions must be supported by documentation.</li>
                </ul>
                <p className="mt-4 text-sm font-medium text-red-700">
                  Items that exceed approved limits will be flagged in red in the reporting spreadsheet and must be repaid to the FMHC bank account within 30 days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Deadlines */}
        <section id="deadlines" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                <Clock className="size-5 text-white" />
              </div>
              <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Key Deadlines</h2>
            </div>
            <div className="space-y-3">
              {[
                { deadline: "10th of each month", task: "Monthly financial report and supporting documents due" },
                { deadline: "Within 14 calendar days", task: "Ontario Health atHome deposits approved funds (after receiving complete report)" },
                { deadline: "Within 30 days", task: "Repay any ineligible amounts to your FMHC bank account" },
                { deadline: "Before hiring any provider", task: "Confirm qualifications, insurance, and PVSC results" },
                { deadline: "Within 48 hours", task: "Notify your Care Coordinator of hospitalizations, emergency visits, or significant health changes" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 rounded-xl border-2 border-[#2B4C7E] bg-white p-5 shadow-md">
                  <Clock className="mt-0.5 size-6 shrink-0" style={{ color: '#2B4C7E' }} />
                  <div>
                    <p className="font-semibold text-navy">{item.deadline}</p>
                    <p className="text-sm text-muted-foreground">{item.task}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border-2 border-[#2B4C7E] bg-card p-6">
              <h3 className="mb-2 font-serif text-[18px] font-semibold text-navy">Record Retention</h3>
              <p className="text-[15px] leading-[1.8] text-muted-foreground">
                You must retain all financial records and non-financial documents for seven years from the date the agreement expires or is terminated, or longer if required by applicable law. Do not rely on Sync for record keeping — save local copies of everything.
              </p>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section id="mistakes" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                <AlertTriangle className="size-5 text-white" />
              </div>
              <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Common Mistakes and How to Avoid Them</h2>
            </div>
            <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
              <p>
                Most issues in the program don't come from misunderstanding the rules — they come from small operational misses that compound over time. These are the situations we see most often:
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Editing the Sync Excel Report Offline",
                    description: "All updates to your Schedule G&H report must be made on the live web version via Sync. Editing the file offline and re-uploading it causes version control issues that can affect your submission and delay your funding."
                  },
                  {
                    title: "Overpaying providers",
                    description: "Payments to service providers must not exceed the approved hourly rate set out in your budget. Any amount paid above the approved rate is considered ineligible and will need to be repaid to your FMHC bank account."
                  },
                  {
                    title: "Incomplete documentation",
                    description: "Every expense and every payment must be supported by proper documentation — invoices, timesheets, and proof of payment. Ontario Health atHome requires documentation for each transaction before it can be approved, so keeping organized records throughout the month is far easier than trying to reconstruct them at reporting time."
                  },
                  {
                    title: "Spending without pre-approval",
                    description: "Training, medical supplies, and diagnostic services all require written pre-approval from your Care Coordinator before the cost is incurred. Seeking approval after the fact is not an option — these expenses will not be reimbursed unless pre-approval was obtained in advance."
                  },
                  {
                    title: "Not monitoring your surplus",
                    description: "When unused funds in your FMHC account exceed two months of your approved funding, the next month's deposit is automatically skipped. Ontario Health atHome does not notify you when this happens, so it is important to keep a close eye on your account balance and flag any concerns with your bookkeeper before a deposit is due."
                  },
                  {
                    title: "Commingling funds",
                    description: "Your dedicated FMHC bank account must be used exclusively for FMHC transactions. Personal funds and FMHC funds must remain completely separate at all times."
                  },
                  {
                    title: "Hiring without PVSC confirmation",
                    description: "All service providers must disclose their Police Vulnerable Sector Check results to you before starting — or, in urgent situations, as soon as results are available. Hiring without this step in place puts you in breach of your agreement."
                  },
                  {
                    title: "No contingency plan",
                    description: "You are responsible for arranging replacement care if a provider is unavailable. Ontario Health atHome will not pay for services that were not delivered to the client, and the obligation to have a backup plan in place rests entirely with you."
                  },
                ].map((mistake, i) => (
                  <div key={i} className="rounded-xl border-l-4 bg-card p-5" style={{ borderLeftColor: '#DC2626' }}>
                    <h3 className="mb-2 flex items-center gap-2 font-serif text-[17px] font-semibold text-navy">
                      <AlertTriangle className="size-5 text-red-600" />
                      {mistake.title}
                    </h3>
                    <p className="text-sm">{mistake.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
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
                  q: "What qualifications must my bookkeeper have?",
                  a: "A registered business number, a professional designation (CPA, PCP, CPM, or CPB), proof of insurance, and — where service providers are independent contractors or employees — membership in the Canadian Payroll Association."
                },
                {
                  q: "Can I hire a family member as my bookkeeper?",
                  a: "Generally no. The agreement prohibits using FMHC funds to pay a bookkeeper who is an immediate family member or household member unless Ontario Health atHome has granted written permission."
                },
                {
                  q: "Can I hire a family member as a care provider?",
                  a: "Also generally no, with the same exception — written permission from Ontario Health atHome is required."
                },
                {
                  q: "What is the difference between an employee and an independent contractor?",
                  a: "Employees require payroll deductions, T4s, and employer remittances to the CRA. Independent contractors handle their own taxes and invoice you for services. The CRA determines which applies based on the actual working relationship, not just what the contract says."
                },
                {
                  q: "What happens if I submit my report late?",
                  a: "Late reports may delay your funding deposit or trigger a compliance follow-up from Ontario Health atHome."
                },
                {
                  q: "What if a care worker is unavailable?",
                  a: "You are responsible for arranging replacement care. Ontario Health atHome will not pay for services that were not delivered to the client."
                },
                {
                  q: "Can services be provided outside Ontario?",
                  a: "In limited circumstances — specifically where the client is a child with complex medical needs — funding may cover services provided outside Ontario for up to three weeks per calendar year, provided you give advance notice to your Care Coordinator and confirm the provider is authorized to provide services in that location."
                },
                {
                  q: "How do I contact Ontario Health atHome?",
                  a: "For financial reporting: fmhcfinance@ontariohealthathome.ca | For general inquiries: 310-2222 (no area code required)"
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

        {/* Where Tabber Fits In */}
        <section id="where-tabber-fits-in" className="scroll-mt-20 bg-gray-50 py-10 md:py-14 border-t border-border/30">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                <CheckCircle className="size-5 text-white" />
              </div>
              <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Where Tabber Fits In</h2>
            </div>
            <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
              <p>
                Tabber was built specifically to support families navigating the financial and reporting side of Family‑Managed Home Care.
              </p>
              <p>
                We work alongside families to handle the administrative responsibilities that come with the program — from organizing and tracking expenses to preparing and submitting monthly reports in the format Ontario Health atHome expects.
              </p>
              <p>
                Our role is to keep everything structured, accurate, and up to date so that nothing is missed, delayed, or flagged — and so that families don't have to think about the reporting side each month.
              </p>
              <p>
                For families managing care at home, the administrative burden can build quickly. Having the right systems in place early makes a meaningful difference, and that's where we focus — creating a simple, repeatable process that works month after month.
              </p>
              <p>
                Our services are structured to fit within the program's approved funding allocation, which means in most cases there is no out‑of‑pocket cost to the family.
              </p>
              <p>
                If you're early in the program or want to make sure everything is set up properly, we're always happy to connect and walk through what to expect.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-10 md:py-14 border-t border-border/30" style={{ backgroundColor: '#E8EDF5' }}>
          <div className="mx-auto max-w-[800px] px-6">
            <div className="text-center mb-8">
              <h2 className="font-serif text-[28px] font-bold text-navy md:text-[34px]">Get in Touch — No Pressure</h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-navy/70">Fill in your details and we'll follow up within 1 business day to walk through your setup and next steps.</p>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-xl bg-card p-12 text-center shadow-sm">
                <div className="mb-3 flex size-14 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                  <Send className="size-6" style={{ color: '#2B4C7E' }} />
                </div>
                <h3 className="font-serif text-xl font-bold text-navy">Message Sent</h3>
                <p className="mt-2 max-w-[380px] text-sm text-muted-foreground">Thank you for reaching out. We will get back to you within 24 hours.</p>
                <Button onClick={() => setSubmitted(false)} className="mt-5 rounded-lg text-white hover:bg-navy-light" style={{ backgroundColor: '#2B4C7E' }}>Send Another Message</Button>
              </div>
            ) : (
              <form
                name="fmhc-guide-contact"
                onSubmit={handleSubmit}
                className="rounded-xl border-2 border-[#2B4C7E] bg-white p-6 md:p-8 shadow-xl"
              >
                <input type="hidden" name="form-name" value="fmhc-guide-contact" />
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
            )}
          </div>
        </section>

        {/* Helpful External Links & Disclaimer */}
        <section id="external-links" className="scroll-mt-20 bg-gray-50 py-10 md:py-12 border-t border-border/30">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#2B4C7E' }}>
                <ExternalLink className="size-5 text-white" />
              </div>
              <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Helpful External Links</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-4 mb-10">
              <a
                href="https://ontariohealthathome.ca/home-care/family-managed-home-care/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3 rounded-xl border-2 border-border bg-white p-5 transition-all duration-300 hover:border-[#2B4C7E] hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                  <ExternalLink className="size-5" style={{ color: '#2B4C7E' }} />
                </div>
                <h3 className="font-serif text-[15px] font-semibold text-navy">Ontario Health atHome - FMHC Page</h3>
              </a>

              <a
                href="https://www.ontariohealthathome.ca/blobohahprod4cd80afe1b/wp-content/uploads/2024/02/OHaH-Family-Managed-Home-Care-Fact-Sheet-EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3 rounded-xl border-2 border-border bg-white p-5 transition-all duration-300 hover:border-[#2B4C7E] hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                  <FileText className="size-5" style={{ color: '#2B4C7E' }} />
                </div>
                <h3 className="font-serif text-[15px] font-semibold text-navy">Ontario Health atHome - FMHC Fact Sheet</h3>
              </a>

              <a
                href="https://www.ontariohealthathome.ca/blobohahprod4cd80afe1b/wp-content/uploads/2024/10/OHaH-Family-Managed-Home-Care-Process-Patient-EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3 rounded-xl border-2 border-border bg-white p-5 transition-all duration-300 hover:border-[#2B4C7E] hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                  <FileCheck className="size-5" style={{ color: '#2B4C7E' }} />
                </div>
                <h3 className="font-serif text-[15px] font-semibold text-navy">Ontario Health atHome - FMHC Process Guide</h3>
              </a>

              <a
                href="https://www.youtube.com/playlist?list=PLBiwj7dQ3f5tfq6KyeTTLJg8kcK3O3f2H"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3 rounded-xl border-2 border-border bg-white p-5 transition-all duration-300 hover:border-[#2B4C7E] hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                  <BookOpen className="size-5" style={{ color: '#2B4C7E' }} />
                </div>
                <h3 className="font-serif text-[15px] font-semibold text-navy">Ontario Health atHome - FMHC YouTube Playlist</h3>
              </a>
            </div>

            <div className="mt-8 border-t border-border/30 pt-8">
              <p className="text-center text-xs leading-[1.6] text-muted-foreground italic">
                This page was prepared by Tabber based on direct program experience and Ontario Health atHome's published documentation. Program requirements may change. Always verify current requirements with your Care Coordinator.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
