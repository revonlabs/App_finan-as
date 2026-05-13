'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RevonLogo } from '@/components/RevonLogo'
import { toast } from 'sonner'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }

    toast.success('Conta criada! As faíscas subiram.')
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060B14] p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <RevonLogo size={48} />
          <h1 className="mt-4 text-2xl font-bold text-[#F0F8FF] tracking-tight">
            Criar conta
          </h1>
          <p className="mt-1 text-[#8BACD4] text-sm">
            Comece a controlar suas finanças
          </p>
        </div>

        <div className="bg-[#0D1B2E] border border-white/[0.07] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#8BACD4] uppercase tracking-widest mb-2">
                Nome / Empresa
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Sua empresa Ltda"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[#F0F8FF] text-sm placeholder:text-[#4A6785] focus:outline-none focus:border-[#3BFFA0]/40 focus:shadow-[0_0_0_3px_rgba(59,255,160,0.08)] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8BACD4] uppercase tracking-widest mb-2">
                E-mail
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="seu@email.com"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[#F0F8FF] text-sm placeholder:text-[#4A6785] focus:outline-none focus:border-[#3BFFA0]/40 focus:shadow-[0_0_0_3px_rgba(59,255,160,0.08)] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8BACD4] uppercase tracking-widest mb-2">
                Senha
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[#F0F8FF] text-sm placeholder:text-[#4A6785] focus:outline-none focus:border-[#3BFFA0]/40 focus:shadow-[0_0_0_3px_rgba(59,255,160,0.08)] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full font-bold text-[#060B14] text-sm transition-opacity disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #3BFFA0, #4A90E2)' }}
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
            <p className="text-[#8BACD4] text-sm">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-[#3BFFA0] font-semibold hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
