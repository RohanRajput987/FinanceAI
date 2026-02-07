'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Trash2, ArrowRight } from 'lucide-react'

interface Document {
  id: string
  name: string
  uploadedAt: string
  type: 'income' | 'balance' | 'cashflow' | 'other'
  data?: any
}

interface DocumentListProps {
  documents: Document[]
  selectedId: string | null
  onSelect: (id: string) => void
}

const typeLabels = {
  income: 'Income Statement',
  balance: 'Balance Sheet',
  cashflow: 'Cash Flow',
  other: 'Other',
}

const typeBadgeVariants = {
  income: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  balance: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  cashflow: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  other: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
}

export default function DocumentList({
  documents,
  selectedId,
  onSelect,
}: DocumentListProps) {
  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
            selectedId === doc.id
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
          onClick={() => onSelect(doc.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <FileText className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white truncate">{doc.name}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Badge className={typeBadgeVariants[doc.type]}>
                    {typeLabels[doc.type]}
                  </Badge>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Uploaded: {doc.uploadedAt}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-4 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect(doc.id)
                }}
                className="gap-1"
              >
                <ArrowRight className="h-4 w-4" />
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
