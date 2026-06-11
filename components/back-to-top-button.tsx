"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"

export function BackToTopButton() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!showBackToTop) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 flex size-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      style={{ backgroundColor: '#2B4C7E' }}
      aria-label="Back to top"
    >
      <ChevronUp className="size-6 text-white" />
    </button>
  )
}
