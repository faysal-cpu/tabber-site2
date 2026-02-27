import type { Metadata, Viewport } from 'next'
import { Inter, Poppins, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

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

  title: 'Tabber | Professional Bookkeeping & Compliance',
  description:
    'Professional bookkeeping, compliance, and financial reporting for small businesses and family-managed care programs across Ontario.',
  
  icons: {
    icon: '/tabber-icon.ico',
  },

  // Open Graph (WhatsApp, FB, LinkedIn, Slack, iMessage)
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Tabber | Professional Bookkeeping & Compliance',
    description:
      'Professional bookkeeping, compliance, and financial reporting for small businesses and family-managed care programs across Ontario.',
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
    title: 'Tabber | Professional Bookkeeping & Compliance',
    description:
      'Professional bookkeeping, compliance, and financial reporting for small businesses.',
    images: [ogImage],
  },
}

export const viewport: Viewport = {
  themeColor: '#1A2A44',
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
      </body>
    </html>
  )
}
