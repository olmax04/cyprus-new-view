import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'
import AnimatedSection from '@/components/ui/AnimatedSection'
import FAQAccordion from '@/components/sections/faq/FAQAccordion'

export default async function FAQ() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const locale = (cookieStore.get('site-locale')?.value || 'en') as 'en' | 'ru' | 'sk'

  const faq = await payload.findGlobal({
    slug: 'faq',
    locale,
  })

  const items = faq?.items || []

  return (
    <section id="faq" className="relative py-16 md:py-24 lg:py-32 bg-[#0f0509] overflow-hidden">
      {/* Декоративные фоновые элементы */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#C5A059]/5 rounded-full blur-[100px] animate-[pulse_13s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#7a4a24]/5 rounded-full blur-[120px] animate-[pulse_15s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16">
        {/* Заголовок секции */}
        <AnimatedSection animation="fade-up" delay={0}>
          <div className="text-center mb-12 md:mb-16">
            {faq?.subheading && (
              <p
                className="text-[#C5A059] uppercase tracking-[0.3em] text-[0.8125rem] mb-4"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {faq.subheading}
              </p>
            )}
            <h2
              className="text-[clamp(2rem,6vw,4rem)] font-light text-white leading-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {faq?.heading || ''}
            </h2>
          </div>
        </AnimatedSection>

        {/* FAQ Items */}
        {items.length > 0 && (
          <AnimatedSection animation="fade-up" delay={200}>
            <FAQAccordion items={items} />
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}
