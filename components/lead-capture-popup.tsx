'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { X } from 'lucide-react'

export function LeadCapturePopup() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Pages where popup should NOT show
    const excludedPages = ['/', '/services', '/faq', '/about', '/privacy', '/contact', '/terms']
    if (excludedPages.includes(pathname)) return

    const hasSeenPopup = sessionStorage.getItem('leadPopupShown')
    if (hasSeenPopup) return

    let timeoutId: NodeJS.Timeout
    let scrollTriggered = false
    let timeTriggered = false

    const checkTriggers = () => {
      if (scrollTriggered || timeTriggered) {
        setIsVisible(true)
        sessionStorage.setItem('leadPopupShown', 'true')
      }
    }

    const handleScroll = () => {
      if (scrollTriggered) return
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
    setTimeout(() => {
      setIsVisible(false)
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new URLSearchParams()
      formData.append('form-name', 'lead-capture')
      formData.append('email', email)
      formData.append('phone', phone)

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
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
    <>
      {/* Hidden form for Netlify */}
      <form name="lead-capture" data-netlify="true" hidden>
        <input type="email" name="email" />
        <input type="tel" name="phone" />
      </form>

      {/* Popup */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[90vw] max-w-[400px] rounded-2xl bg-white shadow-2xl transition-all duration-300 ${
          isClosing ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
        }`}
        style={{ boxShadow: '0 10px 40px rgba(43, 76, 126, 0.2)' }}
      >
        <div className="p-6">
          {/* Header with photo and close button */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/images/faysal-headshot.png"
                alt="Faysal El Masri"
                width={48}
                height={48}
                className="rounded-full"
              />
              <h3 className="font-serif text-[18px] font-bold text-navy">
                Need help navigating FMHC?
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
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
            <form onSubmit={handleSubmit} className="space-y-3" data-netlify="true" name="lead-capture">
              <input type="hidden" name="form-name" value="lead-capture" />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[14px] focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[14px] focus:border-[#2B4C7E] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20"
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
    </>
  )
}
