import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Poppins } from 'next/font/google'
import './globals.css'
import { ToastQueue } from '@/components/toast-queue'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
})

export const metadata: Metadata = {
  title: 'Eskort Weekly Lunchbox Builder',
  description:
    'Beat lunchbox boredom. Build a fun, kid-approved weekly Skaftin plan with Eskort products, in a few simple steps — and earn Skaftin Stars every week.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/eskort@4x-192x192.png',
        type: 'image/png',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f6a700',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${anton.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        <ToastQueue />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
