'use client';

import { useState, useEffect } from 'react';
import { FileText, Loader2, CheckCircle, Download, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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
  const [downloading, setDownloading] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<{ id: string; name: string } | null>(null);

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

  const handleDownload = async (uploadId: string, filename: string) => {
    try {
      setDownloading(uploadId);

      // Get the download URL from our API
      const response = await fetch(`/api/client/download?token=${token}&uploadId=${uploadId}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to get download URL');
      }

      const data = await response.json();

      console.log('Download URL received:', data.downloadUrl);

      // Simply redirect to the URL - the content-disposition header will force download
      window.location.href = data.downloadUrl;

      toast.success('Download started!', {
        description: filename,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Download failed', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    } finally {
      // Keep downloading state for a bit to show feedback
      setTimeout(() => setDownloading(null), 2000);
    }
  };

  const confirmDelete = (uploadId: string, filename: string) => {
    setFileToDelete({ id: uploadId, name: filename });
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!fileToDelete) return;

    try {
      setDeleting(fileToDelete.id);
      setDeleteDialogOpen(false);

      const response = await fetch(`/api/client/delete?token=${token}&uploadId=${fileToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete file');
      }

      // Remove from local state
      setUploads(prev => prev.filter(u => u.id !== fileToDelete.id));

      toast.success('File removed', {
        description: fileToDelete.name,
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Delete failed', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    } finally {
      setDeleting(null);
      setFileToDelete(null);
    }
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
    <Card className="shadow-lg border-2" style={{ borderColor: '#2B4C7E' }}>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl" style={{ color: '#2B4C7E' }}>Upload History</CardTitle>
        <CardDescription className="text-base" style={{ color: '#6B7280' }}>
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
                className="rounded-lg p-5 transition-all hover:shadow-md"
                style={{
                  border: '2px solid #E8EDF5',
                  backgroundColor: 'white'
                }}
              >
                <div className="flex items-start gap-3">
                  <FileText className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: '#2B4C7E' }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold truncate" style={{ color: '#1A2A44' }}>
                        {upload.original_name}
                      </p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <CheckCircle className="h-6 w-6" style={{ color: '#10B981' }} />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(upload.id, upload.original_name)}
                          disabled={downloading === upload.id || deleting === upload.id}
                          className="h-8 w-8 p-0"
                        >
                          {downloading === upload.id ? (
                            <Loader2 className="h-5 w-5 animate-spin" style={{ color: '#2B4C7E' }} />
                          ) : (
                            <Download className="h-5 w-5" style={{ color: '#2B4C7E' }} />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => confirmDelete(upload.id, upload.original_name)}
                          disabled={downloading === upload.id || deleting === upload.id}
                          className="h-8 w-8 p-0 hover:bg-red-50"
                        >
                          {deleting === upload.id ? (
                            <Loader2 className="h-5 w-5 animate-spin text-red-500" />
                          ) : (
                            <Trash2 className="h-5 w-5 text-red-500" />
                          )}
                        </Button>
                      </div>
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove file?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove "{fileToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
