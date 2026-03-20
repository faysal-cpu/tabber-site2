'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ClientHeaderProps {
  clientName: string;
  clientEmail?: string;
}

export function ClientHeader({ clientName, clientEmail }: ClientHeaderProps) {
  return (
    <header className="bg-white shadow-md" style={{ borderBottom: '3px solid #2B4C7E' }}>
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="https://tabber.ca" className="flex items-center transition-opacity hover:opacity-80">
            <Image
              src="/tabber-logo-full.svg"
              alt="Tabber"
              width={180}
              height={60}
              priority
            />
          </Link>

          {/* Client Info */}
          <div className="text-right">
            <h1 className="text-xl font-bold" style={{ color: '#2B4C7E' }}>
              {clientName}
            </h1>
            {clientEmail && (
              <p className="text-sm" style={{ color: '#6B7280' }}>{clientEmail}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
