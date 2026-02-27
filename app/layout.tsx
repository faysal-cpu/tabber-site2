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

export const metadata: Metadata = {
  title: 'Tabber | CPA-Qualified Bookkeeping Services',
  description: 'Professional bookkeeping, payroll, and financial reporting for small businesses and family-managed care programs across Ontario.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Tabber | CPA-Qualified Bookkeeping Services',
    description: 'Professional bookkeeping, payroll, and financial reporting for small businesses and family-managed care programs across Ontario.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tabber - CPA-Qualified Bookkeeping Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tabber | CPA-Qualified Bookkeeping Services',
    description: 'Professional bookkeeping, payroll, and financial reporting for small businesses and family-managed care programs across Ontario.',
    images: ['/og-image.png'],
  },
}
