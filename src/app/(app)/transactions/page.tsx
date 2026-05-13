import { Suspense } from 'react'
import { getTransactions } from '@/lib/actions/transactions'
import { TransactionList } from '@/components/transactions/TransactionList'
import { TransactionFilters } from '@/components/transactions/TransactionFilters'
import { AddTransactionButton } from '@/components/transactions/AddTransactionButton'
import { ExportCSVButton } from '@/components/transactions/ExportCSVButton'
import type { TransactionFilters as Filters } from '@/types'

interface PageProps {
  searchParams: Promise<{
    month?: string
    year?: string
    type?: string
    category?: string
    status?: string
    search?: string
  }>
}

export default async function TransactionsPage({ searchParams }: PageProps) {
  const params = await searchParams

  const filters: Filters = {
    month: params.month ? parseInt(params.month) : undefined,
    year: params.year ? parseInt(params.year) : undefined,
    type: (params.type as Filters['type']) || 'all',
    category: params.category || undefined,
    status: (params.status as Filters['status']) || 'all',
    search: params.search || undefined,
  }

  const transactions = await getTransactions(filters)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-[#00D4AA] mb-1">
            Lançamentos
          </p>
          <h1 className="text-2xl font-bold text-[#F0F8FF]">Transações</h1>
          <p className="text-[#8BACD4] text-sm mt-0.5">
            {transactions.length} transação{transactions.length !== 1 ? 'ões' : ''} encontrada{transactions.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportCSVButton transactions={transactions} />
          <AddTransactionButton />
        </div>
      </div>

      <Suspense>
        <TransactionFilters />
      </Suspense>

      <div className="bg-[#0D1B2E] border border-white/[0.07] rounded-2xl overflow-hidden">
        <TransactionList transactions={transactions} />
      </div>
    </div>
  )
}
