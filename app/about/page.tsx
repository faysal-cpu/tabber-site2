import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Award, Shield, FileCheck, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "About | Tabber",
  description: "CPA-qualified bookkeeping professional serving Ontario families and small businesses with accuracy, transparency, and personalized service.",
}

const credentials = [
  { icon: Award, title: "CPA Designation", description: "Chartered Professional Accountant qualification ensuring the highest standards of financial accuracy and ethics." },
  { icon: Shield, title: "Professional Insurance", description: "Full professional liability coverage protecting your financial operations and giving you peace of mind." },
  { icon: FileCheck, title: "FMHC Certified", description: "Specialized training and ongoing education in Ontario Health atHome FMHC program requirements and compliance." },
  { icon: Users, title: "CPA Ontario Member", description: "Active member of CPA Ontario with continuing professional development and adherence to professional standards." },
]

const values = [
  { title: "Accuracy", description: "Every transaction is recorded correctly. Every report is verified. Your financial data is reliable." },
  { title: "Transparency", description: "Clear communication, straightforward pricing, and no surprises. You always know where things stand." },
  { title: "Personalized Service", description: "Your business is unique. We tailor our approach to fit your specific needs and goals." },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-[800px] px-6 text-center">
            <h1 className="font-serif text-[34px] font-bold leading-[1.2] text-navy md:text-[44px]">About Tabber</h1>
            <p className="mt-3 text-[16px] leading-[1.65] text-muted-foreground">CPA-qualified financial management built on accuracy, transparency, and personalized service.</p>
          </div>
        </section>

        <section className="bg-secondary py-12 md:py-16">
          <div className="mx-auto max-w-[800px] px-6">
            <div className="space-y-5 text-[15px] leading-[1.7] text-muted-foreground">
              <p>Tabber was founded with a simple belief: every family and small business deserves accurate, professional financial management -- without the complexity or cost of a large accounting firm.</p>
              <p className="text-[18px] font-medium leading-[1.5]" style={{ color: '#2B4C7E' }}>{`"I saw too many FMHC families struggling with compliance and reporting requirements that distracted them from what really mattered -- caring for their loved ones."`}</p>
              <p>With CPA qualifications and deep expertise in both small business bookkeeping and Family-Managed Home Care programs, Tabber delivers the precision of a professional firm with the attentiveness of a dedicated partner.</p>
              <p>Based in Ontario, Tabber serves families and businesses across the province, providing remote bookkeeping services that are timely, accurate, and always compliant.</p>
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

        <section className="py-12 md:py-16" style={{ backgroundColor: '#1A2A44' }}>
          <div className="mx-auto max-w-[700px] px-6 text-center">
            <h2 className="font-serif text-[28px] font-bold text-white md:text-[34px]">Ready to Work Together?</h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-white/85">Book a free consultation and see how Tabber can simplify your financial management.</p>
            <Button asChild className="mt-6 rounded-lg bg-white px-8 py-3 text-[15px] font-semibold text-navy hover:shadow-lg">
              <Link href="/contact">Book Free Consultation</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
