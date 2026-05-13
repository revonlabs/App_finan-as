'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ArrowLeftRight, BarChart3, LogOut } from 'lucide-react'
import { RevonLogo } from '@/components/RevonLogo'
import { logout } from '@/lib/actions/auth'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/transactions', icon: ArrowLeftRight, label: 'Transações' },
  { href: '/reports', icon: BarChart3, label: 'Relatórios' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-[#0D1B2E] border-r border-white/[0.07] fixed left-0 top-0 z-30">
      <div className="px-6 py-6 border-b border-white/[0.07]">
        <RevonLogo size={36} showWordmark horizontal />
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-[#3BFFA0]/10 text-[#3BFFA0] border border-[#3BFFA0]/20'
                  : 'text-[#8BACD4] hover:bg-white/[0.04] hover:text-[#F0F8FF]'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-4 border-t border-white/[0.07]">
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#8BACD4] hover:bg-white/[0.04] hover:text-[#FF7043] transition-all"
          >
            <LogOut size={18} />
            Sair
          </button>
        </form>
      </div>
    </aside>
  )
}
