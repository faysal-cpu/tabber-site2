import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "I used to dread sorting through our FMHC expenses every month. Tabber took that whole task off my hands without having to pay anything out of pocket. Everything's clear and handled properly now.",
    name: "Sarah M.",
    role: "Substitute Decision-Maker",
    initials: "SM",
  },
  {
    quote:
      "Tabber has been dependable and straightforward to work with. Our books stay organized, our filings are handled properly, and everything stays on track so we can focus on running the business.",
    name: "David L.",
    role: "Small Business Owner",
    initials: "DL",
  },
  {
    quote:
      "It's been helpful working with someone who understands FMHC requirements. Our reporting and records stay organized, and everything gets done properly.",
    name: "Jennifer K.",
    role: "Primary Caregiver",
    initials: "JK",
  },
]

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-5" style={{ fill: '#2B4C7E', color: '#2B4C7E' }} />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24" style={{ backgroundColor: '#FAF9F7' }}>
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="mb-14 text-center font-serif text-[28px] font-bold tracking-tight text-navy md:text-[36px]">
          What Our Clients Say
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative rounded-xl border bg-card p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ borderColor: '#D8D4CC' }}
            >
              <Quote className="absolute right-6 top-6 size-12" style={{ color: 'rgba(26,54,93,0.1)' }} />
              <div className="relative flex flex-col gap-5">
                <Stars />
                <blockquote className="text-[15px] font-medium leading-[1.75] text-navy">
                  {`"${testimonial.quote}"`}
                </blockquote>
                <div className="mt-auto flex items-center gap-3 border-t pt-5" style={{ borderColor: '#D8D4CC' }}>
                  <div className="flex size-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: '#2B4C7E' }}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-navy">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-navy/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Serving 50+ families and businesses across Ontario
        </p>
      </div>
    </section>
  )
}
