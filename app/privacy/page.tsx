import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Tabber",
  description: "Tabber privacy policy describing how we collect, use, and protect your personal information.",
}

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly, such as your name, email address, phone number, and details about your bookkeeping needs when you contact us or use our services. We may also collect usage data about how you interact with our website.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use your information to provide and improve our bookkeeping services, communicate with you about your account, send relevant updates, and comply with legal obligations. We do not sell your personal information to third parties.",
  },
  {
    title: "3. Data Security",
    content:
      "We implement industry-standard security measures to protect your personal and financial information. All data is encrypted in transit and at rest. Access to client data is strictly limited to authorized personnel.",
  },
  {
    title: "4. Third-Party Services",
    content:
      "We may use third-party tools for accounting software (QuickBooks, Xero), communication, and website analytics. These services have their own privacy policies and we encourage you to review them.",
  },
  {
    title: "5. Data Retention",
    content:
      "We retain your personal information for as long as necessary to provide our services and comply with legal and regulatory requirements. Financial records are retained as required by Canadian tax law.",
  },
  {
    title: "6. Your Rights",
    content:
      "You have the right to access, correct, or delete your personal information. You may also opt out of non-essential communications at any time by contacting us at hello@tabber.ca.",
  },
  {
    title: "7. Changes to This Policy",
    content:
      "We may update this privacy policy from time to time. We will notify you of any material changes by posting the updated policy on this page with a revised effective date.",
  },
  {
    title: "8. Contact",
    content:
      "If you have questions about this privacy policy or our data practices, please contact us at hello@tabber.ca.",
  },
]

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-[800px] px-6">
            <p className="mb-3 text-sm text-muted-foreground">Last updated: February 2026</p>
            <h1 className="font-serif text-[30px] font-bold text-navy md:text-[36px]">
              Privacy Policy
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
