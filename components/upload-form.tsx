'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle, Upload } from 'lucide-react'

interface UploadFormProps {
  onUpload: (file: File, type: 'income' | 'balance' | 'cashflow' | 'other', data: any) => void
}

// Mock data generators for different document types
function generateMockData(type: 'income' | 'balance' | 'cashflow' | 'other') {
  switch (type) {
    case 'income':
      return {
        revenue: 1500000,
        costOfGoodsSold: 600000,
        grossProfit: 900000,
        operatingExpenses: 400000,
        operatingIncome: 500000,
        interestExpense: 50000,
        taxExpense: 112500,
        netIncome: 337500,
        profit: 337500,
        months: [
          { month: 'Jan', revenue: 100000, expenses: 60000, profit: 40000 },
          { month: 'Feb', revenue: 110000, expenses: 62000, profit: 48000 },
          { month: 'Mar', revenue: 120000, expenses: 65000, profit: 55000 },
          { month: 'Apr', revenue: 125000, expenses: 68000, profit: 57000 },
          { month: 'May', revenue: 130000, expenses: 70000, profit: 60000 },
          { month: 'Jun', revenue: 140000, expenses: 75000, profit: 65000 },
        ],
        expenseBreakdown: [
          { category: 'Salaries', amount: 200000, percentage: 33 },
          { category: 'Marketing', amount: 120000, percentage: 20 },
          { category: 'Operations', amount: 100000, percentage: 17 },
          { category: 'Technology', amount: 80000, percentage: 13 },
          { category: 'Other', amount: 100000, percentage: 17 },
        ],
      }
    case 'balance':
      return {
        revenue: 1500000,
        assets: 2000000,
        liabilities: 800000,
        equity: 1200000,
        currentAssets: 1200000,
        currentLiabilities: 400000,
        costOfGoodsSold: 600000,
        operatingExpenses: 400000,
        netIncome: 150000,
        profit: 150000,
        months: [
          { month: 'Jan', revenue: 100000, expenses: 60000, profit: 40000 },
          { month: 'Feb', revenue: 110000, expenses: 62000, profit: 48000 },
          { month: 'Mar', revenue: 120000, expenses: 65000, profit: 55000 },
          { month: 'Apr', revenue: 125000, expenses: 68000, profit: 57000 },
          { month: 'May', revenue: 130000, expenses: 70000, profit: 60000 },
          { month: 'Jun', revenue: 140000, expenses: 75000, profit: 65000 },
        ],
        expenseBreakdown: [
          { category: 'Salaries', amount: 200000, percentage: 33 },
          { category: 'Marketing', amount: 120000, percentage: 20 },
          { category: 'Operations', amount: 100000, percentage: 17 },
          { category: 'Technology', amount: 80000, percentage: 13 },
          { category: 'Other', amount: 100000, percentage: 17 },
        ],
        assetBreakdown: [
          { name: 'Cash', value: 400000 },
          { name: 'Accounts Receivable', value: 500000 },
          { name: 'Inventory', value: 300000 },
          { name: 'Property & Equipment', value: 800000 },
        ],
      }
    case 'cashflow':
      return {
        revenue: 1500000,
        costOfGoodsSold: 600000,
        operatingExpenses: 400000,
        netIncome: 337500,
        profit: 337500,
        months: [
          { month: 'Jan', operating: 50000, investing: -30000, financing: 0, ending: 100000 },
          { month: 'Feb', operating: 55000, investing: -25000, financing: 20000, ending: 150000 },
          { month: 'Mar', operating: 60000, investing: -35000, financing: 0, ending: 175000 },
          { month: 'Apr', operating: 65000, investing: -40000, financing: -15000, ending: 185000 },
          { month: 'May', operating: 70000, investing: -20000, financing: 0, ending: 235000 },
          { month: 'Jun', operating: 75000, investing: -30000, financing: 0, ending: 280000 },
        ],
        freeCashFlow: 185000,
        operatingCashFlow: 375000,
        investingCashFlow: -180000,
      }
    default:
      return {}
  }
}

export default function UploadForm({ onUpload }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [docType, setDocType] = useState<'income' | 'balance' | 'cashflow' | 'other'>('other')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setMessage({ type: 'error', text: 'Please upload a PDF file' })
        setFile(null)
      } else if (selectedFile.size > 10 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File size must be less than 10MB' })
        setFile(null)
      } else {
        setFile(selectedFile)
        setMessage(null)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a file' })
      return
    }

    setIsLoading(true)
    setMessage(null)

    // Simulate file processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockData = generateMockData(docType)
    onUpload(file, docType, mockData)

    setMessage({
      type: 'success',
      text: `Successfully uploaded "${file.name}" - Data extracted and ready for analysis`,
    })
    setFile(null)
    setDocType('other')

    setTimeout(() => setMessage(null), 4000)

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          {message.type === 'error' ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CheckCircle className="h-4 w-4 text-green-600" />
          )}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="doctype">Document Type</Label>
        <Select value={docType} onValueChange={(v) => setDocType(v as any)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income Statement (P&L)</SelectItem>
            <SelectItem value="balance">Balance Sheet</SelectItem>
            <SelectItem value="cashflow">Cash Flow Statement</SelectItem>
            <SelectItem value="other">Other Financial Document</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">Upload PDF</Label>
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <Input
            id="file"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={isLoading}
            className="hidden"
          />
          <label htmlFor="file" className="cursor-pointer block">
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-slate-400" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Click to upload</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">or drag and drop your PDF file</p>
              </div>
              <p className="text-xs text-slate-500">PDF up to 10MB</p>
            </div>
          </label>
        </div>
        {file && (
          <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            {file.name}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={!file || isLoading}
      >
        {isLoading ? 'Processing...' : 'Upload & Extract Data'}
      </Button>
    </form>
  )
}
