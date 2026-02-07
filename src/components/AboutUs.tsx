import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Button from '@/components/buttons/Button'
import AnimatedSection from '@/components/AnimatedSection'
import * as LucideIcons from 'lucide-react'

export default async function AboutUs() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const locale = (cookieStore.get('site-locale')?.value || 'en') as 'en' | 'ru' | 'sk'

  const aboutUs = await payload.findGlobal({
    slug: 'about-us',
    locale,
  })

  const features = aboutUs?.features || []
  const stats = aboutUs?.stats || []
  const image = typeof aboutUs?.image === 'string' ? null : aboutUs?.image
  const imageSrc = image?.url

  return (
    <section id="about" className="relative py-16 md:py-24 lg:py-32 bg-[#12070c] overflow-hidden">
      {/* Декоративные фоновые элементы */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/5 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7a4a24]/5 rounded-full blur-[140px] animate-[pulse_12s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        {/* Заголовок секции */}
        <AnimatedSection animation="fade-up" delay={0}>
          <div className="text-center mb-12 md:mb-16">
            {aboutUs?.subheading && (
              <p className="text-[#C5A059] uppercase tracking-[0.3em] text-[0.8125rem] mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
                {aboutUs.subheading}
              </p>
            )}
            <h2 className="text-[clamp(2rem,6vw,4rem)] font-light text-white leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              {aboutUs?.heading || ''}
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Текст и статистика */}
          <AnimatedSection animation="fade-right" delay={200}>
            <div className="space-y-8">
              {aboutUs?.description && (
                <p className="text-white/70 text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>{aboutUs.description}</p>
              )}

              {/* Статистика */}
              {stats.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center md:text-left">
                      <div className="text-3xl md:text-4xl font-light text-[#C5A059] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                        {stat.value}
                      </div>
                      <div className="text-[0.8125rem] uppercase tracking-[0.3em] text-white/50" style={{ fontFamily: 'var(--font-sans)' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {aboutUs?.buttonLabel && (
                <div className="pt-4">
                  <Button label={aboutUs.buttonLabel} />
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Изображение */}
          {imageSrc && (
            <AnimatedSection animation="fade-left" delay={400}>
              <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden border border-[#C5A059]/20">
                <Image
                  src={imageSrc}
                  alt={aboutUs?.heading || 'About Us'}
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
          )}
        </div>

        {/* Особенности */}
        {features.length > 0 && (
          <div className="mt-16 md:mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
                ? (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[
                    feature.icon
                  ]
                : null

              return (
                <AnimatedSection key={index} animation="fade-up" delay={index * 100 + 600}>
                  <div className="group p-6 border border-[#C5A059]/20 bg-[#1a0b10]/30 backdrop-blur-sm hover:border-[#C5A059]/40 hover:scale-105 transition-all duration-300">
                    {IconComponent && (
                      <div className="mb-4">
                        <IconComponent className="w-10 h-10 text-[#C5A059] group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    )}
                    <h3 className="text-xl text-white mb-3 font-light" style={{ fontFamily: 'var(--font-serif)' }}>{feature.title}</h3>
                    <p className="text-white/60 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>{feature.description}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
