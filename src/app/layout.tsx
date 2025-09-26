import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OneClaim - One Click. One Flow. One Intent.',
  description: 'Claim and Stake Your TGE Airdrops via Enso. Seamless cross-chain management powered by intelligent routing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
          {children}
        </div>
      </body>
    </html>
  )
}