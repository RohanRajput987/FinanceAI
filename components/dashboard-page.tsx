'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LogOut, TrendingUp, Plus } from 'lucide-react'
import UploadForm from './upload-form'
import DocumentList from './document-list'
import FinancialAnalysis from './financial-analysis'

interface DashboardPageProps {
  user: { id: string; email: string }
  onLogout: () => void
}

export default function DashboardPage({ user, onLogout }: DashboardPageProps) {
  const [documents, setDocuments] = useState<
    Array<{
      id: string
      name: string
      uploadedAt: string
      type: 'income' | 'balance' | 'cashflow' | 'other'
      data?: {
        revenue?: number
        expenses?: number
        profit?: number
        assets?: number
        liabilities?: number
      }
    }>
  >([])
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)

  const handleUpload = (
    file: File,
    type: 'income' | 'balance' | 'cashflow' | 'other',
    parsedData: any,
  ) => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: file.name,
      uploadedAt: new Date().toLocaleDateString(),
      type,
      data: parsedData,
    }
    setDocuments([...documents, newDoc])
    setSelectedDoc(newDoc.id)
  }

  const selectedDocument = documents.find((d) => d.id === selectedDoc)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">FinanceAI</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout} className="gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload Document</TabsTrigger>
            <TabsTrigger value="documents">My Documents</TabsTrigger>
            <TabsTrigger value="analysis" disabled={!selectedDoc}>
              Analysis
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Financial Document</CardTitle>
                <CardDescription>
                  Upload your financial PDFs (Income Statement, Balance Sheet, or Cash Flow Statement)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadForm onUpload={handleUpload} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Documents</CardTitle>
                <CardDescription>Manage and view your uploaded financial documents</CardDescription>
              </CardHeader>
              <CardContent>
                {documents.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-600 dark:text-slate-400 mb-4">No documents uploaded yet</p>
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4" />
                      Upload First Document
                    </Button>
                  </div>
                ) : (
                  <DocumentList documents={documents} selectedId={selectedDoc} onSelect={setSelectedDoc} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-4">
            {selectedDocument ? (
              <FinancialAnalysis document={selectedDocument} />
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-slate-600 dark:text-slate-400">Select a document to view analysis</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
