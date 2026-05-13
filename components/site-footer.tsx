import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, Facebook, Linkedin } from "lucide-react"

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/fmhc", label: "FMHC Bookkeeping" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/resources", label: "Resources & Guides" },
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
              alt="Tabber CPA bookkeeping services Ontario - FMHC specialist and small business accountant"
              width={570}
              height={76}
            />
            <p className="mt-2 max-w-[280px] text-sm leading-[1.7] text-white/50">
              Professional bookkeeping, payroll, and financial reporting for
              small businesses and family-managed care programs across Ontario.
            </p>
          </div>
          <div className="md:text-center">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              Quick Links
            </h3>
            <nav className="flex flex-col md:items-center gap-2.5" aria-label="Footer navigation">
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
          <div className="md:text-right">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              Get in Touch
            </h3>
            <div className="flex flex-col md:items-end gap-3">
              <a
                href="mailto:hello@tabber.ca"
                className="flex items-center gap-2 text-[14px] text-white/60 transition-colors hover:text-brand"
              >
                <Mail className="size-4 shrink-0" />
                hello@tabber.ca
              </a>
              <a
                href="tel:+16478720394"
                className="flex items-center gap-2 text-[14px] text-white/60 transition-colors hover:text-brand"
              >
                <Phone className="size-4 shrink-0" />
                (647) 872-0394
              </a>
              <div className="flex items-start gap-2 text-[14px] text-white/60">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>Serving Ontario</span>
              </div>
              <div className="mt-4 flex md:justify-end gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61582161815813"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition-all hover:bg-brand hover:text-white"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="size-4" />
                </a>
                <a
                  href="https://www.linkedin.com/company/tabberbookkeeping"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition-all hover:bg-brand hover:text-white"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="size-4" />
                </a>
                <a
                  href="https://wa.me/16478720394"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition-all hover:bg-brand hover:text-white"
                  aria-label="Chat with us on WhatsApp"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            2026 Tabber. Professional services through Tabber are provided by Faysal El Masri, CPA. All rights reserved.
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
