export type TransactionType = 'receita' | 'despesa'

export type TransactionStatus = 'pago' | 'pendente' | 'cancelado'

export interface Transaction {
  id: string
  user_id: string
  description: string
  amount: number
  date: string
  type: TransactionType
  category: string
  subcategory?: string
  status: TransactionStatus
  notes?: string
  created_at: string
  updated_at: string
}

export interface TransactionFilters {
  month?: number
  year?: number
  type?: TransactionType | 'all'
  category?: string
  status?: TransactionStatus | 'all'
  search?: string
}

export interface DashboardSummary {
  totalReceitas: number
  totalDespesas: number
  saldo: number
  despesasVariaveis: number
  despesasFixas: number
}

export interface CategoryData {
  name: string
  value: number
  color: string
}

export interface MonthlyTrend {
  month: string
  receitas: number
  despesas: number
  saldo: number
}
