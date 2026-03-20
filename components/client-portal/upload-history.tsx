'use client';

import { useState, useEffect } from 'react';
import { FileText, Loader2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Upload {
  id: string;
  filename: string;
  original_name: string;
  file_size: number;
  uploaded_at: string;
  notes: string | null;
  processed: boolean;
}

interface UploadHistoryProps {
  token: string;
  refreshTrigger?: number;
}

export function UploadHistory({ token, refreshTrigger }: UploadHistoryProps) {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUploads();
  }, [token, refreshTrigger]);

  const fetchUploads = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/client/uploads-history?token=${token}&limit=50`);

      if (!response.ok) {
        throw new Error('Failed to load upload history');
      }

      const data = await response.json();
      setUploads(data.uploads || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load uploads');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-red-600">
          {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload History</CardTitle>
        <CardDescription>
          {uploads.length} {uploads.length === 1 ? 'upload' : 'uploads'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {uploads.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <FileText className="mx-auto h-12 w-12 text-gray-300 mb-3" />
            <p>No uploads yet</p>
            <p className="text-sm">Your uploaded documents will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {uploads.map((upload) => (
              <div
                key={upload.id}
                className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-gray-900 truncate">
                        {upload.original_name}
                      </p>
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    </div>
                    {upload.notes && (
                      <p className="text-sm text-gray-600 mt-1 italic">
                        "{upload.notes}"
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-xs text-gray-500">
                        {formatFileSize(upload.file_size)}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">
                        {formatDate(upload.uploaded_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
