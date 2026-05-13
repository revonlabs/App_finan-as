import { Sidebar } from '@/components/layout/Sidebar'
import { MobileNav } from '@/components/layout/MobileNav'
import { TopBar } from '@/components/layout/TopBar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#060B14]">
      <Sidebar />
      <TopBar />
      <main className="md:ml-64 pt-16 md:pt-0 pb-20 md:pb-0 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
          {children}
        </div>
      </main>
      <MobileNav />
    </div>
  )
}
