'use client'

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

interface ExpenseChartProps {
  data: Array<{
    category: string
    amount: number
    percentage: number
  }>
}

const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export default function ExpenseChart({ data }: ExpenseChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ category, percentage }) => `${category} (${percentage}%)`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="amount"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          contentStyle={{
            backgroundColor: '#1f2937',
            border: 'none',
            borderRadius: '6px',
            color: '#f3f4f6',
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
