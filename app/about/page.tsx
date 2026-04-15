import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Award, Shield, FileCheck, Users } from "lucide-react"

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
  { title: "Accuracy", description: "Transactions are recorded carefully, reports are reviewed, and records are kept consistent over time. Your financial information is dependable and ready when it's needed." },
  { title: "Transparency", description: "Clear communication and straightforward pricing at every step. You know what's being handled, why it matters, and where things stand." },
  { title: "Tailored Support", description: "Support shaped around how you actually operate — whether managing care funding or running a business — without unnecessary complexity or one-size-fits-all processes." },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-[800px] px-6 text-center">
            <h1 className="font-serif text-[34px] font-bold leading-[1.2] text-navy md:text-[44px]">About Tabber</h1>
            <p className="mt-3 text-[16px] leading-[1.65] text-muted-foreground">CPA-led bookkeeping specializing in Family-Managed Home Care, with support for Ontario small businesses.</p>
          </div>
        </section>

        <section className="bg-secondary py-12 md:py-16">
          <div className="mx-auto max-w-[800px] px-6">
            <div className="space-y-5 text-[15px] leading-[1.7] text-muted-foreground">
              <p>Tabber is a CPA-led bookkeeping and financial management practice serving Ontario families and small businesses. We provide accurate, organized, and compliant bookkeeping, payroll, and reporting support — particularly in environments where administrative requirements can quickly become overwhelming.</p>
              <p>Our approach was shaped by firsthand experience supporting families navigating Family-Managed Home Care (FMHC), where financial administration is essential but often difficult to manage alongside caregiving. That same focus on clarity, structure, and reliability extends to all of the work we do.</p>
              <div className="rounded-lg border-l-4 bg-card p-6 my-6" style={{ borderColor: '#2B4C7E' }}>
                <p className="text-[16px] italic leading-[1.6] text-navy">"I saw firsthand how overwhelming FMHC administration can be for families, especially when their focus should be on caring for someone they love. Too often, financial tracking and reporting become an added burden during already difficult moments.</p>
                <p className="text-[16px] italic leading-[1.6] text-navy mt-3">Tabber was created to bring clarity, structure, and peace of mind so families don't have to navigate these requirements alone."</p>
                <p className="mt-4 text-sm font-semibold text-navy">— Faysal El Masri, CPA</p>
                <p className="text-xs text-muted-foreground">Founder, Tabber</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="mb-10 text-center font-serif text-[26px] font-bold text-navy md:text-[32px]">Credentials & Qualifications</h2>
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

        <section className="bg-secondary py-12 md:py-16">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="mb-10 text-center font-serif text-[26px] font-bold text-navy md:text-[32px]">Our Approach</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <h3 className="mb-2 font-serif text-[20px] font-semibold text-navy">{value.title}</h3>
                  <p className="mx-auto max-w-[280px] text-sm leading-[1.65] text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16" style={{ backgroundColor: '#E8EDF5' }}>
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
