'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { Transaction } from '@/types'
import { getCategoryLabel, getCategoryColor } from '@/lib/categories'

interface CategoryChartProps {
  transactions: Transaction[]
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function CategoryChart({ transactions }: CategoryChartProps) {
  const despesas = transactions.filter(t => t.type === 'despesa' && t.status !== 'cancelado')

  const byCategory = despesas.reduce((acc, t) => {
    const key = t.category
    acc[key] = (acc[key] || 0) + t.amount
    return acc
  }, {} as Record<string, number>)

  const data = Object.entries(byCategory)
    .map(([cat, value]) => ({
      name: getCategoryLabel(cat),
      value,
      color: getCategoryColor(cat),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-[#4A6785] text-sm">
        Nenhuma despesa registrada neste período
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: '#0D1B2E',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            color: '#F0F8FF',
            fontSize: '13px',
          }}
          formatter={(value) => [formatCurrency(Number(value)), 'Valor']}
        />
        <Legend
          wrapperStyle={{ fontSize: '12px', color: '#8BACD4' }}
          formatter={(value) => value}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
