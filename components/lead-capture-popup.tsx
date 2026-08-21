'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

export function LeadCapturePopup() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const hasInitialized = useRef(false)

  useEffect(() => {
    // Prevent double initialization from React Strict Mode
    if (hasInitialized.current) return
    hasInitialized.current = true

    // Pages where popup should NOT show
    const excludedPages = ['/', '/services', '/faq', '/about', '/privacy', '/contact', '/terms']
    if (excludedPages.includes(pathname)) {
      setIsVisible(false)
      setIsClosing(false)
      return
    }

    // If dismissed once, stay dismissed for the whole session
    const wasDismissed = sessionStorage.getItem('leadPopupDismissed')
    if (wasDismissed) {
      setIsVisible(false)
      return
    }

    // Check if popup was already shown on this specific page
    const currentPageKey = `leadPopupShown_${pathname}`
    const hasSeenOnThisPage = sessionStorage.getItem(currentPageKey)
    if (hasSeenOnThisPage) {
      setIsVisible(false)
      return
    }

    let timeoutId: NodeJS.Timeout
    let scrollTriggered = false
    let timeTriggered = false

    const checkTriggers = () => {
      // Double-check it wasn't dismissed before showing
      const wasDismissed = sessionStorage.getItem('leadPopupDismissed')
      if (wasDismissed) return

      if (scrollTriggered || timeTriggered) {
        setIsVisible(true)
        sessionStorage.setItem(currentPageKey, 'true')
      }
    }

    const handleScroll = () => {
      if (scrollTriggered) return
      // Check if dismissed before triggering
      const wasDismissed = sessionStorage.getItem('leadPopupDismissed')
      if (wasDismissed) return

      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent >= 40) {
        scrollTriggered = true
        checkTriggers()
      }
    }

    timeoutId = setTimeout(() => {
      timeTriggered = true
      checkTriggers()
    }, 15000)

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  const handleClose = () => {
    setIsClosing(true)
    sessionStorage.setItem('leadPopupDismissed', 'true')
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      })

      setIsSubmitted(true)
      setTimeout(() => {
        handleClose()
      }, 2000)
    } catch (error) {
      console.error('Form submission error:', error)
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 w-[90vw] max-w-[400px] rounded-2xl bg-white shadow-2xl transition-all duration-300 ${
        isClosing ? 'translate-y-8 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      style={{ boxShadow: '0 10px 40px rgba(43, 76, 126, 0.2)' }}
    >
      <div className="p-6">
        {/* Header with close button */}
        <div className="mb-4 flex items-start justify-between">
          <h3 className="font-serif text-[20px] font-bold leading-tight pr-2" style={{ color: '#2B4C7E' }}>
            Need help navigating FMHC?
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body text */}
        <p className="mb-5 text-[14px] leading-[1.6] text-gray-600">
          If you're unsure about your setup, reporting, or next steps — we're happy to help. Leave your details and we'll reach out.
        </p>

        {/* Form or success message */}
        {isSubmitted ? (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
            <p className="text-[14px] font-semibold text-green-800">Thanks! We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} name="popup-inquiry" className="space-y-3">
            <input type="hidden" name="form-name" value="popup-inquiry" />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:shadow-md disabled:opacity-50"
              style={{ backgroundColor: '#2B4C7E' }}
            >
              {isSubmitting ? 'Sending...' : 'Get Support'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
