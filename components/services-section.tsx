import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Calculator,
  BarChart3,
  ShieldCheck,
  TrendingUp,
  Settings,
  ArrowRight,
} from "lucide-react"

const services = [
  {
    icon: Calculator,
    title: "Bookkeeping & Payroll",
    description:
      "Monthly reconciliation, payroll processing, T4/T4A preparation, CRA filings, and organized recordkeeping.",
  },
  {
    icon: BarChart3,
    title: "Financial Reporting",
    description:
      "Monthly financial statements, budget vs. actual tracking, cash flow reporting, and year-end preparation.",
  },
  {
    icon: ShieldCheck,
    title: "Risk & Compliance",
    description:
      "Process reviews, documentation gap identification, and ongoing attention to CRA compliance deadlines.",
  },
  {
    icon: TrendingUp,
    title: "Analytics & Insights",
    description:
      "Monthly trend explanations, expense analysis, and simple KPI tracking tailored to your needs.",
  },
  {
    icon: Settings,
    title: "Setup & Consulting",
    description:
      "QuickBooks or Xero setup, chart of accounts design, payroll system setup, and one-on-one guidance.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24" style={{ backgroundColor: '#F0EDE8' }}>
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-center font-serif text-[28px] font-bold tracking-tight text-navy md:text-[36px]">
          What We Do
        </h2>
        <p className="mx-auto mt-3 mb-14 max-w-[620px] text-center text-[15px] text-muted-foreground">
          Full-service bookkeeping support for your business or care program
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group rounded-xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg" style={{ backgroundColor: '#E8EDF5' }}>
                  <Icon className="size-6" style={{ color: '#2B4C7E' }} strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-serif text-[19px] font-bold text-navy">
                  {service.title}
                </h3>
                <p className="max-w-[280px] text-sm leading-[1.65] text-navy/70">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
        <div className="mt-14 text-center">
          <Button
            asChild
            className="rounded-lg px-8 py-3 text-[14px] font-bold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            style={{ backgroundColor: '#2B4C7E' }}
          >
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
