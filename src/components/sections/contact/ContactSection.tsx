'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ContactModal from '@/components/ui/ContactModal'

interface ContactSectionProps {
  phone: string
  email: string
  address: string
  t: {
    subheading: string
    heading: string
    description: string
    buttonLabel: string
    modalTitle: string
    modalSubtitle: string
    phoneLabel: string
    emailLabel: string
    addressLabel: string
    close: string
  }
}

export default function ContactSection({ phone, email, address, t }: ContactSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="contact" className="relative py-16 md:py-24 lg:py-32 bg-[var(--color-bg-dark)] overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#7a4a24]/5 rounded-full blur-[120px]" />
      </div>

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/20 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-16 text-center">
        <AnimatedSection animation="fade-up" delay={0} duration={1.2}>
          <p
            className="text-[var(--color-accent)] uppercase tracking-[0.3em] text-[0.8125rem] mb-4"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {t.subheading}
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={150} duration={1.2}>
          <h2
            className="text-[clamp(2rem,6vw,4rem)] font-light text-white leading-tight mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t.heading}
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={300} duration={1.2}>
          <p
            className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {t.description}
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={450} duration={1}>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center gap-3 px-12 md:px-16 py-4 border border-[var(--color-accent)]/50 bg-[var(--color-bg-mid)]/30 backdrop-blur-sm text-[var(--color-accent)] hover:text-[var(--color-bg-mid)] overflow-hidden transition-all duration-500"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            <span className="relative z-10 tracking-[0.2em] text-[0.9375rem] md:text-[1.0625rem] uppercase font-medium">
              {t.buttonLabel}
            </span>
            <MessageCircle className="relative z-10 w-5 h-5 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-[var(--color-accent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
          </button>
        </AnimatedSection>

        {/* Decorative elements */}
        <AnimatedSection animation="fade" delay={600} duration={1.5}>
          <div className="mt-12 flex items-center justify-center gap-6">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-accent)]/30" />
            <div className="w-2 h-2 rotate-45 border border-[var(--color-accent)]/30" />
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--color-accent)]/30" />
          </div>
        </AnimatedSection>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        phone={phone}
        email={email}
        address={address}
        t={{
          title: t.modalTitle,
          subtitle: t.modalSubtitle,
          phoneLabel: t.phoneLabel,
          emailLabel: t.emailLabel,
          addressLabel: t.addressLabel,
          close: t.close,
        }}
      />
    </section>
  )
}
