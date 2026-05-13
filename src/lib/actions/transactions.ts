'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Transaction, TransactionFilters } from '@/types'

export async function getTransactions(filters?: TransactionFilters): Promise<Transaction[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  let query = supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })

  if (filters?.month && filters?.year) {
    const start = `${filters.year}-${String(filters.month).padStart(2, '0')}-01`
    const end = new Date(filters.year, filters.month, 0).toISOString().split('T')[0]
    query = query.gte('date', start).lte('date', end)
  } else if (filters?.year) {
    query = query.gte('date', `${filters.year}-01-01`).lte('date', `${filters.year}-12-31`)
  }

  if (filters?.type && filters.type !== 'all') {
    query = query.eq('type', filters.type)
  }

  if (filters?.category) {
    query = query.eq('category', filters.category)
  }

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }

  if (filters?.search) {
    query = query.ilike('description', `%${filters.search}%`)
  }

  const { data, error } = await query
  if (error) return []
  return data as Transaction[]
}

export async function createTransaction(data: Omit<Transaction, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Não autenticado' }

  const { error } = await supabase.from('transactions').insert({
    ...data,
    user_id: user.id,
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/transactions')
  revalidatePath('/reports')
  return { success: true }
}

export async function updateTransaction(id: string, data: Partial<Transaction>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Não autenticado' }

  const { error } = await supabase
    .from('transactions')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/transactions')
  revalidatePath('/reports')
  return { success: true }
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Não autenticado' }

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/transactions')
  revalidatePath('/reports')
  return { success: true }
}

export async function getDashboardSummary(month: number, year: number) {
  const transactions = await getTransactions({ month, year })

  const totalReceitas = transactions
    .filter(t => t.type === 'receita' && t.status !== 'cancelado')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalDespesas = transactions
    .filter(t => t.type === 'despesa' && t.status !== 'cancelado')
    .reduce((sum, t) => sum + t.amount, 0)

  return {
    totalReceitas,
    totalDespesas,
    saldo: totalReceitas - totalDespesas,
    transactions,
  }
}

export async function getMonthlyTrends(year: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .gte('date', `${year}-01-01`)
    .lte('date', `${year}-12-31`)
    .neq('status', 'cancelado')

  if (!data) return []

  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

  return months.map(month => {
    const monthTx = data.filter(t => {
      const txMonth = new Date(t.date).getMonth() + 1
      return txMonth === month
    })

    const receitas = monthTx.filter(t => t.type === 'receita').reduce((s, t) => s + t.amount, 0)
    const despesas = monthTx.filter(t => t.type === 'despesa').reduce((s, t) => s + t.amount, 0)

    return {
      month: monthNames[month - 1],
      receitas,
      despesas,
      saldo: receitas - despesas,
    }
  })
}
