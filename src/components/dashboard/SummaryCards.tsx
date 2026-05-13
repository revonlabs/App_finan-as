import { TrendingUp, TrendingDown, Wallet, AlertTriangle } from 'lucide-react'
import type { Transaction } from '@/types'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

interface SummaryCardsProps {
  transactions: Transaction[]
}

export function SummaryCards({ transactions }: SummaryCardsProps) {
  const active = transactions.filter(t => t.status !== 'cancelado')
  const receitas = active.filter(t => t.type === 'receita').reduce((s, t) => s + t.amount, 0)
  const despesas = active.filter(t => t.type === 'despesa').reduce((s, t) => s + t.amount, 0)
  const saldo = receitas - despesas

  // Alert: variáveis > 60% of total despesas
  const variavelCategories = ['combustivel', 'publicidade_digital', 'publicidade_offline', 'material_marketing', 'eventos_feiras', 'material_escritorio', 'servicos_gerais']
  const despesasVariaveis = active
    .filter(t => t.type === 'despesa' && variavelCategories.includes(t.category))
    .reduce((s, t) => s + t.amount, 0)
  const variavelPercent = despesas > 0 ? (despesasVariaveis / despesas) * 100 : 0
  const showAlert = variavelPercent > 60

  return (
    <div className="space-y-4">
      {showAlert && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FF7043]/10 border border-[#FF7043]/30">
          <AlertTriangle size={18} className="text-[#FF7043] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-[#F0F8FF]">
            <span className="font-bold text-[#FF7043]">Atenção:</span> Despesas variáveis representam{' '}
            <span className="font-bold">{variavelPercent.toFixed(0)}%</span> do total —
            acima do limite recomendado de 60%.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0D1B2E] border border-white/[0.07] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold tracking-widest uppercase text-[#8BACD4]">Receitas</p>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#3BFFA0]/10">
              <TrendingUp size={18} className="text-[#3BFFA0]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#3BFFA0]">{formatCurrency(receitas)}</p>
          <p className="text-xs text-[#8BACD4] mt-1">
            {active.filter(t => t.type === 'receita').length} transações
          </p>
        </div>

        <div className="bg-[#0D1B2E] border border-white/[0.07] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold tracking-widest uppercase text-[#8BACD4]">Despesas</p>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#FF7043]/10">
              <TrendingDown size={18} className="text-[#FF7043]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#FF7043]">{formatCurrency(despesas)}</p>
          <p className="text-xs text-[#8BACD4] mt-1">
            {active.filter(t => t.type === 'despesa').length} transações
          </p>
        </div>

        <div
          className="border rounded-2xl p-6"
          style={{
            background: saldo >= 0
              ? 'linear-gradient(135deg, rgba(59,255,160,0.05), rgba(74,144,226,0.07))'
              : 'linear-gradient(135deg, rgba(255,112,67,0.05), rgba(255,171,64,0.07))',
            borderColor: saldo >= 0 ? 'rgba(59,255,160,0.14)' : 'rgba(255,112,67,0.14)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold tracking-widest uppercase text-[#8BACD4]">Saldo</p>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: saldo >= 0 ? 'rgba(59,255,160,0.1)' : 'rgba(255,112,67,0.1)' }}
            >
              <Wallet size={18} style={{ color: saldo >= 0 ? '#3BFFA0' : '#FF7043' }} />
            </div>
          </div>
          <p
            className="text-2xl font-bold"
            style={{ color: saldo >= 0 ? '#3BFFA0' : '#FF7043' }}
          >
            {formatCurrency(saldo)}
          </p>
          <p className="text-xs text-[#8BACD4] mt-1">
            {saldo >= 0 ? 'Resultado positivo' : 'Resultado negativo'}
          </p>
        </div>
      </div>
    </div>
  )
}
