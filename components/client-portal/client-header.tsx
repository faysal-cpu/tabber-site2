'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ClientHeaderProps {
  clientName: string;
  clientEmail?: string;
}

export function ClientHeader({ clientName, clientEmail }: ClientHeaderProps) {
  return (
    <header className="bg-white shadow-sm" style={{ borderBottom: '4px solid #2B4C7E' }}>
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex items-center justify-between gap-3 md:gap-8">
          {/* Logo */}
          <Link href="https://tabber.ca" className="flex items-center transition-opacity hover:opacity-80 flex-shrink-0">
            <Image
              src="/tabber-logo-full.svg"
              alt="Tabber CPA bookkeeping services - Client portal"
              width={500}
              height={167}
              priority
              className="w-[280px] md:w-[500px]"
            />
          </Link>

          {/* Client Info */}
          <div className="text-right flex flex-col justify-center flex-shrink-0">
            <h1 className="text-sm md:text-2xl font-bold leading-tight whitespace-nowrap" style={{ color: '#2B4C7E' }}>
              {clientName}
            </h1>
            {clientEmail && (
              <p className="text-xs md:text-base mt-0.5 md:mt-1 break-all" style={{ color: '#6B7280' }}>{clientEmail}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
