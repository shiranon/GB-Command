import type { Metadata } from 'next'

import { siteConfig } from './siteConfig'

export const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  applicationName: siteConfig.title,
  description: siteConfig.description,
  generator: 'Next.js',
  keywords: ['website'],
  authors: [{ name: siteConfig.authors }],
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}images/og.png`],
  },
  icons: [
    { rel: 'apple-touch-icon', url: '/favicon/icon-192x192.png' },
    { rel: 'icon', url: '/favicon/favicon.ico' },
  ],
}
