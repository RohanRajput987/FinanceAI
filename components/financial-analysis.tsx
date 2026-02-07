'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'
import RevenueChart from './charts/revenue-chart'
import ExpenseChart from './charts/expense-chart'
import CashFlowChart from './charts/cash-flow-chart'
import FinancialInsights from './financial-insights'
import FinancialRatios from './financial-ratios'
import FinancialHealth from './financial-health'

interface FinancialAnalysisProps {
  document: {
    id: string
    name: string
    type: 'income' | 'balance' | 'cashflow' | 'other'
    data?: any
  }
}

export default function FinancialAnalysis({ document }: FinancialAnalysisProps) {
  const data = document.data || {}

  // Calculate key metrics
  const revenue = data.revenue || 0
  const expenses = (data.costOfGoodsSold || 0) + (data.operatingExpenses || 0)
  const profit = data.profit || data.netIncome || 0
  const profitMargin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : '0'
  const currentRatio = data.currentAssets && data.currentLiabilities
    ? (data.currentAssets / data.currentLiabilities).toFixed(2)
    : 'N/A'

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              ${(revenue / 1000000).toFixed(2)}M
            </div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Positive
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Net Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              ${(profit / 1000000).toFixed(2)}M
            </div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> {profitMargin}% margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              ${(expenses / 1000000).toFixed(2)}M
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {((expenses / revenue) * 100).toFixed(1)}% of revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Profit Margin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {profitMargin}%
            </div>
            <p className="text-xs text-green-600 mt-1">Healthy margin</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analysis */}
      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="ratios">Financial Ratios</TabsTrigger>
          <TabsTrigger value="health">Financial Health</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6">
          {/* Revenue Chart */}
          {data.months && (
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Profit Trend</CardTitle>
                <CardDescription>Monthly performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart data={data.months} />
              </CardContent>
            </Card>
          )}

          {/* Expense Breakdown */}
          {data.expenseBreakdown && (
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Distribution of operating costs</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseChart data={data.expenseBreakdown} />
              </CardContent>
            </Card>
          )}

          {/* Cash Flow */}
          {data.months && document.type === 'cashflow' && (
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Analysis</CardTitle>
                <CardDescription>Operating, investing, and financing activities</CardDescription>
              </CardHeader>
              <CardContent>
                <CashFlowChart data={data.months} />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="insights">
          <FinancialInsights
            document={document}
            metrics={{
              revenue,
              profit,
              profitMargin: parseFloat(profitMargin),
              expenses,
              currentRatio,
            }}
          />
        </TabsContent>

        <TabsContent value="ratios">
          <FinancialRatios
            data={data}
            type={document.type}
          />
        </TabsContent>

        <TabsContent value="health">
          <FinancialHealth
            data={data}
            type={document.type}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
