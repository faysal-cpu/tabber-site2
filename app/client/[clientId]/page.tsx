'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ClientHeader } from '@/components/client-portal/client-header';
import { ClientFooter } from '@/components/client-portal/client-footer';
import { UploadSection } from '@/components/client-portal/upload-section';
import { UploadHistory } from '@/components/client-portal/upload-history';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertTriangle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClientInfo {
  id: string;
  name: string;
  email: string;
  clientType: string;
}

export default function ClientPortalPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const clientId = params.clientId as string;
  const token = searchParams.get('token');

  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!token) {
      setError('Access token is missing. Please use the link provided in your email.');
      setLoading(false);
      return;
    }

    authenticateClient();
  }, [token]);

  const authenticateClient = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/client/auth?token=${token}`);

      if (!response.ok) {
        throw new Error('Invalid or expired access token');
      }

      const data = await response.json();
      setClientInfo(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to authenticate. Please contact support.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = () => {
    // Increment trigger to refresh upload history
    setRefreshTrigger((prev) => prev + 1);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/tabber-logo-full.svg"
            alt="Tabber"
            width={550}
            height={183}
            priority
            className="mb-12"
          />
          <Loader2 className="h-16 w-16 animate-spin mb-6" style={{ color: '#2B4C7E' }} />
          <p className="text-2xl font-semibold" style={{ color: '#2B4C7E' }}>Authenticating...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !clientInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FAF9F7' }}>
        <Card className="w-full max-w-2xl">
          <CardContent className="py-12">
            <Alert variant="destructive">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Access Denied</AlertTitle>
              <AlertDescription className="mt-2">
                {error || 'Unable to access portal'}
              </AlertDescription>
            </Alert>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">
                If you believe this is an error, please contact us:
              </p>
              <Button
                variant="outline"
                onClick={() => (window.location.href = '/contact')}
                style={{ borderColor: '#2B4C7E', color: '#2B4C7E' }}
              >
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main portal interface
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#ffffff' }}>
      <ClientHeader clientName={clientInfo.name} clientEmail={clientInfo.email} />

      {/* Page Title Section */}
      <div className="py-8 md:py-12" style={{ backgroundColor: '#2B4C7E' }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <Shield className="h-6 w-6 md:h-10 md:w-10 text-white flex-shrink-0" />
            <h2 className="text-xl md:text-4xl font-bold text-white whitespace-nowrap">Secure Document Upload</h2>
          </div>
          <p className="text-center text-white text-sm md:text-lg mt-2 md:mt-3">Upload your documents securely. All files are encrypted and stored safely.</p>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-6 py-12" style={{ backgroundColor: '#FAF9F7' }}>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Section - Top */}
          <UploadSection token={token!} onUploadComplete={handleUploadComplete} />

          {/* Upload History - Bottom */}
          <UploadHistory token={token!} refreshTrigger={refreshTrigger} />
        </div>
      </div>

      <ClientFooter />
    </div>
  );
}
