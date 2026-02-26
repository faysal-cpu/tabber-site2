import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Terms of Service | Tabber",
  description: "Terms of service for Tabber professional bookkeeping services.",
}

const sections = [
  {
    title: "1. Services",
    content:
      "Tabber provides professional bookkeeping, payroll processing, financial reporting, and related financial management services as agreed upon in your service engagement. The scope of services will be outlined in your individual service agreement.",
  },
  {
    title: "2. Client Responsibilities",
    content:
      "Clients are responsible for providing accurate and timely financial information, maintaining access to required accounts and systems, and communicating any changes that may affect the scope of services.",
  },
  {
    title: "3. Confidentiality",
    content:
      "All client financial information is treated as strictly confidential. We will not disclose your information to any third party without your consent, except as required by law or professional regulations.",
  },
  {
    title: "4. Limitation of Liability",
    content:
      "Tabber provides bookkeeping services with professional care and due diligence. Our liability is limited to the fees paid for the specific services in question. We are not responsible for decisions made based on the financial information we prepare.",
  },
  {
    title: "5. Payment Terms",
    content:
      "Fees are billed monthly unless otherwise agreed. Payment is due within 30 days of invoice date. Late payments may be subject to interest charges as outlined in your service agreement.",
  },
  {
    title: "6. Termination",
    content:
      "Either party may terminate the service agreement with 30 days written notice. Upon termination, all outstanding fees become due and all client records and data will be returned or made accessible.",
  },
  {
    title: "7. Governing Law",
    content:
      "These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.",
  },
  {
    title: "8. Contact",
    content:
      "For questions about these terms, contact us at hello@tabber.ca.",
  },
]

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-[800px] px-6">
            <p className="mb-3 text-sm text-muted-foreground">Last updated: February 2026</p>
            <h1 className="font-serif text-[30px] font-bold text-navy md:text-[36px]">
              Terms of Service
            </h1>
            <div className="mt-8 flex flex-col gap-6">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="mb-2 font-serif text-[18px] font-semibold text-navy">
                    {section.title}
                  </h2>
                  <p className="text-sm leading-[1.7] text-muted-foreground">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
