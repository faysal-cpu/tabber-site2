// Document categories for FMHC clients
export const DOCUMENT_CATEGORIES = [
  'Bank Statements',
  'Receipts',
  'Payroll',
  'CRA',
] as const;

export type DocumentCategory = typeof DOCUMENT_CATEGORIES[number];

// Category display information
export const CATEGORY_INFO: Record<DocumentCategory, { description: string; icon: string }> = {
  'Bank Statements': {
    description: 'Monthly bank statements for all business accounts',
    icon: 'Building2',
  },
  'Receipts': {
    description: 'All business-related receipts and invoices',
    icon: 'Receipt',
  },
  'Payroll': {
    description: 'Employee timesheets and payroll summaries',
    icon: 'Users',
  },
  'CRA': {
    description: 'Any letters or notices from CRA',
    icon: 'FileText',
  },
};
