import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Revon Finance — Gestão Financeira Empresarial',
  description: 'Controle financeiro simples e visual para pessoas jurídicas',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="h-full">
      <body className={`${inter.variable} antialiased min-h-full flex flex-col`}>
        {children}
        <Toaster position="top-right" theme="dark" richColors />
      </body>
    </html>
  )
}
