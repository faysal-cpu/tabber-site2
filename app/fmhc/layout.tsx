import type { Metadata } from 'next'

const siteUrl = 'https://tabber.ca'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: 'FMHC Bookkeeper Ontario | Family-Managed Home Care Bookkeeping Services',
  description:
    'Expert FMHC bookkeeper for Ontario families. CPA-led Family-Managed Home Care bookkeeping, payroll, and Ontario Health atHome compliance reporting. Covered by program funding - no cost to families.',

  keywords: [
    'FMHC bookkeeper',
    'FMHC bookkeeping',
    'Family-Managed Home Care bookkeeper',
    'Family-Managed Home Care bookkeeping',
    'FMHC bookkeeping Ontario',
    'FMHC bookkeeper Ontario',
    'Ontario Health atHome bookkeeping',
    'FMHC payroll services',
    'FMHC compliance reporting',
    'Family-Managed Home Care payroll',
    'CPA FMHC bookkeeper',
    'Schedule O bookkeeper',
    'home care bookkeeping Ontario',
  ],

  authors: [{ name: 'Tabber' }],

  alternates: {
    canonical: `${siteUrl}/fmhc`,
  },

  openGraph: {
    type: 'website',
    url: `${siteUrl}/fmhc`,
    title: 'FMHC Bookkeeper Ontario | Family-Managed Home Care Bookkeeping',
    description:
      'Expert FMHC bookkeeper for Ontario families. CPA-led Family-Managed Home Care bookkeeping, payroll, and compliance reporting. Covered by program funding.',
    siteName: 'Tabber',
    images: [
      {
        url: '/images/fmhc-hero-woman.jpg',
        width: 1200,
        height: 630,
        alt: 'FMHC Bookkeeper - Family-Managed Home Care Bookkeeping Services Ontario',
      },
    ],
    locale: 'en_CA',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'FMHC Bookkeeper Ontario | Family-Managed Home Care Bookkeeping',
    description:
      'Expert FMHC bookkeeper for Ontario families. CPA-led bookkeeping, payroll, and compliance reporting. Covered by program funding.',
    images: ['/images/fmhc-hero-woman.jpg'],
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

  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
}

export default function FmhcLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
