'use client';

import { Building2 } from 'lucide-react';

interface ClientHeaderProps {
  clientName: string;
  clientEmail?: string;
}

export function ClientHeader({ clientName, clientEmail }: ClientHeaderProps) {
  return (
    <div className="border-b bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{clientName}</h1>
            {clientEmail && (
              <p className="text-sm text-gray-500">{clientEmail}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
