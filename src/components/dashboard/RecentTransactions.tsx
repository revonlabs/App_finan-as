import type { Transaction } from '@/types'
import { getCategoryLabel } from '@/lib/categories'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'

interface RecentTransactionsProps {
  transactions: Transaction[]
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

const statusStyles: Record<string, string> = {
  pago: 'text-[#3BFFA0] bg-[#3BFFA0]/10',
  pendente: 'text-[#FFAB40] bg-[#FFAB40]/10',
  cancelado: 'text-[#8BACD4] bg-white/[0.05]',
}

const statusLabels: Record<string, string> = {
  pago: 'Pago',
  pendente: 'Pendente',
  cancelado: 'Cancelado',
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const recent = transactions.slice(0, 5)

  if (recent.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <p className="text-[#4A6785] text-sm">Nenhuma transação este mês.</p>
        <Link href="/transactions" className="mt-2 text-sm text-[#3BFFA0] hover:underline">
          Adicionar primeira transação →
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {recent.map((t) => (
        <div
          key={t.id}
          className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: t.type === 'receita' ? '#3BFFA0' : '#FF7043' }}
            />
            <div>
              <p className="text-sm font-medium text-[#F0F8FF] truncate max-w-[180px]">
                {t.description}
              </p>
              <p className="text-xs text-[#4A6785]">
                {getCategoryLabel(t.category)} ·{' '}
                {format(new Date(t.date + 'T00:00:00'), "d MMM", { locale: ptBR })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyles[t.status]}`}>
              {statusLabels[t.status]}
            </span>
            <span className={`text-sm font-bold ${t.type === 'receita' ? 'text-[#3BFFA0]' : 'text-[#FF7043]'}`}>
              {t.type === 'receita' ? '+' : '-'}{formatCurrency(t.amount)}
            </span>
          </div>
        </div>
      ))}

      <div className="pt-2">
        <Link
          href="/transactions"
          className="block text-center text-xs text-[#8BACD4] hover:text-[#3BFFA0] transition-colors py-2"
        >
          Ver todas as transações →
        </Link>
      </div>
    </div>
  )
}
