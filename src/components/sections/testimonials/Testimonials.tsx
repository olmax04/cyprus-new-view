import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'
import AnimatedSection from '@/components/ui/AnimatedSection'
import TestimonialsCarousel from '@/components/sections/testimonials/TestimonialsCarousel'

export default async function Testimonials() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const locale = (cookieStore.get('site-locale')?.value || 'en') as 'en' | 'ru' | 'sk'

  const testimonials = await payload.findGlobal({
    slug: 'testimonials',
    locale,
  })

  const items = testimonials?.items || []

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-[#12070c] overflow-hidden">
      {/* Декоративные фоновые элементы */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-[-200px] w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[140px] animate-[pulse_14s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/3 left-[-200px] w-[500px] h-[500px] bg-[#7a4a24]/5 rounded-full blur-[120px] animate-[pulse_11s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16">
        {/* Заголовок секции */}
        <AnimatedSection animation="fade-up" delay={0} duration={1.2}>
          <div className="text-center mb-12 md:mb-16">
            {testimonials?.subheading && (
              <p
                className="text-[#C5A059] uppercase tracking-[0.3em] text-[0.8125rem] mb-4"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {testimonials.subheading}
              </p>
            )}
            <h2
              className="text-[clamp(2rem,6vw,4rem)] font-light text-white leading-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {testimonials?.heading || ''}
            </h2>
          </div>
        </AnimatedSection>

        {/* Отзывы */}
        {items.length > 0 && (
          <AnimatedSection animation="scale-up" delay={300} duration={1.2}>
            <TestimonialsCarousel items={items} />
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}
