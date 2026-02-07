import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
}

export default async function Footer() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const locale = (cookieStore.get('site-locale')?.value || 'en') as 'en' | 'ru' | 'sk'

  const footer = await payload.findGlobal({
    slug: 'footer',
    locale,
  })

  const columns = footer?.columns || []
  const social = footer?.social || []

  return (
    <footer id="contact" className="relative bg-[#0a0508] border-t border-[#C5A059]/10 overflow-hidden">
      {/* Декоративные фоновые элементы */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C5A059]/5 rounded-full blur-[120px] animate-[pulse_16s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7a4a24]/5 rounded-full blur-[140px] animate-[pulse_18s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-16">
        {/* Верхняя часть футера */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 mb-12">
          {/* Логотип и описание */}
          <div className="lg:col-span-4">
            <h3
              className="text-2xl md:text-3xl font-light text-white mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {footer?.logo || 'Cyprus Real Estate'}
            </h3>
            <p
              className="text-white/60 text-sm leading-relaxed mb-6"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {footer?.description || ''}
            </p>
            {/* Социальные сети */}
            {social.length > 0 && (
              <div className="flex gap-4">
                {social.map((item, index) => {
                  const Icon = socialIcons[item.platform as keyof typeof socialIcons]
                  return Icon ? (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center border border-[#C5A059]/30 hover:border-[#C5A059] hover:bg-[#C5A059]/10 hover:scale-110 transition-all duration-300"
                    >
                      <Icon className="w-4 h-4 text-[#C5A059]" />
                    </a>
                  ) : null
                })}
              </div>
            )}
          </div>

          {/* Колонки с ссылками */}
          {columns.map((column, index) => (
            <div key={index} className="lg:col-span-2">
              <h4
                className="text-white text-sm uppercase tracking-[0.3em] mb-6"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.url}
                      className="text-white/60 hover:text-[#C5A059] text-sm transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Контакты */}
          {footer?.contact && (
            <div className="lg:col-span-4">
              <h4
                className="text-white text-sm uppercase tracking-[0.3em] mb-6"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {footer.contact.title}
              </h4>
              <ul className="space-y-4">
                {footer.contact.phone && (
                  <li className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#C5A059] mt-1 flex-shrink-0" />
                    <a
                      href={`tel:${footer.contact.phone}`}
                      className="text-white/60 hover:text-[#C5A059] text-sm transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {footer.contact.phone}
                    </a>
                  </li>
                )}
                {footer.contact.email && (
                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#C5A059] mt-1 flex-shrink-0" />
                    <a
                      href={`mailto:${footer.contact.email}`}
                      className="text-white/60 hover:text-[#C5A059] text-sm transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {footer.contact.email}
                    </a>
                  </li>
                )}
                {footer.contact.address && (
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C5A059] mt-1 flex-shrink-0" />
                    <span
                      className="text-white/60 text-sm"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {footer.contact.address}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Разделитель */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent mb-8" />

        {/* Копирайт */}
        <div className="text-center">
          <p
            className="text-white/40 text-xs md:text-sm"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {footer?.copyright || `© ${new Date().getFullYear()} Cyprus Real Estate. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
