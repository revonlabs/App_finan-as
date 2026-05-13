'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { deleteTransaction } from '@/lib/actions/transactions'
import { getCategoryLabel } from '@/lib/categories'
import { TransactionForm } from './TransactionForm'
import type { Transaction } from '@/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface TransactionListProps {
  transactions: Transaction[]
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

const statusStyles: Record<string, string> = {
  pago: 'text-[#3BFFA0] bg-[#3BFFA0]/10 border border-[#3BFFA0]/20',
  pendente: 'text-[#FFAB40] bg-[#FFAB40]/10 border border-[#FFAB40]/20',
  cancelado: 'text-[#8BACD4] bg-white/[0.05] border border-white/10',
}

const statusLabels: Record<string, string> = {
  pago: 'Pago',
  pendente: 'Pendente',
  cancelado: 'Cancelado',
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [editing, setEditing] = useState<Transaction | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  async function handleDelete(id: string) {
    if (!confirm('Excluir esta transação?')) return
    setDeleting(id)
    const result = await deleteTransaction(id)
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success('Transação excluída')
      router.refresh()
    }
    setDeleting(null)
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-[#4A6785] text-sm">Nenhuma transação encontrada.</p>
        <p className="text-[#4A6785] text-xs mt-1">Ajuste os filtros ou adicione uma nova transação.</p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {['Data', 'Descrição', 'Categoria', 'Tipo', 'Status', 'Valor', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase text-[#4A6785]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-4 text-sm text-[#8BACD4] whitespace-nowrap">
                  {format(new Date(t.date + 'T00:00:00'), 'dd/MM/yyyy')}
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm font-medium text-[#F0F8FF]">{t.description}</p>
                  {t.notes && <p className="text-xs text-[#4A6785] mt-0.5 truncate max-w-[200px]">{t.notes}</p>}
                </td>
                <td className="px-4 py-4 text-sm text-[#8BACD4]">{getCategoryLabel(t.category)}</td>
                <td className="px-4 py-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    t.type === 'receita'
                      ? 'text-[#3BFFA0] bg-[#3BFFA0]/10 border border-[#3BFFA0]/20'
                      : 'text-[#FF7043] bg-[#FF7043]/10 border border-[#FF7043]/20'
                  }`}>
                    {t.type === 'receita' ? 'Receita' : 'Despesa'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyles[t.status]}`}>
                    {statusLabels[t.status]}
                  </span>
                </td>
                <td className={`px-4 py-4 text-sm font-bold ${t.type === 'receita' ? 'text-[#3BFFA0]' : 'text-[#FF7043]'}`}>
                  {t.type === 'receita' ? '+' : '-'}{formatCurrency(t.amount)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditing(t)}
                      className="p-1.5 rounded-lg text-[#8BACD4] hover:text-[#3BFFA0] hover:bg-[#3BFFA0]/10 transition-all"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      disabled={deleting === t.id}
                      className="p-1.5 rounded-lg text-[#8BACD4] hover:text-[#FF7043] hover:bg-[#FF7043]/10 transition-all disabled:opacity-50"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {transactions.map(t => (
          <div key={t.id} className="bg-[#112240] border border-white/[0.06] rounded-xl p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#F0F8FF] truncate">{t.description}</p>
                <p className="text-xs text-[#8BACD4] mt-0.5">
                  {getCategoryLabel(t.category)} · {format(new Date(t.date + 'T00:00:00'), 'dd/MM/yyyy')}
                </p>
              </div>
              <span className={`text-sm font-bold flex-shrink-0 ${t.type === 'receita' ? 'text-[#3BFFA0]' : 'text-[#FF7043]'}`}>
                {t.type === 'receita' ? '+' : '-'}{formatCurrency(t.amount)}
              </span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyles[t.status]}`}>
                  {statusLabels[t.status]}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  t.type === 'receita'
                    ? 'text-[#3BFFA0] bg-[#3BFFA0]/10 border border-[#3BFFA0]/20'
                    : 'text-[#FF7043] bg-[#FF7043]/10 border border-[#FF7043]/20'
                }`}>
                  {t.type === 'receita' ? 'Receita' : 'Despesa'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(t)}
                  className="p-1.5 rounded-lg text-[#8BACD4] hover:text-[#3BFFA0] hover:bg-[#3BFFA0]/10 transition-all"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  disabled={deleting === t.id}
                  className="p-1.5 rounded-lg text-[#8BACD4] hover:text-[#FF7043] hover:bg-[#FF7043]/10 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <TransactionForm
          transaction={editing}
          onClose={() => setEditing(null)}
          onSuccess={() => { setEditing(null); router.refresh() }}
        />
      )}
    </>
  )
}
