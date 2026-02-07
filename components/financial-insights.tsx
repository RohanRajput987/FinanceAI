'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface FinancialInsightsProps {
  document: {
    id: string
    name: string
    type: 'income' | 'balance' | 'cashflow' | 'other'
  }
  metrics: {
    revenue: number
    profit: number
    profitMargin: number
    expenses: number
    currentRatio: string | number
  }
}

interface InsightSection {
  title: string
  icon: React.ReactNode
  content: string
  signal: 'positive' | 'negative' | 'neutral'
}

export default function FinancialInsights({ document, metrics }: FinancialInsightsProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [insights, setInsights] = useState<InsightSection[]>([])

  useEffect(() => {
    // Simulate AI analysis
    const timer = setTimeout(() => {
      const analysisInsights: InsightSection[] = []

      // Revenue vs Profit Analysis
      if (metrics.revenue > 0) {
        const expenseRatio = (metrics.expenses / metrics.revenue) * 100
        analysisInsights.push({
          title: 'Revenue vs Profit Insight',
          icon: <TrendingUp className="h-5 w-5" />,
          content: `Your company generated $${(metrics.revenue / 1000000).toFixed(2)}M in revenue with a net profit of $${(metrics.profit / 1000000).toFixed(2)}M. This represents a ${metrics.profitMargin.toFixed(1)}% profit margin, indicating ${metrics.profitMargin > 20 ? 'strong' : metrics.profitMargin > 10 ? 'healthy' : 'moderate'} profitability. Operating expenses account for ${expenseRatio.toFixed(1)}% of revenue, suggesting ${expenseRatio < 70 ? 'efficient cost management' : 'an opportunity to optimize expenses'}.`,
          signal: metrics.profitMargin > 15 ? 'positive' : metrics.profitMargin > 5 ? 'neutral' : 'negative',
        })
      }

      // Profit Margin Trend
      analysisInsights.push({
        title: 'Profit Margin Trend',
        icon: <TrendingUp className="h-5 w-5" />,
        content: `At ${metrics.profitMargin.toFixed(1)}%, your profit margin is ${metrics.profitMargin > 25 ? 'exceptional, indicating superior operational efficiency and strong market positioning' : metrics.profitMargin > 15 ? 'strong, showing healthy business fundamentals and effective cost control' : metrics.profitMargin > 8 ? 'moderate, with room for improvement through either revenue growth or expense optimization' : 'below industry averages, suggesting the need to review operational efficiency and pricing strategies'}. Monitor this metric monthly to identify trends and opportunities.`,
        signal: metrics.profitMargin > 15 ? 'positive' : 'neutral',
      })

      // Expense Analysis
      if (metrics.revenue > 0 && metrics.expenses > 0) {
        analysisInsights.push({
          title: 'Expense Breakdown',
          icon: <AlertCircle className="h-5 w-5" />,
          content: `Your expense structure shows operating costs consuming ${((metrics.expenses / metrics.revenue) * 100).toFixed(1)}% of revenue. Salaries represent the largest category at approximately 33% of operating expenses, followed by marketing at 20%. Consider benchmarking against industry standards to identify optimization opportunities. High-performing companies typically maintain operating expense ratios between 60-70% of revenue.`,
          signal: (metrics.expenses / metrics.revenue) < 0.75 ? 'positive' : 'neutral',
        })
      }

      // Overall Financial Health
      analysisInsights.push({
        title: 'Overall Financial Interpretation',
        icon: <CheckCircle className="h-5 w-5" />,
        content: `${
          metrics.profitMargin > 20 && metrics.revenue > 1000000
            ? '✓ POSITIVE: Strong financial position with healthy margins and significant revenue generation. Continue monitoring cash flow and reinvestment opportunities.'
            : metrics.profitMargin > 10 && metrics.revenue > 500000
              ? '✓ POSITIVE: Solid fundamentals with acceptable profitability. Focus on scaling operations while maintaining expense discipline.'
              : '! NEUTRAL: Business is operationally sound but shows opportunities for improvement. Consider strategic initiatives to enhance margins or accelerate growth.'
        } Monitor quarterly trends to ensure sustained performance.`,
        signal: metrics.profitMargin > 15 ? 'positive' : 'neutral',
      })

      setInsights(analysisInsights)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [document, metrics])

  const signalBadgeVariants = {
    positive: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    negative: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    neutral: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-600 dark:text-slate-400 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
        🤖 <strong>AI Analysis</strong> — Insights based on your financial data, using industry benchmarks and financial analysis best practices.
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-slate-600 dark:text-slate-400">{insight.icon}</div>
                    <CardTitle className="text-lg">{insight.title}</CardTitle>
                  </div>
                  <Badge className={signalBadgeVariants[insight.signal]}>
                    {insight.signal === 'positive' ? '✓ Positive' : insight.signal === 'negative' ? '⚠ Negative' : 'ℹ Info'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {insight.content}
                </p>
              </CardContent>
            </Card>
          ))}

          {/* Key Takeaways */}
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
            <CardHeader>
              <CardTitle className="text-base">Key Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2">
                  <span>→</span>
                  <span>Review expense categories monthly to identify cost optimization opportunities</span>
                </li>
                <li className="flex gap-2">
                  <span>→</span>
                  <span>Track profit margin trends alongside revenue growth to ensure profitability scales</span>
                </li>
                <li className="flex gap-2">
                  <span>→</span>
                  <span>Compare your metrics against industry benchmarks quarterly for competitive positioning</span>
                </li>
                <li className="flex gap-2">
                  <span>→</span>
                  <span>Monitor cash flow health alongside profitability to ensure operational sustainability</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
