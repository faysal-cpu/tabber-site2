'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ClientHeaderProps {
  clientName: string;
  clientEmail?: string;
}

export function ClientHeader({ clientName, clientEmail }: ClientHeaderProps) {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="https://tabber.ca" className="flex items-center">
            <Image
              src="/tabber-logo-full.svg"
              alt="Tabber"
              width={120}
              height={40}
              priority
            />
          </Link>

          {/* Client Info */}
          <div className="text-right">
            <h1 className="text-lg font-semibold" style={{ color: '#2B4C7E' }}>
              {clientName}
            </h1>
            {clientEmail && (
              <p className="text-sm text-gray-600">{clientEmail}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
