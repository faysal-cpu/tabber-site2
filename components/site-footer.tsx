import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin } from "lucide-react"

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/fmhc", label: "FMHC Bookkeeping" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
]

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 text-white" style={{ backgroundColor: '#1A2A44' }}>
      <div className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          <div className="flex flex-col gap-3">
            <Image
              src="/tabber-logo-full-white.svg"
              alt="Tabber - Bookkeeping, Compliance, Advisory"
              width={570}
              height={76}
            />
            <p className="mt-2 max-w-[280px] text-sm leading-[1.7] text-white/50">
              Professional bookkeeping, payroll, and financial reporting for
              small businesses and family-managed care programs across Ontario.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2.5" aria-label="Footer navigation">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[14px] text-white/60 transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@tabber.ca"
                className="flex items-center gap-2 text-[14px] text-white/60 transition-colors hover:text-brand"
              >
                <Mail className="size-4 shrink-0" />
                hello@tabber.ca
              </a>
              <div className="flex items-start gap-2 text-[14px] text-white/60">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>Serving Ontario</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            2026 Tabber Professional Services. All rights reserved.
          </p>
          <nav className="flex gap-6" aria-label="Legal">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-white/40 transition-colors hover:text-white/70"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
