import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Nunito } from 'next/font/google'
import './globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Eskort Skaftin — Weekly Lunchbox Rescue for Kids',
  description:
    'Beat lunchbox boredom and decision fatigue. Build your kids weekly Eskort MySkaftin lunchbox kit in 3 fun steps, earn Yummy Points, and get a free Magic Skaftin on your first order.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#e63329',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${nunito.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
