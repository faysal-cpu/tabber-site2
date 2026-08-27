import type { Metadata } from 'next'

const siteUrl = 'https://tabber.ca'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: 'FMHC Payroll Guide: CRA Remittances, WSIB & Direct Hire | Tabber',
  description:
    'Hiring a caregiver directly through FMHC? Learn how caregiver payroll, CRA remittances, vacation pay, WSIB, T4s, and Schedule B budgeting work in Ontario.',

  keywords: [
    'FMHC payroll',
    'FMHC CRA remittances',
    'FMHC WSIB',
    'FMHC direct hire payroll',
    'caregiver payroll Ontario',
    'hiring a caregiver as an employee Ontario',
    'CRA payroll account for caregiver',
    'FMHC Schedule B caregiver wage',
    'Ontario domestic worker WSIB',
  ],

  authors: [{ name: 'Faysal El Masri, CPA' }, { name: 'Tabber' }],

  alternates: {
    canonical: `${siteUrl}/resources/fmhc-direct-hire-payroll-guide`,
  },

  openGraph: {
    type: 'article',
    url: `${siteUrl}/resources/fmhc-direct-hire-payroll-guide`,
    title: 'FMHC Payroll Guide: CRA Remittances, WSIB & Direct Hire | Tabber',
    description:
      'Hiring a caregiver directly through FMHC? Learn how caregiver payroll, CRA remittances, vacation pay, WSIB, T4s, and Schedule B budgeting work in Ontario.',
    siteName: 'Tabber',
    images: [
      {
        url: `${siteUrl}/images/fmhc-payroll-guide.png`,
        width: 1512,
        height: 1040,
        alt: 'FMHC Direct-Hire Payroll Guide - Tabber',
      },
    ],
    locale: 'en_CA',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'FMHC Payroll Guide: CRA Remittances, WSIB & Direct Hire',
    description:
      'Hiring a caregiver directly through FMHC? Learn how caregiver payroll, CRA remittances, vacation pay, WSIB, T4s, and Schedule B budgeting work in Ontario.',
    images: [`${siteUrl}/images/fmhc-payroll-guide.png`],
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

export default function PayrollGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
