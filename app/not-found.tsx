import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, FileText, Mail } from "lucide-react"
import Link from "next/link"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Tabber',
  description: 'The page you are looking for does not exist.',
}

const helpLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: FileText },
  { href: "/contact", label: "Contact", icon: Mail },
]

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-[100px] font-bold leading-none" style={{ color: '#2B4C7E' }}>404</p>
        <h1 className="mt-3 font-serif text-[30px] font-bold text-navy">Page Not Found</h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          The page you are looking for does not exist or has been moved. Try one of these pages instead.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {helpLinks.map((link) => {
            const Icon = link.icon
            return (
              <Button key={link.href} asChild variant="outline" className="rounded-lg border-border text-navy" style={{ borderColor: '#D8D4CC' }}>
                <Link href={link.href}><Icon className="size-4" />{link.label}</Link>
              </Button>
            )
          })}
        </div>
        <Button asChild className="mt-4 rounded-lg text-white shadow-md hover:shadow-lg" style={{ backgroundColor: '#2B4C7E' }}>
          <Link href="/"><ArrowLeft className="size-4" />Back to Home</Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  )
}
