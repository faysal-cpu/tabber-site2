"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export function ContactFormEmbed() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      })
      setSubmitted(true)
    } catch (error) {
      console.error("Form submission error:", error)
      alert("There was an error submitting the form. Please try again.")
    }
  }

  if (submitted) {
    return (
      <div id="contact-form" className="flex flex-col items-center justify-center rounded-xl bg-card p-12 text-center shadow-sm border border-border">
        <div className="mb-3 flex size-14 items-center justify-center rounded-full" style={{ backgroundColor: '#E8EDF5' }}>
          <Send className="size-6" style={{ color: '#2B4C7E' }} />
        </div>
        <h3 className="font-serif text-xl font-bold text-navy">Message Sent</h3>
        <p className="mt-2 max-w-[380px] text-sm text-muted-foreground">
          Thank you for reaching out. We will get back to you within one business day.
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          className="mt-5 rounded-lg text-white"
          style={{ backgroundColor: '#2B4C7E' }}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form
      id="contact-form"
      name="care-arrangement-inquiry"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl bg-card p-8 shadow-sm border border-border"
    >
      <input type="hidden" name="form-name" value="care-arrangement-inquiry" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-navy">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-navy placeholder:text-muted-foreground/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-navy">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-navy placeholder:text-muted-foreground/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-navy">
          Phone <span className="font-normal text-muted-foreground">(Optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="(123) 456-7890"
          className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-navy placeholder:text-muted-foreground/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your situation..."
          className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-navy placeholder:text-muted-foreground/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand resize-none"
        />
      </div>
      <Button
        type="submit"
        className="w-full rounded-lg py-3 text-[15px] font-semibold text-white shadow-md hover:shadow-lg"
        style={{ backgroundColor: '#2B4C7E' }}
      >
        <Send className="mr-2 size-4" />
        Send Message
      </Button>
    </form>
  )
}
