import type { Metadata } from "next"

const siteUrl = "https://tabber.ca"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Choosing Your FMHC Care Arrangement | Tabber",
  description: "Compare the three options for hiring care under Ontario's Family-Managed Home Care program — agency, independent contractor, or direct employee. A practical decision guide from Tabber.",
  keywords: ["FMHC employment options", "agency vs direct hire self-directed care Ontario", "Family-Managed Home Care contractor vs employee", "FMHC care arrangement"],

  authors: [{ name: "Faysal El Masri, CPA" }, { name: "Tabber" }],

  alternates: {
    canonical: `${siteUrl}/resources/care-arrangement-guide`,
  },

  openGraph: {
    type: "article",
    url: `${siteUrl}/resources/care-arrangement-guide`,
    title: "Choosing Your FMHC Care Arrangement",
    description: "Compare the three options for hiring care under Ontario's Family-Managed Home Care program. Interactive decision guide included.",
    siteName: "Tabber",
    images: [
      {
        url: "/images/care-arrangement-guide.png",
        width: 1200,
        height: 630,
        alt: "FMHC Care Arrangement Decision Guide",
      },
    ],
    locale: "en_CA",
    publishedTime: "2026-06-09T00:00:00Z",
    modifiedTime: "2026-06-09T00:00:00Z",
    authors: ["Faysal El Masri, CPA"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Choosing Your FMHC Care Arrangement",
    description: "Compare the three options for hiring care under Ontario's Family-Managed Home Care program. Interactive decision guide included.",
    images: ["/images/care-arrangement-guide.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function CareArrangementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
