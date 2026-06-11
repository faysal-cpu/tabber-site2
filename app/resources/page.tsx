import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WaveDivider } from "@/components/wave-divider"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink, BookOpen, Calculator as CalcIcon, CheckSquare, FileCheck, Users, Building2, Youtube } from "lucide-react"

export const metadata: Metadata = {
  title: "Resources & Guides | Tabber",
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
    icon: Users,
    title: "Choosing Your FMHC Care Arrangement",
    description: "Compare agency, independent contractor, and direct hire models. Includes an interactive decision quiz to help you choose the right path.",
    type: "Decision Guide",
    link: "/resources/care-arrangement-guide",
    isDownload: false,
    featured: true,
  },
  {
    icon: CalcIcon,
    title: "FMHC Direct Hire Cost Calculator",
    description: "Calculate the true hourly cost of hiring a direct employee — wages plus employer CPP, EI, and WSIB. Confirm your offer fits within Schedule B.",
    type: "Calculator",
    link: "/resources/direct-hire-calculator",
    isDownload: false,
    featured: true,
  },
  {
    icon: Download,
    title: "Bookkeeping Checklist",
    description: "Essential checklist for staying compliant with Ontario Health atHome requirements.",
    type: "PDF Download",
    link: "/downloads/Tabber - FMHC Bookkeeping Checklist.pdf",
    isDownload: true,
  },
  {
    icon: Download,
    title: "Monthly Submission Checklist",
    description: "Step-by-step checklist for submitting your monthly FMHC financial report on time and staying compliant.",
    type: "PDF Download",
    link: "/downloads/Tabber - FMHC Monthly Submission Checklist.pdf",
    isDownload: true,
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
        {/* Hero Section with Background Image */}
        <section className="relative h-[350px] md:h-[380px] flex items-center justify-center px-6">
          <Image
            src="/images/Designer (8).png"
            alt="Resources & Guides for FMHC and Financial Management"
            fill
            className="object-cover"
            style={{ objectPosition: 'center' }}
            priority
          />
          <div className="absolute inset-0 bg-[#2B4C7E]/15" />

          {/* Bottom fade to blend with next section */}
          <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-b from-transparent to-[#F9FAFB]" />

          <div className="relative z-10 max-w-[800px] w-full p-6 md:p-10 rounded-2xl shadow-2xl text-center" style={{ backgroundColor: 'rgba(249, 250, 251, 0.95)', backdropFilter: 'blur(12px)' }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-md border-2" style={{ backgroundColor: '#F3F4F6', borderColor: '#2B4C7E', color: '#2B4C7E' }}>
              <BookOpen className="size-4" />
              <span className="text-sm font-semibold">Resources</span>
            </div>
            <h1 className="font-serif text-[30px] font-bold leading-[1.2] text-navy md:text-[36px] mb-3">
              Resources & Guides
            </h1>
            <p className="text-[15px] md:text-[16px] font-medium leading-[1.5]" style={{ color: '#2B4C7E' }}>
              Guides, tools, and resources to help you navigate FMHC with confidence.
            </p>
          </div>
        </section>

        {/* FMHC Resources Section */}
        <section className="py-10 md:py-14" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="mx-auto max-w-[1200px] px-6">
            {/* Guides */}
            <div className="mb-12">
              <div className="mb-6 border-b pb-4" style={{ borderColor: '#2B4C7E' }}>
                <h2 className="font-serif text-[28px] font-bold text-navy md:text-[34px]">Guides</h2>
                <p className="mt-1 text-sm text-muted-foreground">Comprehensive resources to help you navigate FMHC</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {fmhcResources.filter(r => r.type === 'Full Guide' || r.type === 'Decision Guide').map((resource) => {
                  const Icon = resource.icon
                  return (
                    <div
                      key={resource.title}
                      className="group flex flex-col justify-between rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg"
                    >
                      <div>
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex size-12 items-center justify-center rounded-lg" style={{ backgroundColor: '#E8EDF5' }}>
                            <Icon className="size-6" style={{ color: '#2B4C7E' }} />
                          </div>
                          <h3 className="font-serif text-[19px] font-semibold text-navy">{resource.title}</h3>
                        </div>
                        <p className="text-[15px] leading-[1.7] text-muted-foreground">{resource.description}</p>
                      </div>
                      <Link href={resource.link} className="mt-5">
                        <Button
                          className="w-full gap-2 rounded-lg px-4 py-5 text-white transition-all duration-200 group-hover:shadow-md"
                          style={{ backgroundColor: '#2B4C7E' }}
                        >
                          <BookOpen className="size-4" />
                          Read Guide
                        </Button>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Checklists */}
            <div id="checklists" className="mb-12 scroll-mt-20">
              <div className="mb-6 border-b pb-4" style={{ borderColor: '#2B4C7E' }}>
                <h2 className="font-serif text-[28px] font-bold text-navy md:text-[34px]">Checklists</h2>
                <p className="mt-1 text-sm text-muted-foreground">Downloadable checklists to keep you organized</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {fmhcResources.filter(r => r.type === 'PDF Download').map((resource) => {
                  const Icon = resource.icon
                  return (
                    <div
                      key={resource.title}
                      className="group flex flex-col justify-between rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg"
                    >
                      <div>
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex size-12 items-center justify-center rounded-lg" style={{ backgroundColor: '#E8EDF5' }}>
                            <Icon className="size-6" style={{ color: '#2B4C7E' }} />
                          </div>
                          <h3 className="font-serif text-[19px] font-semibold text-navy">{resource.title}</h3>
                        </div>
                        <p className="text-[15px] leading-[1.7] text-muted-foreground">{resource.description}</p>
                      </div>
                      <Link href={resource.link} download={resource.isDownload} target="_blank" className="mt-5">
                        <Button
                          variant="outline"
                          className="w-full gap-2 rounded-lg border-2 px-4 py-5 transition-all duration-200 group-hover:shadow-md"
                          style={{ borderColor: '#2B4C7E', color: '#2B4C7E' }}
                        >
                          <Download className="size-4" />
                          Download PDF
                        </Button>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Tools */}
            <div className="mb-12">
              <div className="mb-6 border-b pb-4" style={{ borderColor: '#2B4C7E' }}>
                <h2 className="font-serif text-[28px] font-bold text-navy md:text-[34px]">Tools</h2>
                <p className="mt-1 text-sm text-muted-foreground">Interactive calculators and planning tools</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {fmhcResources.filter(r => r.type === 'Calculator').map((resource) => {
                  const Icon = resource.icon
                  return (
                    <div
                      key={resource.title}
                      className="group flex flex-col justify-between rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg"
                    >
                      <div>
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex size-12 items-center justify-center rounded-lg" style={{ backgroundColor: '#E8EDF5' }}>
                            <Icon className="size-6" style={{ color: '#2B4C7E' }} />
                          </div>
                          <h3 className="font-serif text-[19px] font-semibold text-navy">{resource.title}</h3>
                        </div>
                        <p className="text-[15px] leading-[1.7] text-muted-foreground">{resource.description}</p>
                      </div>
                      <Link href={resource.link} className="mt-5">
                        <Button
                          className="w-full gap-2 rounded-lg px-4 py-5 text-white transition-all duration-200 group-hover:shadow-md"
                          style={{ backgroundColor: '#2B4C7E' }}
                        >
                          <CalcIcon className="size-4" />
                          Run Calculator
                        </Button>
                      </Link>
                    </div>
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
        <section className="bg-white py-10 md:py-14">
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
