'use client'

import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, Phone, Mail, MapPin, ExternalLink } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  phone: string
  email: string
  address: string
  t: {
    title: string
    subtitle: string
    phoneLabel: string
    emailLabel: string
    addressLabel: string
    close: string
  }
}

export default function ContactModal({
  isOpen,
  onClose,
  phone,
  email,
  address,
  t,
}: ContactModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  const contactItems = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: t.phoneLabel,
      value: phone,
      href: `tel:${phone.replace(/\s/g, '')}`,
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: t.emailLabel,
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: t.addressLabel,
      value: address,
      href: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
    },
  ]

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-[#12070c] border border-[#C5A059]/20 rounded-lg shadow-2xl animate-[modalIn_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 md:p-10">
          <div className="mb-8">
            <p
              className="text-[#C5A059] uppercase tracking-[0.3em] text-[0.75rem] mb-3"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {t.subtitle}
            </p>
            <h2
              className="text-2xl md:text-3xl font-light text-white tracking-wide"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {t.title}
            </h2>
            <div className="w-16 h-[1px] mt-4 bg-gradient-to-r from-[#C5A059]/60 to-transparent" />
          </div>

          <div className="space-y-5">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('https') ? '_blank' : undefined}
                rel={item.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                className="group flex items-start gap-4 p-4 rounded-lg border border-[#C5A059]/10 bg-[#0a0508]/50 hover:border-[#C5A059]/30 hover:bg-[#0a0508]/80 transition-all duration-300"
              >
                <div className="mt-0.5 text-[#C5A059] opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className="text-white/40 text-[0.65rem] uppercase tracking-[0.2em] block mb-1"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-white/90 text-sm md:text-base block whitespace-pre-line"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {item.value}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-[#C5A059]/60 transition-colors mt-1 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>,
    document.body,
  )
}
