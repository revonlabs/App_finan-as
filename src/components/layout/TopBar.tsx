import { createClient } from '@/lib/supabase/server'
import { RevonLogo } from '@/components/RevonLogo'
import { logout } from '@/lib/actions/auth'
import { LogOut } from 'lucide-react'

export async function TopBar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário'

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#0D1B2E]/95 backdrop-blur border-b border-white/[0.07]">
      <div className="flex items-center justify-between px-4 py-3">
        <RevonLogo size={32} showWordmark horizontal />
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#8BACD4]">{name}</span>
          <form action={logout}>
            <button type="submit" className="text-[#8BACD4] hover:text-[#FF7043] transition-colors">
              <LogOut size={18} />
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
