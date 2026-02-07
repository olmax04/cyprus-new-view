'use client'

import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import LanguageToggle from '@/components/LanguageToggle'

type HeroHeaderProps = {
  locale: 'en' | 'ru' | 'sk'
  nav: {
    aboutLabel: string
    faqLabel: string
    contactLabel: string
    whatsappLabel: string
    whatsappUrl?: string | null
  }
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerOffset = 96 // Height of fixed header
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

export default function HeroHeader({ locale, nav }: HeroHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-[#12070c]/70' : 'bg-[#12070c]/20'
        } backdrop-blur-md`}
      >
        <div className="flex items-center justify-between px-6 md:px-16 py-6 md:py-8 h-20 md:h-24">
          <div className="md:w-[6%] md:flex md:justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-3xl md:text-[2.35rem] text-[#C5A059] font-serif tracking-widest leading-none relative font-medium cursor-pointer"
            >
              V<span className="absolute left-3 top-1">R</span>
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-12 font-sans text-white/90 text-[1.0625rem] tracking-wide font-light">
            <button
              onClick={() => handleNavClick('about')}
              className="hover:text-[#C5A059] transition-colors relative group"
            >
              {nav.aboutLabel}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A059] transition-all group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="hover:text-[#C5A059] transition-colors relative group"
            >
              {nav.faqLabel}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A059] transition-all group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-[#C5A059] transition-colors relative group"
            >
              {nav.contactLabel}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A059] transition-all group-hover:w-full"></span>
            </button>
          </nav>

          <div className="flex items-center gap-6">
            <a
              className="hidden md:flex items-center gap-2 text-white/90 hover:text-[#C5A059] transition-colors"
              href={nav.whatsappUrl || '#'}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6 text-[#C5A059]" />
              <span className="font-sans text-[0.9375rem] md:text-[1.0625rem] font-light hidden sm:inline">
                {nav.whatsappLabel}
              </span>
            </a>

            <LanguageToggle locale={locale} />

            <button
              className="md:hidden text-[#C5A059]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <div
          className={`pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4b26a] to-transparent transition-opacity duration-500 ${
            isScrolled ? 'opacity-80' : 'opacity-0'
          }`}
        />
      </header>

      <div
        className={`fixed inset-0 bg-[#1a0b10]/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-center gap-8 font-serif text-[2.35rem] text-[#C5A059] italic">
          <button onClick={() => handleNavClick('about')}>{nav.aboutLabel}</button>
          <button onClick={() => handleNavClick('faq')}>{nav.faqLabel}</button>
          <button onClick={() => handleNavClick('contact')}>{nav.contactLabel}</button>
        </nav>
      </div>
    </>
  )
}
