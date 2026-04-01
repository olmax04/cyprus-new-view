import React from 'react'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/layout/PageTransition'
import { serifFont, sansFont } from '@/components/sections/hero/Hero'
import './styles.css'

export const metadata = {
  description: 'Cyprus Real Estate Platform',
  title: 'Cyprus Real Estate',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const cookieStore = await cookies()
  const locale = (cookieStore.get('site-locale')?.value || 'en') as 'en' | 'ru' | 'sk'

  const payload = await getPayload({ config })
  const hero = await payload.findGlobal({
    slug: 'hero',
    locale,
  })

  const nav = hero?.nav || {
    aboutLabel: '',
    faqLabel: '',
    contactLabel: '',
    whatsappLabel: '',
    whatsappUrl: '',
  }

  return (
    <html lang={locale} data-theme="crimson">
      <body className={`${serifFont.variable} ${sansFont.variable} font-sans`}>
        <Header locale={locale} nav={nav} />
        <main className="min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
