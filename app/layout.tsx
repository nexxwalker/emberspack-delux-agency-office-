import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Delux crew v3 (Beta)',
  description: 'A 3D isometric office where AI agents do real work on your own Claude login.',
  generator: 'Delux crew',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fdfff8',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body>
    </html>
  )
}
