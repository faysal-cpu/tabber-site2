import type { Metadata } from 'next'

const siteUrl = 'https://tabber.ca'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: 'FMHC Guide 2026: Complete Family-Managed Home Care Guide for Ontario | Tabber',
  description:
    'Complete FMHC guide for Ontario families 2026. Learn about Family-Managed Home Care (FMHC) eligibility, application process, bookkeeper requirements, monthly reporting, Schedule O requirements, and how to successfully manage your FMHC program with Ontario Health atHome.',

  keywords: [
    'FMHC',
    'FMHC guide',
    'FMHC Ontario',
    'FMHC guide 2026',
    'Family-Managed Home Care',
    'Family-Managed Home Care Ontario',
    'Family-Managed Home Care guide',
    'FMHC guide Ontario',
    'FMHC 2026',
    'Self-Directed Care',
    'Self-Directed Care Ontario',
    'SDC Ontario',
    'SDC program Ontario',
    'FMHC eligibility',
    'FMHC eligibility Ontario',
    'FMHC application',
    'FMHC application process',
    'how to apply for FMHC',
    'Ontario Health atHome FMHC',
    'Ontario Health atHome Family-Managed Home Care',
    'FMHC reporting',
    'FMHC monthly reporting',
    'FMHC compliance',
    'FMHC bookkeeper',
    'FMHC bookkeeping',
    'FMHC bookkeeper requirements',
    'Schedule O requirements',
    'Schedule O bookkeeper',
    'FMHC requirements',
    'FMHC responsibilities',
    'SDC agreement',
    'FMHC program agreement',
    'family managed home care guide',
    'FMHC how to apply',
    'FMHC substitute decision maker',
    'FMHC SDM',
    'SDM requirements FMHC',
    'FMHC care arrangements',
    'FMHC direct hire',
    'FMHC agency',
    'FMHC contractor',
    'FMHC payroll',
    'FMHC expenses',
    'eligible expenses FMHC',
    'FMHC funding',
    'FMHC deadlines',
    'FMHC Schedule B',
    'FMHC Schedule G',
    'FMHC Schedule H',
  ],

  authors: [{ name: 'Faysal El Masri, CPA' }, { name: 'Tabber' }],

  alternates: {
    canonical: `${siteUrl}/resources/fmhc`,
  },

  openGraph: {
    type: 'article',
    url: `${siteUrl}/resources/fmhc`,
    title: 'Complete FMHC Guide for Ontario Families 2026 - Family-Managed Home Care',
    description:
      'Complete guide to Family-Managed Home Care (FMHC) in Ontario. Learn about FMHC eligibility, application process, bookkeeper requirements, monthly reporting, and how to successfully manage your FMHC program.',
    siteName: 'Tabber',
    images: [
      {
        url: '/images/fmhc-resources.png',
        width: 1200,
        height: 630,
        alt: 'FMHC Guide - Complete Family-Managed Home Care Guide for Ontario 2026',
      },
    ],
    locale: 'en_CA',
    publishedTime: '2026-05-14T00:00:00Z',
    modifiedTime: '2026-05-14T00:00:00Z',
    authors: ['Faysal El Masri, CPA'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Complete FMHC Guide for Ontario Families 2026',
    description:
      'Complete guide to Family-Managed Home Care (FMHC) in Ontario. Everything you need to know about FMHC eligibility, application, bookkeeper requirements, and monthly reporting.',
    images: ['/images/fmhc-resources.png'],
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

export default function FmhcResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
