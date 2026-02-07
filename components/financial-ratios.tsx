'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'

interface FinancialRatiosProps {
  data: {
    revenue?: number
    profit?: number
    netIncome?: number
    costOfGoodsSold?: number
    operatingExpenses?: number
    assets?: number
    liabilities?: number
    equity?: number
    currentAssets?: number
    currentLiabilities?: number
    totalDebt?: number
    operatingCashFlow?: number
  }
  type: 'income' | 'balance' | 'cashflow' | 'other'
}

interface RatioMetric {
  name: string
  value: string | number
  interpretation: string
  signal: 'positive' | 'negative' | 'neutral' | 'warning'
  category: string
}

export default function FinancialRatios({ data, type }: FinancialRatiosProps) {
  const calculateRatios = (): RatioMetric[] => {
    const ratios: RatioMetric[] = []

    // Profitability Ratios
    const revenue = data.revenue || 0
    const netIncome = data.netIncome || data.profit || 0
    const costOfGoods = data.costOfGoodsSold || 0
    const operatingExpenses = data.operatingExpenses || 0

    // Gross Profit Margin
    if (revenue > 0 && costOfGoods > 0) {
      const grossMargin = ((revenue - costOfGoods) / revenue) * 100
      ratios.push({
        name: 'Gross Profit Margin',
        value: `${grossMargin.toFixed(1)}%`,
        interpretation: grossMargin > 50 ? 'Excellent cost control' : grossMargin > 30 ? 'Healthy margin' : 'Below industry average',
        signal: grossMargin > 40 ? 'positive' : grossMargin > 25 ? 'neutral' : 'warning',
        category: 'Profitability',
      })
    }

    // Net Profit Margin
    if (revenue > 0 && netIncome > 0) {
      const netMargin = (netIncome / revenue) * 100
      ratios.push({
        name: 'Net Profit Margin',
        value: `${netMargin.toFixed(1)}%`,
        interpretation: netMargin > 20 ? 'Exceptional profitability' : netMargin > 10 ? 'Healthy profitability' : 'Moderate profitability',
        signal: netMargin > 15 ? 'positive' : netMargin > 5 ? 'neutral' : 'warning',
        category: 'Profitability',
      })
    }

    // Operating Profit Margin
    if (revenue > 0 && operatingExpenses > 0) {
      const operatingMargin = ((revenue - operatingExpenses) / revenue) * 100
      ratios.push({
        name: 'Operating Margin',
        value: `${operatingMargin.toFixed(1)}%`,
        interpretation: operatingMargin > 15 ? 'Strong operational efficiency' : operatingMargin > 5 ? 'Acceptable efficiency' : 'Room for improvement',
        signal: operatingMargin > 12 ? 'positive' : operatingMargin > 3 ? 'neutral' : 'warning',
        category: 'Profitability',
      })
    }

    // Liquidity Ratios
    const currentAssets = data.currentAssets || 0
    const currentLiabilities = data.currentLiabilities || 0
    const assets = data.assets || 0
    const liabilities = data.liabilities || 0
    const equity = data.equity || 0

    // Current Ratio
    if (currentAssets > 0 && currentLiabilities > 0) {
      const currentRatio = currentAssets / currentLiabilities
      ratios.push({
        name: 'Current Ratio',
        value: currentRatio.toFixed(2),
        interpretation: currentRatio > 2 ? 'Strong liquidity position' : currentRatio > 1.5 ? 'Healthy liquidity' : currentRatio > 1 ? 'Adequate liquidity' : 'Potential liquidity concerns',
        signal: currentRatio > 1.5 ? 'positive' : currentRatio > 1 ? 'neutral' : 'warning',
        category: 'Liquidity',
      })
    }

    // Solvency Ratios
    // Debt-to-Equity Ratio
    if (liabilities > 0 && equity > 0) {
      const debtToEquity = liabilities / equity
      ratios.push({
        name: 'Debt-to-Equity Ratio',
        value: debtToEquity.toFixed(2),
        interpretation: debtToEquity < 1 ? 'Conservative capital structure' : debtToEquity < 2 ? 'Moderate leverage' : 'High leverage risk',
        signal: debtToEquity < 1 ? 'positive' : debtToEquity < 2 ? 'neutral' : 'negative',
        category: 'Solvency',
      })
    }

    // Debt-to-Assets Ratio
    if (liabilities > 0 && assets > 0) {
      const debtToAssets = liabilities / assets
      ratios.push({
        name: 'Debt-to-Assets Ratio',
        value: `${(debtToAssets * 100).toFixed(1)}%`,
        interpretation: debtToAssets < 0.3 ? 'Low financial risk' : debtToAssets < 0.6 ? 'Moderate financial risk' : 'High financial risk',
        signal: debtToAssets < 0.4 ? 'positive' : debtToAssets < 0.6 ? 'neutral' : 'negative',
        category: 'Solvency',
      })
    }

    // Efficiency Ratios
    // Return on Assets (ROA)
    if (netIncome > 0 && assets > 0) {
      const roa = (netIncome / assets) * 100
      ratios.push({
        name: 'Return on Assets (ROA)',
        value: `${roa.toFixed(1)}%`,
        interpretation: roa > 10 ? 'Excellent asset efficiency' : roa > 5 ? 'Good asset efficiency' : 'Moderate asset efficiency',
        signal: roa > 8 ? 'positive' : roa > 3 ? 'neutral' : 'warning',
        category: 'Efficiency',
      })
    }

    // Return on Equity (ROE)
    if (netIncome > 0 && equity > 0) {
      const roe = (netIncome / equity) * 100
      ratios.push({
        name: 'Return on Equity (ROE)',
        value: `${roe.toFixed(1)}%`,
        interpretation: roe > 15 ? 'Exceptional shareholder returns' : roe > 10 ? 'Strong shareholder returns' : 'Moderate shareholder returns',
        signal: roe > 15 ? 'positive' : roe > 8 ? 'neutral' : 'warning',
        category: 'Efficiency',
      })
    }

    // Cash Flow Ratios
    const operatingCashFlow = data.operatingCashFlow || 0

    // Operating Cash Flow Ratio
    if (operatingCashFlow > 0 && currentLiabilities > 0) {
      const ocfRatio = operatingCashFlow / currentLiabilities
      ratios.push({
        name: 'Operating Cash Flow Ratio',
        value: ocfRatio.toFixed(2),
        interpretation: ocfRatio > 1 ? 'Strong cash generation' : ocfRatio > 0.5 ? 'Adequate cash flow' : 'Weak cash generation',
        signal: ocfRatio > 0.8 ? 'positive' : ocfRatio > 0.3 ? 'neutral' : 'warning',
        category: 'Cash Flow',
      })
    }

    return ratios
  }

  const ratios = calculateRatios()
  const categories = ['Profitability', 'Liquidity', 'Solvency', 'Efficiency', 'Cash Flow']
  const signalColors = {
    positive: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    negative: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    neutral: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-slate-600 dark:text-slate-400 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
        📊 <strong>Financial Ratios</strong> — Industry-standard metrics to evaluate financial health and performance.
      </div>

      {ratios.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-slate-600 dark:text-slate-400">
            Not enough data to calculate ratios. Upload more financial documents to get comprehensive analysis.
          </CardContent>
        </Card>
      ) : (
        categories.map((category) => {
          const categoryRatios = ratios.filter((r) => r.category === category)
          if (categoryRatios.length === 0) return null

          return (
            <div key={category}>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                {category === 'Profitability' && '💰'}
                {category === 'Liquidity' && '💧'}
                {category === 'Solvency' && '🔒'}
                {category === 'Efficiency' && '⚡'}
                {category === 'Cash Flow' && '💵'}
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryRatios.map((ratio, idx) => (
                  <Card key={idx}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-base">{ratio.name}</CardTitle>
                        <Badge className={signalColors[ratio.signal]}>
                          {ratio.signal === 'positive' && '✓'}
                          {ratio.signal === 'negative' && '✗'}
                          {ratio.signal === 'warning' && '⚠'}
                          {ratio.signal === 'neutral' && 'ℹ'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">
                        {ratio.value}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {ratio.interpretation}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })
      )}

      {/* Ratio Interpretation Guide */}
      <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="text-base">Understanding Financial Ratios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <div>
            <span className="font-semibold">Profitability Ratios:</span> Measure how effectively the company converts revenue into profit. Higher margins indicate stronger profitability.
          </div>
          <div>
            <span className="font-semibold">Liquidity Ratios:</span> Assess ability to meet short-term obligations. A current ratio above 1.5 indicates good short-term financial health.
          </div>
          <div>
            <span className="font-semibold">Solvency Ratios:</span> Evaluate long-term financial stability and leverage. Lower debt ratios indicate less financial risk.
          </div>
          <div>
            <span className="font-semibold">Efficiency Ratios:</span> Show how well assets and equity generate returns. Higher ROA and ROE are desirable.
          </div>
          <div>
            <span className="font-semibold">Cash Flow Ratios:</span> Measure cash generation ability. Strong cash flow indicates operational sustainability.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
