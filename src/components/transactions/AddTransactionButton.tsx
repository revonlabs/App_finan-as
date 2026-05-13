'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { TransactionForm } from './TransactionForm'
import { useRouter } from 'next/navigation'

export function AddTransactionButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-[#060B14] transition-opacity hover:opacity-90"
        style={{ background: 'linear-gradient(135deg, #3BFFA0, #4A90E2)' }}
      >
        <Plus size={16} />
        Nova Transação
      </button>

      {open && (
        <TransactionForm
          onClose={() => setOpen(false)}
          onSuccess={() => { setOpen(false); router.refresh() }}
        />
      )}
    </>
  )
}
