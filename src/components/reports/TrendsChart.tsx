'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, LineChart, Line
} from 'recharts'
import type { MonthlyTrend } from '@/types'

interface TrendsChartProps {
  data: MonthlyTrend[]
  type?: 'bar' | 'line'
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value)
}

const tooltipStyle = {
  contentStyle: {
    background: '#0D1B2E',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    color: '#F0F8FF',
    fontSize: '13px',
  },
}

export function TrendsChart({ data, type = 'bar' }: TrendsChartProps) {
  const axisStyle = { fill: '#4A6785', fontSize: 11 }

  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={v => `R$${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
          <Tooltip {...tooltipStyle} formatter={(v) => formatCurrency(Number(v))} />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#8BACD4' }} />
          <Line type="monotone" dataKey="receitas" name="Receitas" stroke="#3BFFA0" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="despesas" name="Despesas" stroke="#FF7043" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="saldo" name="Saldo" stroke="#4A90E2" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="4 2" />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }} barSize={18}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={v => `R$${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip {...tooltipStyle} formatter={(v) => formatCurrency(Number(v))} />
        <Legend wrapperStyle={{ fontSize: '12px', color: '#8BACD4' }} />
        <Bar dataKey="receitas" name="Receitas" fill="#3BFFA0" radius={[4, 4, 0, 0]} />
        <Bar dataKey="despesas" name="Despesas" fill="#FF7043" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
