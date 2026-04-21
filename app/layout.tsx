import type { Metadata, Viewport } from 'next'
import { Inter, Poppins, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { GoogleAnalytics } from '@/components/google-analytics'
const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const _poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

const _geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const siteUrl = 'https://tabber.ca'
const ogImage = '/tabber-og2.png'   // <-- your image in /public

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: 'Tabber | Financial Management & Compliance',
  description:
    'CPA‑led bookkeeping, payroll, and reporting for families navigating Ontario Health atHome's Family‑Managed Home Care (FMHC) program.',
  
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',

  // Open Graph (WhatsApp, FB, LinkedIn, Slack, iMessage)
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Tabber | Financial Management & Compliance',
    description:
      'CPA‑led bookkeeping, payroll, and reporting for families navigating Ontario Health atHome's Family‑Managed Home Care (FMHC) program.',
    siteName: 'Tabber',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Tabber — Bookkeeping | Compliance | Advisory',
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: 'summary_large_image',
    title: 'Tabber | Financial Management & Compliance',
    description:
      'CPA‑led bookkeeping, payroll, and reporting for families navigating Ontario Health atHome's Family‑Managed Home Care (FMHC) program.',
    images: [ogImage],
  },
}

export const viewport: Viewport = {
  themeColor: '#2B4C7E',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${_inter.variable} ${_poppins.variable} ${_geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
