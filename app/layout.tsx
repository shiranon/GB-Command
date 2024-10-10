import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'

import { Footer } from '@/components/layout/footer/Footer'
import { Header } from '@/components/layout/header/Header'
import { DEFAULT_METADATA } from '@/constants/metadata'
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = DEFAULT_METADATA

const Koruri = localFont({
  src: './_font/Koruri-Regular.ttf',
  variable: '--font-koruri',
  display: 'swap',
})

const MisakiGothic = localFont({
  src: './_font/misaki_gothic_2nd.ttf',
  variable: '--font-misaki-gothic',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body
        className={`${Koruri.variable} ${MisakiGothic.variable} font-koruri`}
      >
        <Header />
        <div className="mt-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
