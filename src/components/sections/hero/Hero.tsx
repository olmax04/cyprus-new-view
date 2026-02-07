import { cookies } from 'next/headers'
import { Cormorant_Garamond, Lato } from 'next/font/google'
import { getPayload } from 'payload'
import Header from '@/components/layout/Header'
import HeroDiamonds from '@/components/sections/hero/HeroDiamonds'
import HeroWrapper from '@/components/sections/hero/HeroWrapper'
import config from '@/payload.config'

const serifFont = Cormorant_Garamond({
  subsets: ['latin'],
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

export { serifFont, sansFont }

export default async function Hero() {
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
        const image = typeof card.image === 'number' ? null : card.image
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
      <Header locale={locale} nav={nav} />
      <HeroWrapper
        title={title}
        stats={stats}
        categories={categories}
        buttons={buttons}
        galleryItems={galleryItems}
      />
    </main>
  )
}
