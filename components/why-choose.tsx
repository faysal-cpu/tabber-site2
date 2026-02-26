import { Award, Heart, Shield, DollarSign } from "lucide-react"

const reasons = [
  {
    icon: Award,
    title: "CPA-Qualified Expertise",
    description:
      "Professional accounting standards applied to every client. Accurate, compliant, and reliable financial recordkeeping.",
  },
  {
    icon: Heart,
    title: "FMHC Specialist",
    description:
      "Deep expertise in Family-Managed Home Care bookkeeping and Ontario Health atHome compliance requirements.",
  },
  {
    icon: Shield,
    title: "Fully Insured & Credentialed",
    description:
      "Professional liability coverage and all required credentials. Your financial operations are protected.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "Clear, straightforward pricing with no hidden fees. FMHC services typically covered within funding allocation.",
  },
]

export function WhyChoose() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-center font-serif text-[28px] font-bold tracking-tight text-navy md:text-[36px]">
          Why Choose Tabber
        </h2>
        <p className="mx-auto mt-3 mb-12 text-center text-[15px] text-muted-foreground">
          Expert credentials. Personal attention.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <div
                key={reason.title}
                className="group flex items-start gap-4 rounded-xl border bg-card p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{ borderColor: '#D8D4CC' }}
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: '#E8EDF5' }}>
                  <Icon className="size-6" style={{ color: '#2B4C7E' }} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="mb-1.5 font-serif text-[18px] font-bold text-navy">
                    {reason.title}
                  </h3>
                  <p className="max-w-[360px] text-sm leading-[1.65] text-navy/70">
                    {reason.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
