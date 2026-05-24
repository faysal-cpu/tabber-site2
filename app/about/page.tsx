import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WaveDivider } from "@/components/wave-divider"
import { Button } from "@/components/ui/button"
import { Award, Shield, FileCheck, Users, Target, Eye, Puzzle } from "lucide-react"

export const metadata: Metadata = {
  title: "About | Tabber",
  description: "CPA-led bookkeeping practice specializing in Family-Managed Home Care (FMHC) and serving Ontario families and small businesses with accurate, organized financial support.",
}


const credentials = [
  { icon: Award, title: "CPA Designation", description: "Chartered Professional Accountant designation, reflecting adherence to professional accounting standards, ethical guidelines, and financial accuracy." },
  { icon: FileCheck, title: "FMHC Expertise", description: "Focused experience supporting families under Ontario Health atHome's Family-Managed Home Care (FMHC) program, with practical expertise in payroll, reporting, and funding compliance." },
  { icon: Users, title: "National Payroll Institute (NPI) Member", description: "Professional membership reflecting specialized knowledge of Canadian payroll requirements, deductions, and remittance obligations relevant to FMHC arrangements." },
  { icon: Shield, title: "Professional Insurance", description: "Comprehensive professional liability coverage providing protection and peace of mind for clients and financial operations." },
]

const values = [
  { icon: Target, title: "Accuracy", description: "Transactions are recorded carefully, reports are reviewed, and records are kept consistent over time. Your financial information is dependable and ready when it's needed." },
  { icon: Eye, title: "Transparency", description: "Clear communication and straightforward pricing at every step. You know what's being handled, why it matters, and where things stand." },
  { icon: Puzzle, title: "Tailored Support", description: "Support shaped around how you actually operate — whether managing care funding or running a business — without unnecessary complexity or one-size-fits-all processes." },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-card py-10 md:py-12">
          <div className="mx-auto max-w-[800px] px-6 text-center">
            <h1 className="font-serif text-[34px] font-bold leading-[1.2] text-navy md:text-[44px]">About Tabber</h1>
          </div>
        </section>

        <WaveDivider fillColor="#FFFFFF" backgroundColor="#F0EDE8" />

        <section className="bg-secondary py-10 md:py-14 border-b border-border/40">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="grid gap-10 md:grid-cols-[350px_1fr] md:gap-12 items-center">
              <div className="mx-auto md:mx-0">
                <Image
                  src="/images/profile-photo-optimized.jpg"
                  alt="Faysal El Masri CPA, Founder of Tabber Bookkeeping - Ontario FMHC specialist and certified accountant"
                  width={350}
                  height={350}
                  className="rounded-2xl shadow-lg"
                  priority
                />
              </div>
              <div className="flex flex-col gap-8">
                <blockquote className="border-l-4 pl-6 py-2 italic text-[15px] leading-[1.7]" style={{ borderLeftColor: '#2B4C7E', color: '#2B4C7E' }}>
                  "I saw firsthand how overwhelming FMHC administration can be for families, especially when their focus should be on caring for someone they love. Too often, financial tracking and reporting become an added burden during already difficult moments.<br /><br />Tabber was created to bring clarity, structure, and peace of mind so families don't have to navigate these requirements alone."
                  <footer className="mt-3 text-sm font-medium text-navy not-italic">— Faysal El Masri, CPA | Founder of Tabber</footer>
                </blockquote>

                <div className="space-y-5 text-[15px] leading-[1.7] text-muted-foreground">
                  <p>Tabber is a CPA-led bookkeeping and financial management practice serving Ontario families and small businesses. We provide accurate, organized, and compliant bookkeeping, payroll, and reporting support — particularly in environments where administrative requirements can quickly become overwhelming.</p>
                  <p>Our approach was shaped by firsthand experience supporting families navigating Family-Managed Home Care (FMHC), where financial administration is essential but often difficult to manage alongside caregiving. That same focus on clarity, structure, and reliability extends to all of the work we do.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card py-10 md:py-14">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="mb-8 text-center font-serif text-[26px] font-bold text-navy md:text-[32px]">Credentials & Qualifications</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {credentials.map((cred) => {
                const Icon = cred.icon
                return (
                  <div key={cred.title} className="flex items-start gap-4 rounded-xl border border-border p-6 transition-all duration-300 hover:shadow-md" style={{ borderLeftWidth: '3px', borderLeftColor: '#2B4C7E' }}>
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                      <Icon className="size-5" style={{ color: '#2B4C7E' }} />
                    </div>
                    <div>
                      <h3 className="mb-1.5 font-serif text-[18px] font-semibold text-navy">{cred.title}</h3>
                      <p className="text-sm leading-[1.65] text-muted-foreground">{cred.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-secondary py-10 md:py-14">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="mb-10 text-center font-serif text-[26px] font-bold text-navy md:text-[32px]">Our Approach</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <div key={value.title} className="relative rounded-xl border-2 border-[#2B4C7E]/20 bg-gradient-to-br from-white to-[#E8EDF5]/30 p-6 text-center shadow-md transition-all hover:shadow-xl hover:border-[#2B4C7E]/40">
                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[#2B4C7E] shadow-md">
                      <Icon className="size-7 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="mb-3 font-serif text-[17px] font-bold text-navy">{value.title}</h3>
                    <p className="text-[14px] leading-[1.7] text-muted-foreground">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" style={{ backgroundColor: '#E8EDF5' }}>
          <div className="mx-auto max-w-[700px] px-6 text-center">
            <h2 className="font-serif text-[28px] font-bold text-navy md:text-[34px]">Ready to Work Together?</h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-navy/80">Get in touch to see how Tabber can support your financial management.</p>
            <Button asChild className="mt-6 rounded-lg px-8 py-3 text-[15px] font-semibold text-white shadow-md hover:shadow-lg" style={{ backgroundColor: '#2B4C7E' }}>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
