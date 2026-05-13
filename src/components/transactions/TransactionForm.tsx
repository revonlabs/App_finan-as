'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { createTransaction, updateTransaction } from '@/lib/actions/transactions'
import { getCategoriesByType, groupCategoriesByParent } from '@/lib/categories'
import type { Transaction, TransactionType } from '@/types'
import { X } from 'lucide-react'

interface TransactionFormProps {
  transaction?: Transaction
  onClose: () => void
  onSuccess: () => void
}

export function TransactionForm({ transaction, onClose, onSuccess }: TransactionFormProps) {
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<TransactionType>(transaction?.type || 'despesa')

  const categories = getCategoriesByType(type)
  const grouped = groupCategoriesByParent(categories)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      description: formData.get('description') as string,
      amount: parseFloat(formData.get('amount') as string),
      date: formData.get('date') as string,
      type,
      category: formData.get('category') as string,
      status: formData.get('status') as 'pago' | 'pendente' | 'cancelado',
      notes: formData.get('notes') as string || undefined,
    }

    const result = transaction
      ? await updateTransaction(transaction.id, data)
      : await createTransaction(data)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success(transaction ? 'Transação atualizada!' : 'Transação criada! As faíscas subiram.')
      onSuccess()
      onClose()
    }

    setLoading(false)
  }

  const inputClass = "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[#F0F8FF] text-sm placeholder:text-[#4A6785] focus:outline-none focus:border-[#3BFFA0]/40 focus:shadow-[0_0_0_3px_rgba(59,255,160,0.08)] transition-all"
  const labelClass = "block text-xs font-semibold text-[#8BACD4] uppercase tracking-widest mb-2"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0D1B2E] border border-white/[0.08] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/[0.07]">
          <h2 className="text-lg font-bold text-[#F0F8FF]">
            {transaction ? 'Editar Transação' : 'Nova Transação'}
          </h2>
          <button onClick={onClose} className="text-[#8BACD4] hover:text-[#F0F8FF] transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Type toggle */}
          <div>
            <label className={labelClass}>Tipo</label>
            <div className="flex gap-2">
              {(['receita', 'despesa'] as TransactionType[]).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${
                    type === t
                      ? t === 'receita'
                        ? 'bg-[#3BFFA0]/20 text-[#3BFFA0] border border-[#3BFFA0]/30'
                        : 'bg-[#FF7043]/20 text-[#FF7043] border border-[#FF7043]/30'
                      : 'bg-white/[0.04] text-[#8BACD4] border border-white/10 hover:bg-white/[0.07]'
                  }`}
                >
                  {t === 'receita' ? 'Receita' : 'Despesa'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Descrição</label>
            <input
              name="description"
              required
              defaultValue={transaction?.description}
              placeholder="Ex: Assinatura Adobe"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Valor (R$)</label>
              <input
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                required
                defaultValue={transaction?.amount}
                placeholder="0,00"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Data</label>
              <input
                name="date"
                type="date"
                required
                defaultValue={transaction?.date || new Date().toISOString().split('T')[0]}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Categoria</label>
            <select
              name="category"
              required
              defaultValue={transaction?.category}
              className={inputClass}
            >
              <option value="">Selecione uma categoria</option>
              {Object.entries(grouped).map(([group, cats]) => (
                <optgroup key={group} label={group}>
                  {cats.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              name="status"
              defaultValue={transaction?.status || 'pago'}
              className={inputClass}
            >
              <option value="pago">Pago / Recebido</option>
              <option value="pendente">Pendente</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Observações (opcional)</label>
            <textarea
              name="notes"
              rows={2}
              defaultValue={transaction?.notes}
              placeholder="Detalhes adicionais..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full text-sm font-semibold text-[#8BACD4] border border-white/10 hover:bg-white/[0.04] transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-full text-sm font-bold text-[#060B14] disabled:opacity-60 transition-all"
              style={{ background: 'linear-gradient(135deg, #3BFFA0, #4A90E2)' }}
            >
              {loading ? 'Salvando...' : transaction ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
