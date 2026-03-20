'use client';

import { CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface ChecklistItemData {
  id: string;
  item_name: string;
  description: string | null;
  category: string;
  required: boolean;
  status: string;
  lastUploadedAt: string | null;
}

interface ChecklistItemProps {
  item: ChecklistItemData;
}

export function ChecklistItem({ item }: ChecklistItemProps) {
  const isCompleted = item.status === 'uploaded';

  return (
    <Card className={cn(
      'transition-all hover:shadow-md',
      isCompleted && 'border-green-200 bg-green-50/50'
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Clock className="h-5 w-5 text-orange-500" />
              )}
              {item.item_name}
            </CardTitle>
            {item.description && (
              <CardDescription className="mt-1">
                {item.description}
              </CardDescription>
            )}
          </div>
          <Badge
            variant={isCompleted ? 'default' : 'secondary'}
            className={cn(
              isCompleted && 'bg-green-600 hover:bg-green-700',
              !isCompleted && 'bg-orange-500 text-white hover:bg-orange-600'
            )}
          >
            {isCompleted ? 'Uploaded' : 'Pending'}
          </Badge>
        </div>
      </CardHeader>
      {item.lastUploadedAt && (
        <CardContent className="pt-0">
          <p className="text-xs text-gray-500">
            Last uploaded: {new Date(item.lastUploadedAt).toLocaleString()}
          </p>
        </CardContent>
      )}
    </Card>
  );
}
