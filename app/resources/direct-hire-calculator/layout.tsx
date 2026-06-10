import type { Metadata } from "next"

const siteUrl = "https://tabber.ca"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "FMHC Direct Hire Cost Calculator | Tabber",
  description: "Calculate the true hourly cost of hiring a direct employee under Ontario's Family-Managed Home Care program — wages plus employer CPP, EI, and WSIB costs. Confirm your offer fits within Schedule B.",
  keywords: [
    "FMHC direct hire calculator",
    "caregiver wage calculator Ontario",
    "FMHC employee cost calculator",
    "Schedule B rate calculator",
    "direct hire caregiver cost",
    "FMHC cost calculator",
    "direct hire cost Ontario",
    "employee cost calculator FMHC",
  ],

  authors: [{ name: "Faysal El Masri, CPA" }, { name: "Tabber" }],

  alternates: {
    canonical: `${siteUrl}/resources/direct-hire-calculator`,
  },

  openGraph: {
    type: "article",
    url: `${siteUrl}/resources/direct-hire-calculator`,
    title: "FMHC Direct Hire Cost Calculator",
    description: "Calculate the true hourly cost of hiring a direct employee under Ontario's Family-Managed Home Care program. Confirm your offer fits within Schedule B.",
    siteName: "Tabber",
    images: [
      {
        url: "/images/direct-hire-calculator.png",
        width: 1200,
        height: 630,
        alt: "FMHC Direct Hire Cost Calculator",
      },
    ],
    locale: "en_CA",
    publishedTime: "2026-06-10T00:00:00Z",
    modifiedTime: "2026-06-10T00:00:00Z",
    authors: ["Faysal El Masri, CPA"],
  },

  twitter: {
    card: "summary_large_image",
    title: "FMHC Direct Hire Cost Calculator",
    description: "Calculate the true hourly cost of hiring a direct employee under Ontario's Family-Managed Home Care program. Confirm your offer fits within Schedule B.",
    images: ["/images/direct-hire-calculator.png"],
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

export default function DirectHireCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
