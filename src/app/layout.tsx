import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ServiceWorkerReg } from '@/components/ui/ServiceWorkerReg'
import { InstallPrompt } from '@/components/ui/InstallPrompt'

export const metadata: Metadata = {
  title: 'SpineQuest — Disc Recovery',
  description: 'Gamified L4-L5 & L5-S1 disc recovery training app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SpineQuest',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0D0D0D',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-bg text-white antialiased">
        <ServiceWorkerReg />
        <InstallPrompt />
        {children}
      </body>
    </html>
  )
}
