import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WaveDivider } from "@/components/wave-divider"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink, BookOpen, Calculator, CheckSquare, FileCheck, Users, Building2, Youtube } from "lucide-react"

export const metadata: Metadata = {
  title: "Resources | Tabber",
  description: "Helpful resources, guides, and tools for FMHC families and small businesses. Download checklists, access external resources, and learn more about bookkeeping and financial management.",
}

const fmhcResources = [
  {
    icon: BookOpen,
    title: "Complete FMHC Guide",
    description: "Comprehensive guide covering eligibility, application process, responsibilities, reporting requirements, and common mistakes to avoid.",
    type: "Full Guide",
    link: "/resources/fmhc",
    isDownload: false,
    featured: true,
  },
  {
    icon: Download,
    title: "FMHC Bookkeeping Checklist",
    description: "Essential checklist for staying compliant with Ontario Health atHome requirements.",
    type: "PDF Download",
    link: "/downloads/FMHC_Bookkeeping_Checklist.pdf",
    isDownload: true,
  },
  {
    icon: FileText,
    title: "Monthly Reporting Template",
    description: "Template for organizing your monthly FMHC expenses and tracking your funding allocation.",
    type: "Coming Soon",
    link: "#",
    isDownload: false,
    comingSoon: true,
  },
]

const externalLinks = [
  {
    icon: Building2,
    title: "FMHC Official Page",
    description: "Ontario Health atHome's official Family-Managed Home Care program page",
    link: "https://ontariohealthathome.ca/home-care/family-managed-home-care/",
  },
  {
    icon: FileText,
    title: "FMHC Fact Sheet",
    description: "Official fact sheet for patients and families (PDF)",
    link: "https://www.ontariohealthathome.ca/blobohahprod4cd80afe1b/wp-content/uploads/2024/02/OHaH-Family-Managed-Home-Care-Fact-Sheet-EN.pdf",
  },
  {
    icon: FileCheck,
    title: "FMHC Process Guide",
    description: "Step-by-step process document for FMHC patients (PDF)",
    link: "https://www.ontariohealthathome.ca/blobohahprod4cd80afe1b/wp-content/uploads/2024/10/OHaH-Family-Managed-Home-Care-Process-Patient-EN.pdf",
  },
  {
    icon: Youtube,
    title: "FMHC Video Tutorials",
    description: "Official Ontario Health atHome instructional video playlist",
    link: "https://www.youtube.com/playlist?list=PLBiwj7dQ3f5tfq6KyeTTLJg8kcK3O3f2H",
  },
]

export default function ResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-card py-10 md:py-12">
          <div className="mx-auto max-w-[800px] px-6 text-center">
            <h1 className="font-serif text-[34px] font-bold leading-[1.2] text-navy md:text-[44px]">Resources</h1>
            <p className="mt-4 text-[15px] leading-[1.7] text-muted-foreground">
              Helpful guides, tools, and external resources to support your financial management needs.
            </p>
          </div>
        </section>

        <WaveDivider fillColor="#FFFFFF" backgroundColor="#F0EDE8" />

        {/* FMHC Resources Section */}
        <section className="bg-secondary py-10 md:py-14">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#E8EDF5' }}>
                <BookOpen className="size-5" style={{ color: '#2B4C7E' }} />
              </div>
              <div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">FMHC Resources</h2>
                <p className="text-sm text-muted-foreground">Tools and guides for Family-Managed Home Care families</p>
              </div>
            </div>

            {/* Guides & Resources */}
            <div className="mb-10">
              <h3 className="mb-4 font-serif text-[20px] font-semibold text-navy">Guides & Resources</h3>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {fmhcResources.map((resource) => {
                  const Icon = resource.icon
                  return (
                    <div
                      key={resource.title}
                      className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-md"
                      style={{ borderLeftWidth: '3px', borderLeftColor: '#2B4C7E' }}
                    >
                      <div>
                        <div className="mb-3 flex size-11 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                          <Icon className="size-5" style={{ color: '#2B4C7E' }} />
                        </div>
                        <h4 className="mb-2 font-serif text-[17px] font-semibold text-navy">{resource.title}</h4>
                        <p className="mb-3 text-sm leading-[1.65] text-muted-foreground">{resource.description}</p>
                        <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-navy">
                          {resource.type}
                        </span>
                      </div>
                      {!resource.comingSoon ? (
                        resource.featured ? (
                          <Link href={resource.link} className="mt-4">
                            <Button
                              className="w-full gap-2 rounded-lg px-4 text-white transition-all duration-200"
                              style={{ backgroundColor: '#2B4C7E' }}
                            >
                              <BookOpen className="size-4" />
                              Read Guide
                            </Button>
                          </Link>
                        ) : (
                          <Link href={resource.link} download={resource.isDownload} target="_blank" className="mt-4">
                            <Button
                              variant="outline"
                              className="w-full gap-2 rounded-lg border-2 border-[#2B4C7E] px-4 text-[#2B4C7E] bg-transparent hover:bg-[#2B4C7E] hover:text-white transition-all duration-200"
                            >
                              <Download className="size-4" />
                              Download
                            </Button>
                          </Link>
                        )
                      ) : (
                        <Button
                          variant="outline"
                          disabled
                          className="mt-4 w-full rounded-lg border-2 border-gray-300 px-4 text-gray-400 cursor-not-allowed"
                        >
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* External Links */}
            <div>
              <h3 className="mb-4 font-serif text-[20px] font-semibold text-navy">Helpful External Links</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {externalLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.title}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:border-[#2B4C7E]"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                        <Icon className="size-5" style={{ color: '#2B4C7E' }} />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h4 className="font-serif text-[16px] font-semibold text-navy group-hover:text-[#2B4C7E] transition-colors">
                            {link.title}
                          </h4>
                          <ExternalLink className="size-3.5 text-muted-foreground" />
                        </div>
                        <p className="text-sm leading-[1.6] text-muted-foreground">{link.description}</p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Placeholder for Future Resources */}
        {/* Uncomment and customize when adding new resource categories */}
        {/*
        <section className="bg-card py-10 md:py-14">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#E8EDF5' }}>
                <Building2 className="size-5" style={{ color: '#2B4C7E' }} />
              </div>
              <div>
                <h2 className="font-serif text-[26px] font-bold text-navy md:text-[32px]">Small Business Resources</h2>
                <p className="text-sm text-muted-foreground">Coming soon...</p>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* CTA Section */}
        <section className="py-10 md:py-14" style={{ backgroundColor: '#E8EDF5' }}>
          <div className="mx-auto max-w-[700px] px-6 text-center">
            <h2 className="font-serif text-[28px] font-bold text-navy md:text-[34px]">Need More Help?</h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-navy/80">
              Can't find what you're looking for? Get in touch and we'll be happy to help.
            </p>
            <Button
              asChild
              className="mt-6 rounded-lg px-8 py-3 text-[15px] font-semibold text-white shadow-md hover:shadow-lg"
              style={{ backgroundColor: '#2B4C7E' }}
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
