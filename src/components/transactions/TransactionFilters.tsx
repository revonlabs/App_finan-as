'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { ALL_CATEGORIES } from '@/lib/categories'

export function TransactionFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`${pathname}?${params.toString()}`)
  }, [router, pathname, searchParams])

  const clearAll = () => {
    const params = new URLSearchParams()
    router.push(pathname)
  }

  const hasFilters = searchParams.toString() !== ''

  const now = new Date()
  const years = Array.from({ length: 5 }, (_, i) => now.getFullYear() - i)
  const months = [
    { value: '1', label: 'Janeiro' }, { value: '2', label: 'Fevereiro' },
    { value: '3', label: 'Março' }, { value: '4', label: 'Abril' },
    { value: '5', label: 'Maio' }, { value: '6', label: 'Junho' },
    { value: '7', label: 'Julho' }, { value: '8', label: 'Agosto' },
    { value: '9', label: 'Setembro' }, { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' }, { value: '12', label: 'Dezembro' },
  ]

  const selectClass = "bg-[#112240] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-[#F0F8FF] focus:outline-none focus:border-[#3BFFA0]/40 transition-all w-full"

  return (
    <div className="bg-[#0D1B2E] border border-white/[0.07] rounded-2xl p-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Search */}
        <div className="col-span-2 md:col-span-2 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A6785]" />
          <input
            type="text"
            placeholder="Buscar por descrição..."
            defaultValue={searchParams.get('search') || ''}
            onChange={e => updateFilter('search', e.target.value)}
            className="w-full bg-[#112240] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#F0F8FF] placeholder:text-[#4A6785] focus:outline-none focus:border-[#3BFFA0]/40 transition-all"
          />
        </div>

        {/* Month */}
        <select
          value={searchParams.get('month') || ''}
          onChange={e => updateFilter('month', e.target.value)}
          className={selectClass}
        >
          <option value="">Todos os meses</option>
          {months.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>

        {/* Year */}
        <select
          value={searchParams.get('year') || ''}
          onChange={e => updateFilter('year', e.target.value)}
          className={selectClass}
        >
          <option value="">Todos os anos</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        {/* Type */}
        <select
          value={searchParams.get('type') || ''}
          onChange={e => updateFilter('type', e.target.value)}
          className={selectClass}
        >
          <option value="">Todos os tipos</option>
          <option value="receita">Receitas</option>
          <option value="despesa">Despesas</option>
        </select>

        {/* Category - full width on small */}
        <div className="col-span-2 md:col-span-2">
          <select
            value={searchParams.get('category') || ''}
            onChange={e => updateFilter('category', e.target.value)}
            className={selectClass}
          >
            <option value="">Todas as categorias</option>
            {ALL_CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <select
          value={searchParams.get('status') || ''}
          onChange={e => updateFilter('status', e.target.value)}
          className={selectClass}
        >
          <option value="">Todos os status</option>
          <option value="pago">Pago</option>
          <option value="pendente">Pendente</option>
          <option value="cancelado">Cancelado</option>
        </select>

        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 justify-center col-span-2 md:col-span-2 py-2.5 rounded-xl text-xs font-semibold text-[#8BACD4] border border-white/10 hover:bg-white/[0.04] transition-all"
          >
            <X size={12} /> Limpar filtros
          </button>
        )}
      </div>
    </div>
  )
}
