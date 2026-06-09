import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Choosing Your FMHC Care Arrangement | Tabber",
  description: "Compare the three options for hiring care under Ontario's Family-Managed Home Care program — agency, independent contractor, or direct employee. A practical decision guide from Tabber.",
  keywords: ["FMHC employment options", "agency vs direct hire self-directed care Ontario", "Family-Managed Home Care contractor vs employee", "FMHC care arrangement"],
  openGraph: {
    title: "Choosing Your FMHC Care Arrangement",
    description: "Compare the three options for hiring care under Ontario's Family-Managed Home Care program. Interactive decision guide included.",
    type: "article",
    url: "https://tabber.ca/resources/care-arrangement-guide",
    images: [
      {
        url: "https://tabber.ca/images/care-arrangement-guide.png",
        width: 1200,
        height: 630,
        alt: "FMHC Care Arrangement Decision Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Choosing Your FMHC Care Arrangement | Tabber",
    description: "Compare the three options for hiring care under Ontario's Family-Managed Home Care program. Interactive decision guide included.",
    images: ["https://tabber.ca/images/care-arrangement-guide.png"],
  },
}

export default function CareArrangementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
