'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface CashFlowChartProps {
  data: Array<{
    month: string
    operating: number
    investing: number
    financing: number
    ending: number
  }>
}

export default function CashFlowChart({ data }: CashFlowChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
        <XAxis dataKey="month" className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: 'none',
            borderRadius: '6px',
            color: '#f3f4f6',
          }}
          formatter={(value) => `$${(value / 1000).toFixed(0)}K`}
        />
        <Legend />
        <Bar dataKey="operating" fill="#10b981" name="Operating" />
        <Bar dataKey="investing" fill="#f59e0b" name="Investing" />
        <Bar dataKey="financing" fill="#3b82f6" name="Financing" />
      </BarChart>
    </ResponsiveContainer>
  )
}
