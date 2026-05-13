import { getMonthlyTrends, getTransactions } from '@/lib/actions/transactions'
import { TrendsChart } from '@/components/reports/TrendsChart'
import { CategoryChart } from '@/components/dashboard/CategoryChart'
import { getCategoryLabel } from '@/lib/categories'

interface PageProps {
  searchParams: Promise<{ year?: string }>
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export default async function ReportsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const year = params.year ? parseInt(params.year) : new Date().getFullYear()

  const [trends, allTransactions] = await Promise.all([
    getMonthlyTrends(year),
    getTransactions({ year }),
  ])

  const receitas = allTransactions.filter(t => t.type === 'receita' && t.status !== 'cancelado')
  const despesas = allTransactions.filter(t => t.type === 'despesa' && t.status !== 'cancelado')
  const totalReceitas = receitas.reduce((s, t) => s + t.amount, 0)
  const totalDespesas = despesas.reduce((s, t) => s + t.amount, 0)

  // Top categories
  const byCategory = despesas.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {} as Record<string, number>)
  const topCategories = Object.entries(byCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-[#00D4AA] mb-1">
            Análise
          </p>
          <h1 className="text-2xl font-bold text-[#F0F8FF]">Relatórios</h1>
          <p className="text-[#8BACD4] text-sm mt-0.5">Tendências financeiras de {year}</p>
        </div>
        <form className="flex items-center gap-2">
          <select
            name="year"
            defaultValue={year}
            onChange={e => {
              const url = new URL(window.location.href)
              url.searchParams.set('year', e.target.value)
              window.location.href = url.toString()
            }}
            className="bg-[#0D1B2E] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-[#F0F8FF] focus:outline-none focus:border-[#3BFFA0]/40 transition-all"
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </form>
      </div>

      {/* Annual summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Receita Anual', value: totalReceitas, color: '#3BFFA0' },
          { label: 'Despesa Anual', value: totalDespesas, color: '#FF7043' },
          { label: 'Saldo Anual', value: totalReceitas - totalDespesas, color: totalReceitas - totalDespesas >= 0 ? '#3BFFA0' : '#FF7043' },
        ].map(card => (
          <div key={card.label} className="bg-[#0D1B2E] border border-white/[0.07] rounded-2xl p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-[#8BACD4] mb-2">{card.label}</p>
            <p className="text-xl font-bold" style={{ color: card.color }}>{formatCurrency(card.value)}</p>
          </div>
        ))}
      </div>

      {/* Monthly trends bar chart */}
      <div className="bg-[#0D1B2E] border border-white/[0.07] rounded-2xl p-6">
        <p className="text-xs font-bold tracking-widest uppercase text-[#8BACD4] mb-6">
          Receitas vs Despesas por Mês
        </p>
        <TrendsChart data={trends} type="bar" />
      </div>

      {/* Line chart - saldo trend */}
      <div className="bg-[#0D1B2E] border border-white/[0.07] rounded-2xl p-6">
        <p className="text-xs font-bold tracking-widest uppercase text-[#8BACD4] mb-6">
          Evolução do Saldo
        </p>
        <TrendsChart data={trends} type="line" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top categories */}
        <div className="bg-[#0D1B2E] border border-white/[0.07] rounded-2xl p-6">
          <p className="text-xs font-bold tracking-widest uppercase text-[#8BACD4] mb-4">
            Top 5 Despesas por Categoria
          </p>
          {topCategories.length === 0 ? (
            <p className="text-[#4A6785] text-sm py-8 text-center">Sem dados para este período</p>
          ) : (
            <div className="space-y-3">
              {topCategories.map(([cat, value]) => {
                const percent = totalDespesas > 0 ? (value / totalDespesas) * 100 : 0
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-[#F0F8FF]">{getCategoryLabel(cat)}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#8BACD4]">{percent.toFixed(1)}%</span>
                        <span className="text-sm font-bold text-[#FF7043]">{formatCurrency(value)}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${percent}%`,
                          background: 'linear-gradient(90deg, #FF7043, #FFAB40)',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Pie chart */}
        <div className="bg-[#0D1B2E] border border-white/[0.07] rounded-2xl p-6">
          <p className="text-xs font-bold tracking-widest uppercase text-[#8BACD4] mb-4">
            Distribuição de Despesas
          </p>
          <CategoryChart transactions={allTransactions} />
        </div>
      </div>
    </div>
  )
}
