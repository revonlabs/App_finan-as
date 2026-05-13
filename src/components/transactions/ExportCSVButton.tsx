'use client'

import { Download } from 'lucide-react'
import type { Transaction } from '@/types'
import { getCategoryLabel } from '@/lib/categories'
import { format } from 'date-fns'

interface ExportCSVButtonProps {
  transactions: Transaction[]
}

export function ExportCSVButton({ transactions }: ExportCSVButtonProps) {
  function exportCSV() {
    const headers = ['Data', 'Descrição', 'Tipo', 'Categoria', 'Status', 'Valor (R$)', 'Observações']

    const rows = transactions.map(t => [
      format(new Date(t.date + 'T00:00:00'), 'dd/MM/yyyy'),
      `"${t.description.replace(/"/g, '""')}"`,
      t.type === 'receita' ? 'Receita' : 'Despesa',
      getCategoryLabel(t.category),
      t.status === 'pago' ? 'Pago' : t.status === 'pendente' ? 'Pendente' : 'Cancelado',
      t.amount.toFixed(2).replace('.', ','),
      t.notes ? `"${t.notes.replace(/"/g, '""')}"` : '',
    ])

    const csv = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `revon-finance-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={exportCSV}
      disabled={transactions.length === 0}
      className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-[#3BFFA0] border border-[#3BFFA0]/30 hover:bg-[#3BFFA0]/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <Download size={14} />
      Exportar CSV
    </button>
  )
}
