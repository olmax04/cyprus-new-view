import type { CSSProperties } from 'react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { Cormorant_Garamond, Lato } from 'next/font/google' // Импортируем Cormorant
import { getPayload } from 'payload'
import bgImage from '../../../figma/bgImage.png'
import HeroHeader from '@/components/HeroHeader'
import HeroDiamonds from '@/components/HeroDiamonds'
import PageWrapper from '@/components/PageWrapper'
import AboutUs from '@/components/AboutUs'
import SectionDivider from '@/components/SectionDivider'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import config from '@/payload.config'
// Настраиваем Cormorant Garamond
const serifFont = Cormorant_Garamond({
  subsets: ['latin'],
  // Добавляем разные начертания: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const sansFont = Lato({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-sans',
  display: 'swap',
})

export default async function Page() {
  return (
    <div className={`${serifFont.variable} ${sansFont.variable}`}>
      <Hero />
      <AboutUs />
      <SectionDivider />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  )
}

async function Hero() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const locale = (cookieStore.get('site-locale')?.value || 'en') as 'en' | 'ru' | 'sk'
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

  const title = {
    line1: hero?.title?.line1 || '',
    line2: hero?.title?.line2 || '',
    line3: hero?.title?.line3 || '',
  }

  const stats = hero?.stats || []
  const categories = hero?.categories || []

  const buttons = {
    primaryLabel: hero?.buttons?.primaryLabel || '',
    secondaryLabel: hero?.buttons?.secondaryLabel || '',
  }

  const galleryItems =
    hero?.galleryCards
      ?.map((card) => {
        const image = typeof card.image === 'string' ? null : card.image
        const src = image?.url || null
        if (!src) return null
        return { src, alt: card.label }
      })
      .filter((item): item is { src: string; alt: string } => Boolean(item)) || []

  return (
    <main
      className={`relative min-h-screen w-full overflow-hidden bg-[#2a0f1b] ${serifFont.variable} ${sansFont.variable}`}
    >
      <HeroDiamonds />
      <HeroHeader locale={locale} nav={nav} />
      <PageWrapper
        title={title}
        stats={stats}
        categories={categories}
        buttons={buttons}
        galleryItems={galleryItems}
      />
    </main>
  )
}
