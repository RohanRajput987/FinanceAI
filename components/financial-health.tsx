'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, TrendingUp, Shield, AlertTriangle } from 'lucide-react'

interface FinancialHealthProps {
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
    operatingCashFlow?: number
    months?: Array<{ revenue: number; profit: number }>
  }
  type: 'income' | 'balance' | 'cashflow' | 'other'
}

interface HealthScore {
  category: string
  score: number
  maxScore: number
  status: 'Healthy' | 'Moderate' | 'Risky'
  details: string[]
}

export default function FinancialHealth({ data, type }: FinancialHealthProps) {
  const calculateHealthScores = (): HealthScore[] => {
    const scores: HealthScore[] = []
    const revenue = data.revenue || 0
    const profit = data.netIncome || data.profit || 0
    const assets = data.assets || 0
    const liabilities = data.liabilities || 0
    const equity = data.equity || 0
    const currentAssets = data.currentAssets || 0
    const currentLiabilities = data.currentLiabilities || 0

    // Profitability Score
    let profScore = 0
    let profDetails: string[] = []
    const netMargin = revenue > 0 ? (profit / revenue) * 100 : 0
    if (netMargin > 15) {
      profScore = 9
      profDetails.push('Excellent profit margins (>15%)')
    } else if (netMargin > 8) {
      profScore = 6
      profDetails.push('Healthy profit margins (8-15%)')
    } else if (netMargin > 0) {
      profScore = 3
      profDetails.push('Moderate profit margins (0-8%)')
    } else {
      profScore = 0
      profDetails.push('Operating at a loss')
    }

    if (data.months && data.months.length > 1) {
      const trend = data.months[data.months.length - 1].profit - data.months[0].profit
      if (trend > 0) {
        profScore += 1
        profDetails.push('Profit trending upward')
      }
    }

    scores.push({
      category: 'Profitability',
      score: Math.min(profScore, 10),
      maxScore: 10,
      status: profScore > 7 ? 'Healthy' : profScore > 4 ? 'Moderate' : 'Risky',
      details: profDetails,
    })

    // Liquidity Score
    let liqScore = 0
    let liqDetails: string[] = []
    if (currentAssets > 0 && currentLiabilities > 0) {
      const currentRatio = currentAssets / currentLiabilities
      if (currentRatio > 2) {
        liqScore = 9
        liqDetails.push('Strong liquidity position (ratio >2)')
      } else if (currentRatio > 1.5) {
        liqScore = 7
        liqDetails.push('Healthy liquidity (ratio 1.5-2)')
      } else if (currentRatio > 1) {
        liqScore = 4
        liqDetails.push('Adequate liquidity (ratio 1-1.5)')
      } else {
        liqScore = 1
        liqDetails.push('Liquidity concerns (ratio <1)')
      }
    } else {
      liqScore = 5
      liqDetails.push('Insufficient data for liquidity assessment')
    }

    scores.push({
      category: 'Liquidity',
      score: liqScore,
      maxScore: 10,
      status: liqScore > 7 ? 'Healthy' : liqScore > 4 ? 'Moderate' : 'Risky',
      details: liqDetails,
    })

    // Solvency Score
    let solvScore = 0
    let solvDetails: string[] = []
    if (liabilities > 0 && equity > 0) {
      const debtToEquity = liabilities / equity
      if (debtToEquity < 0.5) {
        solvScore = 9
        solvDetails.push('Low leverage, conservative capital structure')
      } else if (debtToEquity < 1) {
        solvScore = 7
        solvDetails.push('Moderate leverage, balanced capital structure')
      } else if (debtToEquity < 2) {
        solvScore = 4
        solvDetails.push('Higher leverage, elevated risk')
      } else {
        solvScore = 1
        solvDetails.push('Very high leverage, significant solvency risk')
      }
    } else {
      solvScore = 5
      solvDetails.push('Insufficient data for solvency assessment')
    }

    const equityRatio = assets > 0 && equity > 0 ? (equity / assets) * 100 : 0
    if (equityRatio > 60) {
      solvDetails.push('Strong equity base (>60% of assets)')
    }

    scores.push({
      category: 'Solvency',
      score: solvScore,
      maxScore: 10,
      status: solvScore > 7 ? 'Healthy' : solvScore > 4 ? 'Moderate' : 'Risky',
      details: solvDetails,
    })

    // Cash Flow Score
    let cfScore = 0
    let cfDetails: string[] = []
    const operatingCashFlow = data.operatingCashFlow || 0
    if (operatingCashFlow > profit && profit > 0) {
      cfScore = 9
      cfDetails.push('Strong cash generation exceeding profit')
    } else if (operatingCashFlow > 0 && profit > 0) {
      cfScore = 6
      cfDetails.push('Positive operating cash flow')
    } else if (operatingCashFlow > 0) {
      cfScore = 4
      cfDetails.push('Positive cash flow despite losses')
    } else {
      cfScore = 1
      cfDetails.push('Negative cash flow - liquidity pressure')
    }

    scores.push({
      category: 'Cash Flow',
      score: cfScore,
      maxScore: 10,
      status: cfScore > 7 ? 'Healthy' : cfScore > 4 ? 'Moderate' : 'Risky',
      details: cfDetails,
    })

    return scores
  }

  const healthScores = calculateHealthScores()
  const overallScore = healthScores.reduce((sum, s) => sum + s.score, 0) / healthScores.length
  
  const overallStatus: 'Healthy' | 'Moderate' | 'Risky' =
    overallScore > 7 ? 'Healthy' : overallScore > 4 ? 'Moderate' : 'Risky'

  const statusColors = {
    Healthy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Moderate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Risky: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  }

  const statusIcons = {
    Healthy: <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />,
    Moderate: <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />,
    Risky: <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />,
  }

  return (
    <div className="space-y-6">
      {/* Overall Health Summary */}
      <Card className="border-2 border-slate-300 dark:border-slate-700">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Financial Health Assessment</CardTitle>
              <CardDescription>Overall company financial condition</CardDescription>
            </div>
            {statusIcons[overallStatus]}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="text-5xl font-bold text-slate-900 dark:text-white">
                {overallScore.toFixed(1)}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">/10</p>
            </div>
            <div className="flex-grow">
              <Badge className={`text-lg px-4 py-2 ${statusColors[overallStatus]}`}>
                {overallStatus}
              </Badge>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {overallStatus === 'Healthy' &&
                  'Your company demonstrates strong financial fundamentals with solid profitability, healthy liquidity, and conservative leverage. Continue monitoring key metrics for sustained performance.'}
                {overallStatus === 'Moderate' &&
                  'Your company shows acceptable financial performance but with some areas requiring attention. Consider strengthening profitability, liquidity, or reducing leverage to improve overall health.'}
                {overallStatus === 'Risky' &&
                  'Your company faces financial challenges that require immediate attention. Focus on improving profitability, strengthening liquidity position, and managing debt levels to reduce financial risk.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Category Scores */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Detailed Score Breakdown
        </h3>
        <div className="space-y-3">
          {healthScores.map((score, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        {score.category}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {score.details[0]}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {score.score}/{score.maxScore}
                      </div>
                      <Badge className={statusColors[score.status]}>
                        {score.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        score.status === 'Healthy'
                          ? 'bg-green-500'
                          : score.status === 'Moderate'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${(score.score / score.maxScore) * 100}%` }}
                    />
                  </div>

                  {/* Details */}
                  {score.details.length > 1 && (
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      {score.details.map((detail, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-slate-400">→</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Key Risks & Opportunities */}
      <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="text-base">Risk & Opportunity Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Key Risks
            </h4>
            <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
              {healthScores
                .filter((s) => s.status === 'Risky')
                .map((score, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span>⚠</span>
                    <span>
                      {score.category}: {score.details[0]}
                    </span>
                  </li>
                ))}
              {healthScores.filter((s) => s.status === 'Risky').length === 0 && (
                <li className="text-slate-600 dark:text-slate-400">No critical risks identified</li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Opportunities for Improvement
            </h4>
            <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
              {healthScores
                .filter((s) => s.status !== 'Healthy')
                .map((score, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span>→</span>
                    <span>Strengthen {score.category.toLowerCase()} performance</span>
                  </li>
                ))}
              {healthScores.filter((s) => s.status !== 'Healthy').length === 0 && (
                <li className="text-slate-600 dark:text-slate-400">
                  Continue maintaining strong financial performance
                </li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
