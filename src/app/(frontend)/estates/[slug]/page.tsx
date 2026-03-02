import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'
import { ArrowLeft, BedDouble, Maximize, MapPin, Tag, TrendingUp, Phone, Mail, User } from 'lucide-react'
import type { Media, User as UserType } from '@/payload-types'
import bgImage from '../../../../../figma/bgImage.png'
import RichTextRenderer from '@/components/ui/RichTextRenderer'
import EstateGallery from '@/components/ui/EstateGallery'
import { formatPrice } from '@/utils/formatPrice'

interface EstateDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: EstateDetailPageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const locale = (cookieStore.get('site-locale')?.value || 'en') as 'en' | 'ru' | 'sk'

  const { docs } = await payload.find({
    collection: 'estates',
    locale,
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const estate = docs[0]
  if (!estate) return { title: 'Estate Not Found' }

  return {
    title: `${estate.title} — Cyprus Real Estate`,
    description: `${estate.title} in ${estate.location}. ${formatPrice(estate.price, estate.currency)}`,
  }
}

export default async function EstateDetailPage({ params }: EstateDetailPageProps) {
  const { slug } = await params
  const cookieStore = await cookies()
  const locale = (cookieStore.get('site-locale')?.value || 'en') as 'en' | 'ru' | 'sk'
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'estates',
    locale,
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const estate = docs[0]
  if (!estate) notFound()

  const agent =
    estate.assignedTo && typeof estate.assignedTo === 'object'
      ? (estate.assignedTo as UserType)
      : null

  const mainImage = estate.image as Media | null
  const mainImageUrl =
    mainImage && typeof mainImage === 'object' && 'url' in mainImage ? mainImage.url : null

  // Collect all gallery images
  const galleryImages: { url: string; alt: string }[] = []
  if (mainImageUrl) {
    galleryImages.push({ url: mainImageUrl, alt: estate.title })
  }
  if (estate.gallery && Array.isArray(estate.gallery)) {
    for (const item of estate.gallery) {
      const img = item.image as Media | null
      if (img && typeof img === 'object' && 'url' in img && img.url) {
        galleryImages.push({ url: img.url, alt: img.alt || estate.title })
      }
    }
  }

  const propTypeMap: Record<string, string> = {
    villa: locale === 'ru' ? 'Вилла' : locale === 'sk' ? 'Vila' : 'Villa',
    apartment: locale === 'ru' ? 'Апартаменты' : locale === 'sk' ? 'Apartmán' : 'Apartment',
    townhouse: locale === 'ru' ? 'Таунхаус' : locale === 'sk' ? 'Mestský dom' : 'Townhouse',
    penthouse: locale === 'ru' ? 'Пентхаус' : locale === 'sk' ? 'Penthouse' : 'Penthouse',
  }
  const transTypeMap: Record<string, string> = {
    sale: locale === 'ru' ? 'Продажа' : locale === 'sk' ? 'Na predaj' : 'For Sale',
    rent: locale === 'ru' ? 'Аренда' : locale === 'sk' ? 'Na prenájom' : 'For Rent',
  }

  const t = {
    back:
      locale === 'ru'
        ? 'Назад к объектам'
        : locale === 'sk'
          ? 'Späť na nehnuteľnosti'
          : 'Back to Estates',
    details: locale === 'ru' ? 'Детали' : locale === 'sk' ? 'Detaily' : 'Details',
    description: locale === 'ru' ? 'Описание' : locale === 'sk' ? 'Popis' : 'Description',
    propertyType:
      locale === 'ru' ? 'Тип объекта' : locale === 'sk' ? 'Typ nehnuteľnosti' : 'Property Type',
    transactionType:
      locale === 'ru' ? 'Тип сделки' : locale === 'sk' ? 'Typ transakcie' : 'Transaction',
    rooms: locale === 'ru' ? 'Спальни' : locale === 'sk' ? 'Spálne' : 'Bedrooms',
    area: locale === 'ru' ? 'Площадь' : locale === 'sk' ? 'Plocha' : 'Area',
    location: locale === 'ru' ? 'Местоположение' : locale === 'sk' ? 'Lokalita' : 'Location',
    price: locale === 'ru' ? 'Цена' : locale === 'sk' ? 'Cena' : 'Price',
    contact:
      locale === 'ru' ? 'Связаться' : locale === 'sk' ? 'Kontaktovať' : 'Contact',
    interested:
      locale === 'ru'
        ? 'Ваш персональный агент'
        : locale === 'sk'
          ? 'Váš osobný agent'
          : 'Your Personal Agent',
    contactDesc:
      locale === 'ru'
        ? 'Свяжитесь с агентом для получения дополнительной информации или для планирования просмотра.'
        : locale === 'sk'
          ? 'Kontaktujte agenta pre viac informácií alebo na naplánovanie prehliadky.'
          : 'Contact the agent for more information or to schedule a viewing.',
    contactFallback:
      locale === 'ru' ? 'Связаться с нами' : locale === 'sk' ? 'Kontaktujte nás' : 'Contact Us',
    contactFallbackDesc:
      locale === 'ru'
        ? 'Свяжитесь с нами для получения дополнительной информации или для планирования просмотра.'
        : locale === 'sk'
          ? 'Kontaktujte nás pre viac informácií alebo na naplánovanie prehliadky.'
          : 'Get in touch with us for more information or to schedule a viewing.',
  }

  return (
    <div className="min-h-screen relative bg-[#2a0f1b] pt-24 md:pt-28 pb-16 overflow-hidden">
      {/* Hero Background */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] z-0 overflow-hidden pointer-events-none">
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="object-cover opacity-40 mix-blend-overlay blur-sm scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0f1b]/20 via-[#2a0f1b]/60 to-[#2a0f1b]" />
      </div>

      {/* Decorative blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15vh] right-0 w-[400px] h-[400px] bg-[#C5A059]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7a4a24]/8 rounded-full blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-16">
        {/* Back Link */}
        <Link
          href="/estates"
          className="inline-flex items-center gap-2 text-white/50 hover:text-[#C5A059] transition-colors text-sm font-sans tracking-wider uppercase mb-6 md:mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {t.back}
        </Link>

        {/* Title Section */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {estate.transactionType && (
              <span className="bg-[#C5A059] text-[#12070c] text-[0.65rem] font-sans font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                {transTypeMap[estate.transactionType]}
              </span>
            )}
            {estate.propertyType && (
              <span className="bg-[#12070c]/80 backdrop-blur-sm border border-[#C5A059]/30 text-white/90 text-[0.65rem] font-sans font-medium uppercase tracking-widest px-3 py-1.5 rounded-sm">
                {propTypeMap[estate.propertyType]}
              </span>
            )}
          </div>

          <h1 className="text-[clamp(2rem,5vw,4rem)] font-serif leading-[1.1] tracking-[0.03em] text-white font-light">
            {estate.title}
          </h1>

          <div className="flex items-center gap-2 mt-3 text-white/50">
            <MapPin className="w-4 h-4 text-[#C5A059]" />
            <span className="font-sans text-sm tracking-wider">{estate.location}</span>
          </div>

          <div className="w-full h-[1px] mt-6 bg-gradient-to-r from-[#C5A059]/60 via-[#C5A059]/20 to-transparent" />
        </div>

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <div className="mb-10 md:mb-14">
            <EstateGallery images={galleryImages} />
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            {estate.description && (
              <div className="mb-10">
                <h2 className="text-xl md:text-2xl font-serif text-white tracking-wide mb-6 flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-gradient-to-r from-[#C5A059] to-transparent" />
                  {t.description}
                </h2>
                <div className="bg-[#12070c]/40 backdrop-blur-sm border border-[#C5A059]/10 rounded-lg p-6 md:p-8">
                  <RichTextRenderer content={estate.description} />
                </div>
              </div>
            )}

            {/* Details Grid */}
            <div>
              <h2 className="text-xl md:text-2xl font-serif text-white tracking-wide mb-6 flex items-center gap-3">
                <div className="w-8 h-[2px] bg-gradient-to-r from-[#C5A059] to-transparent" />
                {t.details}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {/* Property Type */}
                <DetailCard
                  icon={<Tag className="w-5 h-5" />}
                  label={t.propertyType}
                  value={propTypeMap[estate.propertyType] || estate.propertyType}
                />
                {/* Transaction Type */}
                <DetailCard
                  icon={<TrendingUp className="w-5 h-5" />}
                  label={t.transactionType}
                  value={transTypeMap[estate.transactionType] || estate.transactionType}
                />
                {/* Location */}
                <DetailCard
                  icon={<MapPin className="w-5 h-5" />}
                  label={t.location}
                  value={estate.location}
                />
                {/* Rooms */}
                {estate.rooms && (
                  <DetailCard
                    icon={<BedDouble className="w-5 h-5" />}
                    label={t.rooms}
                    value={String(estate.rooms)}
                  />
                )}
                {/* Area */}
                {estate.area && (
                  <DetailCard
                    icon={<Maximize className="w-5 h-5" />}
                    label={t.area}
                    value={`${estate.area} m²`}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price Card */}
            <div className="sticky top-28">
              <div className="bg-[#12070c]/60 backdrop-blur-md border border-[#C5A059]/20 rounded-lg p-6 md:p-8 mb-6">
                <span className="text-white/50 text-xs font-sans uppercase tracking-widest block mb-2">
                  {t.price}
                </span>
                <div className="text-[#C5A059] font-serif text-3xl md:text-4xl tracking-wide font-medium">
                  {formatPrice(estate.price, estate.currency)}
                </div>
                <div className="w-full h-[1px] my-5 bg-gradient-to-r from-[#C5A059]/30 to-transparent" />

                {/* Quick Stats */}
                <div className="space-y-3">
                  {estate.rooms && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50 font-sans flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-[#C5A059]" />
                        {t.rooms}
                      </span>
                      <span className="text-white font-sans">{estate.rooms}</span>
                    </div>
                  )}
                  {estate.area && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50 font-sans flex items-center gap-2">
                        <Maximize className="w-3.5 h-3.5 text-[#C5A059]" />
                        {t.area}
                      </span>
                      <span className="text-white font-sans">{estate.area} m²</span>
                    </div>
                  )}
                  {estate.area && estate.price && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50 font-sans flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#C5A059]" />
                        {estate.currency || 'EUR'}/m²
                      </span>
                      <span className="text-white font-sans">
                        {formatPrice(Math.round(estate.price / estate.area), estate.currency)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Agent Contact Card */}
              {agent ? (
                <div className="bg-gradient-to-br from-[#C5A059]/10 to-[#7a4a24]/10 backdrop-blur-md border border-[#C5A059]/20 rounded-lg p-6 md:p-8">
                  <h3 className="text-white font-serif text-lg tracking-wide mb-1">{t.interested}</h3>
                  <p className="text-white/50 text-sm font-sans leading-relaxed mb-5">
                    {t.contactDesc}
                  </p>

                  {/* Agent info */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/30 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-[#C5A059]" />
                    </div>
                    <div>
                      <span className="text-white font-sans text-sm font-medium block">
                        {agent.name || agent.email}
                      </span>
                      {agent.name && (
                        <span className="text-white/40 font-sans text-xs">{agent.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {agent.phone && (
                      <a
                        href={`tel:${agent.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-3 w-full py-3 px-4 bg-[#C5A059] hover:bg-[#d4b26a] text-[#12070c] font-sans font-bold text-sm uppercase tracking-wider rounded-sm transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-[#C5A059]/20"
                      >
                        <Phone className="w-4 h-4" />
                        {agent.phone}
                      </a>
                    )}
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-3 w-full py-3 px-4 border border-[#C5A059]/40 text-[#C5A059] hover:bg-[#C5A059]/10 font-sans font-medium text-sm tracking-wider rounded-sm transition-all duration-300"
                    >
                      <Mail className="w-4 h-4" />
                      {agent.email}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-[#C5A059]/10 to-[#7a4a24]/10 backdrop-blur-md border border-[#C5A059]/20 rounded-lg p-6 md:p-8">
                  <h3 className="text-white font-serif text-lg tracking-wide mb-2">{t.contactFallback}</h3>
                  <p className="text-white/50 text-sm font-sans leading-relaxed mb-5">
                    {t.contactFallbackDesc}
                  </p>
                  <Link
                    href="/#contact"
                    className="w-full py-3.5 px-6 bg-[#C5A059] hover:bg-[#d4b26a] text-[#12070c] font-sans font-bold text-sm uppercase tracking-wider rounded-sm transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-[#C5A059]/20 text-center block"
                  >
                    {t.contact}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="bg-[#12070c]/40 backdrop-blur-sm border border-[#C5A059]/10 hover:border-[#C5A059]/25 rounded-lg p-4 md:p-5 transition-all duration-300 group">
      <div className="text-[#C5A059] mb-3 opacity-70 group-hover:opacity-100 transition-opacity">
        {icon}
      </div>
      <span className="text-white/40 text-[0.65rem] font-sans uppercase tracking-widest block mb-1">
        {label}
      </span>
      <span className="text-white font-sans text-sm font-medium tracking-wide">{value}</span>
    </div>
  )
}
