"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState, useEffect } from "react"

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/fmhc", label: "FMHC" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-card transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          {/* Refined Ledger Columns - 100%, 85%, 65% height ratios */}
          <div className="flex items-end" style={{ gap: '2px' }}>
            <div style={{ height: '24px', width: '5px', backgroundColor: '#2B4C7E', borderRadius: '5px' }} />
            <div style={{ height: '20px', width: '5px', backgroundColor: '#2B4C7E', borderRadius: '5px' }} />
            <div style={{ height: '16px', width: '5px', backgroundColor: '#2B4C7E', borderRadius: '5px' }} />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-serif text-[24px] font-bold tracking-tight text-navy leading-none">
              tabber
            </span>
            <span className="text-[10px] tracking-[0.08em] text-muted-foreground mt-0.5">
              Bookkeeping | Compliance | Advisory
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[14px] font-medium text-navy transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-brand after:transition-all after:duration-200 hover:text-brand hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            className="rounded-lg px-5 py-2.5 text-[14px] font-bold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            style={{ backgroundColor: '#2B4C7E' }}
          >
            <Link href="/contact">Book a Call</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-5 text-navy" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-card">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="mb-6 mt-4 flex items-center gap-2">
              {/* Mobile Refined Ledger Columns */}
              <div className="flex items-end" style={{ gap: '2px' }}>
                <div style={{ height: '20px', width: '4px', backgroundColor: '#2B4C7E', borderRadius: '4px' }} />
                <div style={{ height: '17px', width: '4px', backgroundColor: '#2B4C7E', borderRadius: '4px' }} />
                <div style={{ height: '13px', width: '4px', backgroundColor: '#2B4C7E', borderRadius: '4px' }} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-serif text-xl font-bold text-navy leading-none">tabber</span>
                <p className="text-[9px] tracking-[0.08em] text-muted-foreground mt-0.5">
                  Bookkeeping | Compliance | Advisory
                </p>
              </div>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-base font-medium text-navy transition-colors hover:bg-secondary hover:text-brand"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 border-t border-border pt-4">
                <Button
                  asChild
                  className="w-full rounded-lg text-[14px] font-bold text-white shadow-md"
                  style={{ backgroundColor: '#2B4C7E' }}
                >
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Book a Call
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
