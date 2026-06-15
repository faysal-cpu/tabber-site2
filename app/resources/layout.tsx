import type { Metadata } from 'next'

const siteUrl = 'https://tabber.ca'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: 'FMHC Resources & Guides | Family-Managed Home Care Tools | Tabber',
  description:
    'Free FMHC resources for Ontario families: Complete FMHC guide, direct hire cost calculator, care arrangement decision guide, and downloadable compliance checklists. Expert tools for Family-Managed Home Care success.',

  keywords: [
    'FMHC resources',
    'FMHC guide Ontario',
    'Family-Managed Home Care resources',
    'FMHC calculator',
    'FMHC tools',
    'FMHC checklists',
    'Ontario Health atHome resources',
    'FMHC bookkeeping guide',
    'self-directed care resources Ontario',
    'FMHC compliance checklist',
    'care arrangement guide FMHC',
  ],

  authors: [{ name: 'Faysal El Masri, CPA' }, { name: 'Tabber' }],

  alternates: {
    canonical: `${siteUrl}/resources`,
  },

  openGraph: {
    type: 'website',
    url: `${siteUrl}/resources`,
    title: 'FMHC Resources & Guides for Ontario Families | Tabber',
    description:
      'Free FMHC resources for Ontario families: Complete guide, direct hire calculator, care arrangement decision guide, and compliance checklists. Everything you need for Family-Managed Home Care success.',
    siteName: 'Tabber',
    images: [
      {
        url: `${siteUrl}/images/resources-hero.png`,
        width: 1200,
        height: 630,
        alt: 'FMHC Resources & Guides - Tabber',
      },
    ],
    locale: 'en_CA',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'FMHC Resources & Guides for Ontario Families',
    description:
      'Free FMHC resources: Complete guide, direct hire calculator, care arrangement decision guide, and compliance checklists for Family-Managed Home Care.',
    images: [`${siteUrl}/images/resources-hero.png`],
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

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
