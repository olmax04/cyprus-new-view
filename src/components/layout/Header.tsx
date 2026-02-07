'use client'

import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import LanguageToggle from '@/components/ui/LanguageToggle'

type HeaderProps = {
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
    const headerOffset = 96
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

export default function Header({ locale, nav }: HeaderProps) {
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

  // Block body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { id: 'about', label: nav.aboutLabel },
    { id: 'faq', label: nav.faqLabel },
    { id: 'contact', label: nav.contactLabel },
  ]

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
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setIsMobileMenuOpen(false)
              }}
              className="text-3xl md:text-[2.35rem] text-[#C5A059] font-serif tracking-widest leading-none relative font-medium cursor-pointer"
            >
              V<span className="absolute left-3 top-1">R</span>
            </button>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-12 font-sans text-white/90 text-[1.0625rem] tracking-wide font-light">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="hover:text-[#C5A059] transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C5A059] transition-all group-hover:w-full" />
              </button>
            ))}
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

            <div className="hidden md:block">
              <LanguageToggle locale={locale} />
            </div>

            {/* Animated burger button */}
            <button
              className="md:hidden relative w-8 h-8 flex items-center justify-center z-[60]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5 overflow-visible">
                <span
                  className={`absolute left-0 w-full h-[1.5px] bg-[#C5A059] transition-all duration-300 ease-out ${
                    isMobileMenuOpen
                      ? 'top-1/2 -translate-y-1/2 rotate-45'
                      : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#C5A059] transition-all duration-300 ease-out ${
                    isMobileMenuOpen
                      ? 'w-0 opacity-0'
                      : 'w-4 opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 w-full h-[1.5px] bg-[#C5A059] transition-all duration-300 ease-out ${
                    isMobileMenuOpen
                      ? 'top-1/2 -translate-y-1/2 -rotate-45'
                      : 'bottom-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
        <div
          className={`pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4b26a] to-transparent transition-opacity duration-500 ${
            isScrolled ? 'opacity-80' : 'opacity-0'
          }`}
        />
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[#0a0508]/98 backdrop-blur-xl" />

        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute top-1/4 -left-20 w-[300px] h-[300px] rounded-full bg-[#C5A059]/8 blur-[100px] transition-all duration-700 delay-200 ${
              isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          />
          <div
            className={`absolute bottom-1/4 -right-20 w-[250px] h-[250px] rounded-full bg-[#7a4a24]/10 blur-[80px] transition-all duration-700 delay-400 ${
              isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          />
          {/* Vertical decorative lines */}
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#C5A059]/15 to-transparent" />
          <div className="absolute right-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#C5A059]/15 to-transparent" />
        </div>

        {/* Menu content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
          {/* Logo */}
          <div
            className={`mb-12 transition-all duration-500 delay-100 ${
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-6'
            }`}
          >
            <div className="text-5xl text-[#C5A059] font-serif tracking-widest leading-none relative font-medium">
              V<span className="absolute left-5 top-1">R</span>
            </div>
            <div className="mt-4 w-16 h-px mx-auto bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent" />
          </div>

          {/* Navigation items with cascade animation */}
          <nav className="flex flex-col items-center gap-1 w-full max-w-xs">
            {navItems.map((item, index) => (
              <div
                key={item.id}
                className={`w-full transition-all duration-500 ${
                  isMobileMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${200 + index * 100}ms` : '0ms',
                }}
              >
                <button
                  onClick={() => handleNavClick(item.id)}
                  className="group w-full py-5 flex items-center justify-center relative"
                >
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-[#C5A059]/0 group-active:bg-[#C5A059]/5 transition-colors duration-300 border-y border-transparent group-active:border-[#C5A059]/10" />

                  {/* Label */}
                  <span className="relative font-serif text-2xl text-white/90 tracking-[0.15em] uppercase font-light group-active:text-[#C5A059] transition-colors duration-300">
                    {item.label}
                  </span>

                  {/* Decorative dot */}
                  <span className="absolute right-4 w-1.5 h-1.5 rotate-45 border border-[#C5A059]/30 group-active:border-[#C5A059]/60 transition-colors" />
                </button>

                {/* Separator line */}
                {index < navItems.length - 1 && (
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent" />
                )}
              </div>
            ))}
          </nav>

          {/* Decorative rhombus */}
          <div
            className={`my-10 transition-all duration-500 delay-500 ${
              isMobileMenuOpen
                ? 'opacity-100 scale-100 rotate-45'
                : 'opacity-0 scale-0 rotate-0'
            }`}
          >
            <div className="w-3 h-3 border border-[#C5A059]/50 bg-[#C5A059]/10" />
          </div>

          {/* WhatsApp link */}
          <a
            href={nav.whatsappUrl || '#'}
            rel="noopener noreferrer"
            target="_blank"
            className={`flex items-center gap-3 text-white/70 hover:text-[#C5A059] transition-all duration-500 delay-600 ${
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <Phone className="w-5 h-5 text-[#C5A059]" />
            <span className="font-sans text-sm tracking-wider">
              {nav.whatsappLabel}
            </span>
          </a>

          {/* Language toggle */}
          <div
            className={`mt-6 transition-all duration-500 delay-700 ${
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <LanguageToggle locale={locale} />
          </div>
        </div>

        {/* Corner decorative diamonds */}
        <div
          className={`absolute bottom-8 left-8 w-2 h-2 rotate-45 border border-[#C5A059]/25 transition-all duration-500 delay-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute bottom-8 right-8 w-2 h-2 rotate-45 border border-[#C5A059]/25 transition-all duration-500 delay-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </>
  )
}
