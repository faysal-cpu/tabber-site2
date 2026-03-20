'use client';

import { useState, useEffect } from 'react';
import { ChecklistItem, type ChecklistItemData } from './checklist-item';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

interface ChecklistSectionProps {
  token: string;
}

export function ChecklistSection({ token }: ChecklistSectionProps) {
  const [checklist, setChecklist] = useState<ChecklistItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'uploaded'>('all');

  useEffect(() => {
    fetchChecklist();
  }, [token]);

  const fetchChecklist = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/client/checklist?token=${token}`);

      if (!response.ok) {
        throw new Error('Failed to load checklist');
      }

      const data = await response.json();
      setChecklist(data.checklist || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load checklist');
    } finally {
      setLoading(false);
    }
  };

  const filteredChecklist = checklist.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const completedCount = checklist.filter((item) => item.status === 'uploaded').length;
  const totalCount = checklist.length;

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
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Document Checklist</CardTitle>
          <CardDescription>
            Track your document requirements • {completedCount} of {totalCount} complete
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All ({totalCount})</TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({totalCount - completedCount})
              </TabsTrigger>
              <TabsTrigger value="uploaded">
                Uploaded ({completedCount})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filteredChecklist.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              No items to display
            </CardContent>
          </Card>
        ) : (
          filteredChecklist.map((item) => (
            <ChecklistItem key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}
