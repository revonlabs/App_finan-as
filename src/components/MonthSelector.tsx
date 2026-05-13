'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MonthSelectorProps {
  currentMonth: number
  currentYear: number
}

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

export function MonthSelector({ currentMonth, currentYear }: MonthSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function navigate(month: number, year: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('month', String(month))
    params.set('year', String(year))
    router.push(`${pathname}?${params.toString()}`)
  }

  function prev() {
    if (currentMonth === 1) {
      navigate(12, currentYear - 1)
    } else {
      navigate(currentMonth - 1, currentYear)
    }
  }

  function next() {
    const now = new Date()
    const isCurrentMonth = currentMonth === now.getMonth() + 1 && currentYear === now.getFullYear()
    if (isCurrentMonth) return

    if (currentMonth === 12) {
      navigate(1, currentYear + 1)
    } else {
      navigate(currentMonth + 1, currentYear)
    }
  }

  const now = new Date()
  const isCurrentMonth = currentMonth === now.getMonth() + 1 && currentYear === now.getFullYear()

  return (
    <div className="flex items-center gap-2 bg-[#0D1B2E] border border-white/[0.07] rounded-2xl px-4 py-2">
      <button
        onClick={prev}
        className="text-[#8BACD4] hover:text-[#F0F8FF] transition-colors p-1"
      >
        <ChevronLeft size={16} />
      </button>
      <span className="text-sm font-semibold text-[#F0F8FF] min-w-[110px] text-center">
        {MONTHS[currentMonth - 1]} {currentYear}
      </span>
      <button
        onClick={next}
        disabled={isCurrentMonth}
        className="text-[#8BACD4] hover:text-[#F0F8FF] transition-colors p-1 disabled:opacity-30"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
