'use client'

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface RevenueChartProps {
  data: Array<{
    month: string
    revenue: number
    expenses: number
    profit: number
  }>
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
        <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
        <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
        <Line dataKey="profit" stroke="#10b981" name="Profit" strokeWidth={2} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
