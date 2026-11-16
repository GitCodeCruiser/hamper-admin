import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '../styles/global.scss';
import Providers from './providers';

import { projectConfig } from '@/config';

const cormorant = localFont({
  src: [
    { path: './fonts/cormorant-latin-wght-normal.woff2', weight: '300 700', style: 'normal' },
    { path: './fonts/cormorant-latin-wght-italic.woff2', weight: '300 700', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-cormorant',
});

const fraunces = localFont({
  src: './fonts/fraunces-latin-wght-normal.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-fraunces',
});

const bricolageGrotesque = localFont({
  src: './fonts/bricolage-grotesque-latin-wght-normal.woff2',
  weight: '200 800',
  style: 'normal',
  display: 'swap',
  variable: '--font-bricolage_grotesque',
});

export const metadata: Metadata = {
  title: projectConfig.name,
  description: '',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/assets/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/assets/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/assets/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${fraunces.variable} ${bricolageGrotesque.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
