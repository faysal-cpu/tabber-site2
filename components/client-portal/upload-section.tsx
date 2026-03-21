'use client';

import { useState, useRef, DragEvent } from 'react';
import { Upload, FileIcon, X, CloudUpload, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface UploadSectionProps {
  token: string;
  onUploadComplete?: () => void;
}

export function UploadSection({ token, onUploadComplete }: UploadSectionProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileNotes, setFileNotes] = useState<Record<number, string>>({});
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList) => {
    const filesArray = Array.from(files);
    setSelectedFiles(prev => [...prev, ...filesArray]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    // Rebuild notes object with updated indexes
    setFileNotes(prev => {
      const newNotes: Record<number, string> = {};
      Object.entries(prev).forEach(([key, value]) => {
        const oldIndex = parseInt(key);
        if (oldIndex < index) {
          newNotes[oldIndex] = value;
        } else if (oldIndex > index) {
          newNotes[oldIndex - 1] = value;
        }
      });
      return newNotes;
    });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one file');
      return;
    }

    try {
      setUploading(true);
      setProgress(0);
      let uploaded = 0;
      const uploadedFiles: Array<{ filename: string; notes?: string }> = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileNote = fileNotes[i]?.trim();
        const formData = new FormData();
        formData.append('token', token);
        formData.append('file', file);
        if (fileNote) {
          formData.append('notes', fileNote);
        }

        // Animate progress smoothly (90% for uploads, 10% for email)
        const baseProgress = (i / selectedFiles.length) * 90;
        const nextProgress = ((i + 1) / selectedFiles.length) * 90;

        // Start of file upload
        setProgress(baseProgress + 5);

        const response = await fetch('/api/client/upload', {
          method: 'POST',
          body: formData,
        });

        setProgress(baseProgress + 15);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Failed to upload ${file.name}`);
        }

        uploaded++;
        uploadedFiles.push({
          filename: data.upload.filename,
          notes: fileNote || undefined,
        });
        setProgress(nextProgress);
      }

      // Send batch confirmation email
      setProgress(95);
      await fetch('/api/client/send-batch-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          files: uploadedFiles,
        }),
      });

      setProgress(100);
      setUploadedCount(uploaded);

      // Show success dialog
      setShowSuccessDialog(true);

      // Reset form
      setSelectedFiles([]);
      setFileNotes({});
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Trigger refresh
      onUploadComplete?.();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <>
      <Card className="sticky top-4 shadow-lg border-2" style={{ borderColor: '#2B4C7E' }}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#2B4C7E' }}>
            <CloudUpload className="h-7 w-7" />
            Upload Documents
          </CardTitle>
          <CardDescription className="text-base" style={{ color: '#6B7280' }}>
            Select multiple files to upload at once
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Drag and Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !uploading && fileInputRef.current?.click()}
            className={cn(
              'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all',
              isDragging
                ? 'bg-blue-50'
                : 'border-gray-300 hover:bg-gray-50',
              uploading && 'opacity-50 cursor-not-allowed'
            )}
            style={isDragging ? { borderColor: '#2B4C7E', backgroundColor: '#E8EDF5' } : {}}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.xlsx,.csv"
              onChange={handleInputChange}
              className="hidden"
              disabled={uploading}
              multiple
            />

            {selectedFiles.length === 0 ? (
              <div className="space-y-3">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Drop files here or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, JPG, PNG, XLSX, CSV • Max 50MB each
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <CloudUpload className="mx-auto h-12 w-12" style={{ color: '#2B4C7E' }} />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    disabled={uploading}
                    className="mt-2"
                  >
                    Add More Files
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Selected Files List */}
          {selectedFiles.length > 0 && (
            <div className="max-h-96 overflow-y-auto space-y-3 border rounded-lg p-3" style={{ backgroundColor: '#F9FAFB' }}>
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="bg-white rounded border p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileIcon className="h-4 w-4 flex-shrink-0" style={{ color: '#2B4C7E' }} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFile(index)}
                      disabled={uploading}
                      className="flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    type="text"
                    placeholder="Add a note (optional)"
                    value={fileNotes[index] || ''}
                    onChange={(e) => setFileNotes(prev => ({ ...prev, [index]: e.target.value }))}
                    disabled={uploading}
                    maxLength={200}
                    className="text-sm"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Progress Bar */}
          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="transition-all duration-300" />
              <p className="text-xs text-center text-gray-500">
                Uploading {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''}...
              </p>
            </div>
          )}

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || uploading}
            className="w-full font-semibold text-base transition-all hover:shadow-lg"
            size="lg"
            style={{
              backgroundColor: '#2B4C7E',
              color: 'white'
            }}
          >
            {uploading ? (
              <>
                <Upload className="mr-2 h-5 w-5 animate-pulse" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Upload {selectedFiles.length > 0 ? `${selectedFiles.length} File${selectedFiles.length > 1 ? 's' : ''}` : 'Files'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: '#10B981' }}>
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold" style={{ color: '#2B4C7E' }}>
              Upload Successful!
            </DialogTitle>
            <DialogDescription className="text-base mt-2">
              {uploadedCount} document{uploadedCount > 1 ? 's have' : ' has'} been uploaded successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => setShowSuccessDialog(false)}
              style={{ backgroundColor: '#2B4C7E', color: 'white' }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
