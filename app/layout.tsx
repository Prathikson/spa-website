import type { Metadata } from 'next'
import './globals.css'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Cursor } from '@/components/ui/Cursor'
import { Preloader } from '@/components/ui/Preloader'
import { LangProvider } from '@/lib/LangContext'

export const metadata: Metadata = {
  title: { default: 'Shinhara Beauty | Luxury Spa & Beauty — Edmonton, AB', template: '%s | Shinhara Beauty' },
  description: "Edmonton's premier luxury spa and beauty destination. Nail art, facials, laser, tattoo artistry, waxing, eyebrows, and full salon services.",
  keywords: ['spa Edmonton', 'nail salon Edmonton', 'laser Edmonton', 'tattoo Edmonton', 'facial Edmonton', 'beauty salon Edmonton AB'],
  robots: { index: true, follow: true },
  openGraph: { type: 'website', locale: 'en_CA', url: 'https://shinharabeauty.ca', siteName: 'Shinhara Beauty' },
  alternates: { canonical: 'https://shinharabeauty.ca' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LangProvider>
          <Cursor />
          <Preloader />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LangProvider>
      </body>
    </html>
  )
}
