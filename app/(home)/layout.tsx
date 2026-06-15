import type { Metadata } from 'next'

const siteUrl = 'https://tabber.ca'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: 'Tabber | FMHC Bookkeeper Ontario | Family-Managed Home Care Bookkeeping',
  description:
    'Expert FMHC bookkeeper for Ontario families. CPA-led Family-Managed Home Care bookkeeping, payroll, and compliance reporting. Fully covered by Ontario Health atHome program funding - no cost to families.',

  keywords: [
    'FMHC bookkeeper Ontario',
    'Family-Managed Home Care bookkeeper',
    'FMHC bookkeeping',
    'Family-Managed Home Care bookkeeping',
    'Ontario Health atHome bookkeeper',
    'Self-Directed Care bookkeeper',
    'SDC bookkeeper Ontario',
    'FMHC payroll services',
    'FMHC compliance reporting',
    'Schedule O bookkeeper',
    'CPA FMHC bookkeeper',
    'home care bookkeeping Ontario',
    'FMHC financial management',
    'Ontario FMHC bookkeeper',
    'bookkeeper for FMHC',
    'FMHC bookkeeping services',
  ],

  authors: [{ name: 'Faysal El Masri, CPA' }, { name: 'Tabber' }],

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'FMHC Bookkeeper Ontario | Family-Managed Home Care Bookkeeping',
    description:
      'Expert FMHC bookkeeper for Ontario families. CPA-led bookkeeping, payroll, and compliance reporting for Family-Managed Home Care. Fully covered by program funding.',
    siteName: 'Tabber',
    images: [
      {
        url: '/tabber-og2.png',
        width: 1200,
        height: 630,
        alt: 'Tabber — FMHC Bookkeeper Ontario',
      },
    ],
    locale: 'en_CA',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'FMHC Bookkeeper Ontario | Family-Managed Home Care Bookkeeping',
    description:
      'Expert FMHC bookkeeper for Ontario families. CPA-led bookkeeping, payroll, and compliance reporting. Fully covered by program funding.',
    images: ['/tabber-og2.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
