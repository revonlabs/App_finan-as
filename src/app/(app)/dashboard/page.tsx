import { Suspense } from 'react'
import { getDashboardSummary } from '@/lib/actions/transactions'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { CategoryChart } from '@/components/dashboard/CategoryChart'
import { RecentTransactions } from '@/components/dashboard/RecentTransactions'
import { MonthSelector } from '@/components/MonthSelector'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  searchParams: Promise<{ month?: string; year?: string }>
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams
  const now = new Date()
  const month = params.month ? parseInt(params.month) : now.getMonth() + 1
  const year = params.year ? parseInt(params.year) : now.getFullYear()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário'

  const { transactions } = await getDashboardSummary(month, year)

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-[#00D4AA] mb-1">
            Dashboard
          </p>
          <h1 className="text-2xl font-bold text-[#F0F8FF]">
            Olá, <span className="aurora-text">{name.split(' ')[0]}</span>
          </h1>
          <p className="text-[#8BACD4] text-sm mt-0.5">
            Visão financeira de {monthNames[month - 1]} {year}
          </p>
        </div>
        <MonthSelector currentMonth={month} currentYear={year} />
      </div>

      <SummaryCards transactions={transactions} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-[#0D1B2E] border border-white/[0.07] rounded-2xl p-6">
          <p className="text-xs font-bold tracking-widest uppercase text-[#8BACD4] mb-4">
            Despesas por Categoria
          </p>
          <Suspense fallback={<div className="h-64 animate-pulse bg-white/[0.03] rounded-xl" />}>
            <CategoryChart transactions={transactions} />
          </Suspense>
        </div>

        <div className="lg:col-span-3 bg-[#0D1B2E] border border-white/[0.07] rounded-2xl p-6">
          <p className="text-xs font-bold tracking-widest uppercase text-[#8BACD4] mb-4">
            Últimas Transações
          </p>
          <RecentTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  )
}
