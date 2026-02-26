import Link from "next/link"
import { Home, Briefcase, ArrowRight } from "lucide-react"

const audiences = [
  {
    icon: Home,
    title: "Family-Managed Home Care",
    description:
      "Complete FMHC bookkeeping, payroll, and compliance reporting for families managing home care programs through Ontario Health atHome.",
    href: "/fmhc",
  },
  {
    icon: Briefcase,
    title: "Small Businesses",
    description:
      "Professional bookkeeping, payroll, and financial reporting for growing businesses. Accurate, compliant recordkeeping you can trust—freeing you to focus on operations and growth.",
    href: "/services",
  },
]

export function WhoWeServe() {
  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: '#FAF9F7' }}>
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-center font-serif text-[28px] font-bold tracking-tight text-navy md:text-[36px]">
          Who We Serve
        </h2>
        <p className="mx-auto mt-3 mb-10 max-w-[600px] text-center text-[15px] text-navy/70">
          Specialized bookkeeping for Ontario families and small businesses.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {audiences.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="group rounded-xl border bg-card p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: '#D8D4CC', borderLeftWidth: '3px', borderLeftColor: '#2B4C7E' }}
              >
                <Icon className="mb-4 size-10" style={{ color: '#2B4C7E' }} strokeWidth={1.5} />
                <h3 className="mb-2 font-serif text-[22px] font-bold leading-tight text-navy">
                  {item.title}
                </h3>
                <p className="mb-5 max-w-[400px] text-[15px] leading-[1.65] text-navy/70">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
                  style={{ color: '#2B4C7E' }}
                >
                  Learn More
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
