import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'
import bgImage from '../../../../figma/bgImage.png'
import EstateCard from '@/components/ui/EstateCard'
import EstatesFilter from '@/components/ui/EstatesFilter'
import type { Media } from '@/payload-types'

export const metadata = {
  title: 'Luxury Estates',
  description: 'Browse our exclusive selection of luxury estates.',
}

interface EstatesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function EstatesPage({ searchParams }: EstatesPageProps) {
  const params = await searchParams
  const cookieStore = await cookies()
  const locale = (cookieStore.get('site-locale')?.value || 'en') as 'en' | 'ru' | 'sk'
  const payload = await getPayload({ config })

  // Build Payload Query based on search parameters
  const where: any = {}

  if (params.transactionType) {
    where.transactionType = { equals: params.transactionType }
  }
  if (params.propertyType) {
    where.propertyType = { equals: params.propertyType }
  }
  if (params.location && typeof params.location === 'string') {
    where.location = { like: params.location }
  }
  if (params.rooms && typeof params.rooms === 'string') {
    where.rooms = { greater_than_equal: parseInt(params.rooms, 10) }
  }

  // Handle Price Min/Max
  if (params.minPrice || params.maxPrice) {
    where.priceValue = {}
    if (params.minPrice && typeof params.minPrice === 'string') {
      where.priceValue.greater_than_equal = parseInt(params.minPrice, 10)
    }
    if (params.maxPrice && typeof params.maxPrice === 'string') {
      where.priceValue.less_than_equal = parseInt(params.maxPrice, 10)
    }
  }

  // Handle Area Min/Max
  if (params.minArea || params.maxArea) {
    where.area = {}
    if (params.minArea && typeof params.minArea === 'string') {
      where.area.greater_than_equal = parseInt(params.minArea, 10)
    }
    if (params.maxArea && typeof params.maxArea === 'string') {
      where.area.less_than_equal = parseInt(params.maxArea, 10)
    }
  }

  // Fetch from DB
  const { docs: estates } = await payload.find({
    collection: 'estates',
    locale,
    where,
    sort: '-createdAt', // Sort by newest first
  })

  return (
    <div className="min-h-screen relative bg-[#2a0f1b] pt-28 pb-12 overflow-hidden">
      {/* Hero-like Background Image with blur and gradient */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] z-0 overflow-hidden pointer-events-none">
        <Image
          src={bgImage}
          alt="Luxury Cyprus Real Estate"
          fill
          className="object-cover opacity-50 mix-blend-overlay blur-sm scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0f1b]/20 via-[#2a0f1b]/60 to-[#2a0f1b]" />
      </div>

      {/* Decorative blurred background elements matching home page */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20vh] right-0 w-[400px] h-[400px] bg-[#C5A059]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7a4a24]/10 rounded-full blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-16 mb-8 mt-4 md:mt-8">
        <h1
          className="text-[clamp(2.5rem,6vw,5.5rem)] font-serif leading-[0.9] tracking-[0.05em] uppercase font-light drop-shadow-lg"
          style={{ '--track': '0.05em' } as React.CSSProperties}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#d4b26a] via-[#BB9A31] to-[#6E5B1D]">
            ESTATES
          </span>
        </h1>
        <div className="w-full h-[1px] mt-8 mb-10 bg-gradient-to-r from-[#C5A059]/60 via-[#C5A059]/20 to-transparent" />
        <p className="text-lg text-white/60 mb-12 font-sans font-light max-w-2xl leading-relaxed">
          {locale === 'ru'
            ? 'Изучите нашу коллекцию лучших объектов недвижимости. Откройте для себя исключительные пространства для жизни на Кипре.'
            : locale === 'sk'
              ? 'Preskúmajte našu kolekciu najlepších nehnuteľností. Objavte výnimočné životné priestory na Cypre.'
              : 'Explore our collection of the best estates available for you. Discover exceptional living spaces in Cyprus.'}
        </p>

        {/* Filters */}
        <EstatesFilter locale={locale} />

        {/* Estates Grid */}
        {estates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {estates.map((estate) => {
              const image = estate.image as Media | { url: string } | null
              const imageUrl =
                image && typeof image === 'object' && 'url' in image && image.url
                  ? image.url
                  : undefined

              const propTypeMap: Record<string, string> = {
                villa: locale === 'ru' ? 'Вилла' : locale === 'sk' ? 'Vila' : 'Villa',
                apartment:
                  locale === 'ru' ? 'Апартаменты' : locale === 'sk' ? 'Apartmán' : 'Apartment',
                townhouse:
                  locale === 'ru' ? 'Таунхаус' : locale === 'sk' ? 'Mestský dom' : 'Townhouse',
                penthouse:
                  locale === 'ru' ? 'Пентхаус' : locale === 'sk' ? 'Penthouse' : 'Penthouse',
              }
              const transTypeMap: Record<string, string> = {
                sale: locale === 'ru' ? 'Продажа' : locale === 'sk' ? 'Na predaj' : 'For Sale',
                rent: locale === 'ru' ? 'Аренда' : locale === 'sk' ? 'Na prenájom' : 'For Rent',
              }

              return (
                <EstateCard
                  key={estate.id}
                  id={estate.id}
                  title={estate.title}
                  location={estate.location}
                  description={estate.description || undefined}
                  propertyType={estate.propertyType ? propTypeMap[estate.propertyType] : undefined}
                  transactionType={
                    estate.transactionType ? transTypeMap[estate.transactionType] : undefined
                  }
                  rooms={estate.rooms || undefined}
                  area={estate.area || undefined}
                  price={estate.price}
                  imageUrl={imageUrl}
                />
              )
            })}
          </div>
        ) : (
          <div className="py-12 sm:py-20 px-4 sm:px-8 text-center border-t border-b border-[#C5A059]/10 bg-[#12070c]/30 rounded-lg">
            <h3 className="text-lg sm:text-2xl font-serif text-white/90 mb-2 tracking-wide group-hover:text-[#C5A059] transition-colors">
              {locale === 'ru'
                ? 'Нет соответствующих объектов'
                : locale === 'sk'
                  ? 'Žiadne zodpovedajúce nehnuteľnosti'
                  : 'No matching Estates found'}
            </h3>
            <p className="text-sm sm:text-base text-white/50 font-sans">
              {locale === 'ru'
                ? 'Попробуйте изменить параметры поиска.'
                : locale === 'sk'
                  ? 'Skúste zmeniť parametre vyhľadávania.'
                  : 'Try changing your search parameters.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
