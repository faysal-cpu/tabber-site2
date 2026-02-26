"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Mail, Calendar, Clock, FileSearch, MessageSquare, Send } from "lucide-react"
import { useState } from "react"

const contactMethods = [
  { icon: Mail, title: "Email Us", description: "hello@tabber.ca", href: "mailto:hello@tabber.ca", cta: "Send Email" },
  { icon: Calendar, title: "Book a Call", description: "Free 15-minute consultation", href: "mailto:hello@tabber.ca?subject=Booking%20a%20Call", cta: "Schedule Now" },
  { icon: Clock, title: "Response Time", description: "Within 24 hours", href: null, cta: null },
]

const nextSteps = [
  { num: "1", icon: MessageSquare, title: "We Review Your Inquiry", description: "We read through your message and gather any additional information needed." },
  { num: "2", icon: Calendar, title: "Schedule a Consultation", description: "We set up a free 15-minute call to discuss your needs in detail." },
  { num: "3", icon: FileSearch, title: "Custom Proposal", description: "You receive a clear, detailed proposal tailored to your specific requirements." },
]

const serviceOptions = ["Bookkeeping & Payroll", "Financial Reporting", "FMHC Bookkeeping", "Risk & Compliance", "Setup & Consulting", "Other"]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-[800px] px-6 text-center">
            <h1 className="font-serif text-[34px] font-bold leading-[1.2] text-navy md:text-[44px]">Get in Touch</h1>
            <p className="mt-3 text-[16px] leading-[1.65] text-muted-foreground">{"We're here to help. Reach out and we'll get back to you within 24 hours."}</p>
          </div>
        </section>

        <section className="bg-secondary py-12 md:py-16">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 md:flex-row md:gap-12">
            <div className="md:flex-[0.6]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center rounded-xl bg-card p-12 text-center shadow-sm">
                  <div className="mb-3 flex size-14 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                    <Send className="size-6" style={{ color: '#2B4C7E' }} />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-navy">Message Sent</h2>
                  <p className="mt-2 max-w-[380px] text-sm text-muted-foreground">Thank you for reaching out. We will get back to you within 24 hours.</p>
                  <Button onClick={() => setSubmitted(false)} className="mt-5 rounded-lg bg-navy text-white hover:bg-navy-light">Send Another Message</Button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
                  className="flex flex-col gap-4 rounded-xl bg-card p-8 shadow-sm"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-sm font-medium text-navy">Name</label>
                      <input id="name" type="text" required placeholder="Your full name" className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-navy placeholder:text-muted-foreground/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-sm font-medium text-navy">Email</label>
                      <input id="email" type="email" required placeholder="you@example.com" className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-navy placeholder:text-muted-foreground/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-medium text-navy">Phone <span className="text-sm font-normal text-muted-foreground">(optional)</span></label>
                    <input id="phone" type="tel" placeholder="(555) 000-0000" className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-navy placeholder:text-muted-foreground/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="service" className="text-sm font-medium text-navy">Service Interest</label>
                    <select id="service" required defaultValue="" className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-navy focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand">
                      <option value="" disabled>Select a service</option>
                      {serviceOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-sm font-medium text-navy">Message</label>
                    <textarea id="message" rows={4} required placeholder="Tell us about your bookkeeping needs..." className="resize-none rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-navy placeholder:text-muted-foreground/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                  </div>
                  <Button type="submit" className="mt-1 w-full rounded-lg py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg" style={{ backgroundColor: '#2B4C7E' }}>Send Message</Button>
                </form>
              )}
            </div>

            <div className="flex flex-col gap-3 md:flex-[0.4]">
              {contactMethods.map((method) => {
                const Icon = method.icon
                return (
                  <div key={method.title} className="flex items-center gap-4 rounded-xl bg-card p-5 shadow-sm">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                      <Icon className="size-5" style={{ color: '#2B4C7E' }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-serif text-[15px] font-semibold text-navy">{method.title}</h3>
                      {method.href ? (
                        <a href={method.href} className="text-sm hover:underline" style={{ color: '#2B4C7E' }}>{method.description}</a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      )}
                    </div>
                  </div>
                )
              })}
              <div className="rounded-xl p-6 text-white" style={{ backgroundColor: '#1A2A44' }}>
                <h3 className="font-serif text-base font-semibold">Office Hours</h3>
                <div className="mt-2 space-y-1 text-sm text-white/70">
                  <p>Monday - Friday: 9 AM - 5 PM EST</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="mb-10 text-center font-serif text-[24px] font-bold text-navy md:text-[30px]">What Happens Next</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {nextSteps.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.num} className="relative rounded-xl bg-secondary p-6 text-center">
                    <span className="absolute left-5 top-3 font-serif text-[36px] font-bold" style={{ color: 'rgba(43,76,126,0.1)' }}>{step.num}</span>
                    <div className="relative">
                      <div className="mx-auto mb-4 flex size-11 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
                        <Icon className="size-5" style={{ color: '#2B4C7E' }} />
                      </div>
                      <h3 className="mb-1.5 font-serif text-[17px] font-semibold text-navy">{step.title}</h3>
                      <p className="mx-auto max-w-[260px] text-sm leading-[1.65] text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
