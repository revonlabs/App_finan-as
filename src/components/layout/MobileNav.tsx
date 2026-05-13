'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ArrowLeftRight, BarChart3 } from 'lucide-react'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/transactions', icon: ArrowLeftRight, label: 'Transações' },
  { href: '/reports', icon: BarChart3, label: 'Relatórios' },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0D1B2E] border-t border-white/[0.07]">
      <div className="flex items-center justify-around px-4 py-3">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all ${
                active ? 'text-[#3BFFA0]' : 'text-[#8BACD4]'
              }`}
            >
              <Icon size={22} />
              <span className="text-[10px] font-semibold tracking-wide">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
