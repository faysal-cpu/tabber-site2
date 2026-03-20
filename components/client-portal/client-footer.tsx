'use client';

import Image from 'next/image';

export function ClientFooter() {
  return (
    <footer className="mt-auto py-8" style={{ backgroundColor: '#1A2A44', color: 'white' }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/tabber-logo-full-white.svg"
              alt="Tabber"
              width={180}
              height={60}
              priority
            />
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <p className="text-white/90 mb-2">
              Questions or concerns? We're here to help.
            </p>
            <p className="text-lg font-semibold">
              <a
                href="mailto:felmasri@tabber.ca"
                className="text-white hover:text-white/80 transition-colors"
              >
                felmasri@tabber.ca
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-white/20 text-center text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} Tabber Bookkeeping Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
