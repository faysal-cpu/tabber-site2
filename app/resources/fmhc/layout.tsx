import type { Metadata } from 'next'

const siteUrl = 'https://tabber.ca'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: 'FMHC Guide | Family-Managed Home Care Resources | Tabber',
  description:
    'Comprehensive guide to Ontario\'s Family-Managed Home Care (FMHC) program. Learn about eligibility, application process, responsibilities, reporting requirements, and how to manage your SDC agreement.',

  keywords: [
    'FMHC guide',
    'Family-Managed Home Care guide',
    'FMHC resources',
    'Self-Directed Care Ontario',
    'FMHC eligibility',
    'FMHC application process',
    'Ontario Health atHome FMHC',
    'FMHC reporting requirements',
    'FMHC bookkeeper requirements',
    'Schedule O requirements',
    'SDC agreement Ontario',
    'FMHC monthly reporting',
  ],

  authors: [{ name: 'Tabber' }],

  alternates: {
    canonical: `${siteUrl}/resources/fmhc`,
  },

  openGraph: {
    type: 'article',
    url: `${siteUrl}/resources/fmhc`,
    title: 'FMHC Guide | Family-Managed Home Care Resources',
    description:
      'Comprehensive guide to Ontario\'s Family-Managed Home Care (FMHC) program. Learn about eligibility, application, responsibilities, and reporting requirements.',
    siteName: 'Tabber',
    images: [
      {
        url: '/images/fmhc-hero-woman.jpg',
        width: 1200,
        height: 630,
        alt: 'FMHC Guide - Family-Managed Home Care Resources',
      },
    ],
    locale: 'en_CA',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'FMHC Guide | Family-Managed Home Care Resources',
    description:
      'Comprehensive guide to Ontario\'s Family-Managed Home Care program. Eligibility, application, responsibilities, and reporting requirements.',
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
}

export default function FmhcResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
