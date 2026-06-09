import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Choosing Your FMHC Care Arrangement | Tabber",
  description: "Compare the three options for hiring care under Ontario's Family-Managed Home Care program — agency, independent contractor, or direct employee. A practical decision guide from Tabber.",
  keywords: ["FMHC employment options", "agency vs direct hire self-directed care Ontario", "Family-Managed Home Care contractor vs employee", "FMHC care arrangement"],
  openGraph: {
    title: "Choosing Your FMHC Care Arrangement",
    description: "Compare the three options for hiring care under Ontario's Family-Managed Home Care program. Interactive decision guide included.",
    type: "article",
  },
}

export default function CareArrangementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
